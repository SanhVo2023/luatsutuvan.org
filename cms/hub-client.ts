/**
 * hub.ts — typed HTTP client for the Apolo Content Hub (PayloadCMS REST API).
 *
 * This is the ENTIRE data layer for a site instance. There is NO Payload, NO
 * pg pool, NO database here — every byte of content is fetched over HTTP from
 * the central hub and cached with Next.js ISR (`next: { revalidate }`).
 *
 * Contract: hub/API_CONTRACT.md is the source of truth. Shapes below mirror it
 * exactly. If the hub response diverges from these types, flag it — do not
 * silently coerce; the hub is canonical.
 *
 * Caching: every fetch uses `next: { revalidate: REVALIDATE }` so build-time
 * (SSG/generateStaticParams) and request-time reads are served from the Next
 * data cache. Cached HTTP cannot exhaust connections the way embedded pg pools
 * did — that is the whole point of the thin-frontend pivot.
 *
 * Resilience: if the hub is unreachable (build runs before hub is up, transient
 * network error), helpers degrade to typed empty states and log a warning. The
 * build still completes; pages render their empty/not-found branches.
 */

export const REVALIDATE = 3600 // 1 hour ISR

const HUB_API_URL = (process.env.HUB_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const SITE_DOMAIN = process.env.SITE_DOMAIN ?? ''

/* ------------------------------------------------------------------ *
 * Response types (per API_CONTRACT.md)
 * ------------------------------------------------------------------ */

export interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/** @payloadcms/plugin-seo fields live under `meta`, NOT top-level. */
export interface SeoMeta {
  title?: string | null
  description?: string | null
  image?: MediaDoc | string | null
}

export interface PracticeArea {
  id: number
  name: string
  slug: string
  /** markdown */
  definition?: string | null
  order?: number | null
}

export interface SiteTheme {
  /** primary brand color hex, e.g. "#8B4513" */
  primary?: string
  /** secondary / complement color hex */
  secondary?: string
  /** accent color hex */
  accent?: string
  /** font-family string, e.g. "Be Vietnam Pro" */
  font?: string
  /** allow forward-compatible token bag keys */
  [token: string]: string | undefined
}

export interface SiteNav {
  header?: string[]
  footer?: string[]
  [key: string]: string[] | undefined
}

export interface SiteConfig {
  id: number
  domain: string
  displayName: string
  theme: SiteTheme
  nav: SiteNav
  parentBrandLocale: 'vi' | 'en'
  coveredPracticeAreas?: PracticeArea[]
  coveredTopics?: string[]
  phase?: number
}

export interface RenditionSiteRef {
  id: number
  domain: string
  displayName?: string
}

export interface Rendition {
  id: number
  title: string
  slug: string
  /** markdown string — render with <Markdown> */
  body: string
  excerpt?: string | null
  heroImageUrl?: string | null
  /** self-referential canonical — these are differentiated derivatives */
  canonicalUrl?: string | null
  status: 'published' | 'draft'
  site?: RenditionSiteRef | number
  source?: { id: number; title?: string; slug?: string } | number
  meta?: SeoMeta | null
  /** optional practice-area linkage (depth populated) */
  practiceArea?: PracticeArea | number | null
  createdAt?: string
  updatedAt?: string
}

export interface GlossaryTerm {
  id: number
  term: string
  slug: string
  /** markdown */
  definition: string
  locale: 'vi' | 'en'
}

export interface Disclaimer {
  id: number
  key: string
  /** markdown */
  body: string
  locale: 'vi' | 'en'
}

export interface Author {
  id: number
  name: string
  slug: string
  role?: string | null
  /** markdown */
  bio?: string | null
  photoUrl?: string | null
}

export interface MediaDoc {
  id: number
  url?: string | null
  externalUrl?: string | null
  alt?: string | null
  caption?: string | null
  sizes?: Record<string, { url?: string | null; width?: number; height?: number }>
}

/* ------------------------------------------------------------------ *
 * Low-level fetch helper
 * ------------------------------------------------------------------ */

class HubError extends Error {}

async function hubFetch<T>(path: string, fallback: T): Promise<T> {
  const url = `${HUB_API_URL}${path}`
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new HubError(`Hub responded ${res.status} for ${path}`)
    }
    return (await res.json()) as T
  } catch (err) {
    // Degrade gracefully — never crash the build on a hub hiccup.
    console.warn(
      `[hub] fetch failed for ${url}: ${err instanceof Error ? err.message : String(err)} — returning fallback`,
    )
    return fallback
  }
}

const emptyList = <T>(): PayloadListResponse<T> => ({
  docs: [],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 1,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
})

/** URL-encode a Payload bracketed query string. Accepts already-bracketed keys. */
function qs(params: Record<string, string | number>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
}

/* ------------------------------------------------------------------ *
 * Public helpers
 * ------------------------------------------------------------------ */

/** GET /api/site-configs?where[domain][equals]={SITE_DOMAIN}&depth=1 */
export async function getSiteConfig(domain: string = SITE_DOMAIN): Promise<SiteConfig | null> {
  if (!domain) {
    console.warn('[hub] SITE_DOMAIN is not set — cannot load site config')
    return null
  }
  const query = qs({ 'where[domain][equals]': domain, depth: 1 })
  const data = await hubFetch<PayloadListResponse<SiteConfig>>(
    `/api/site-configs?${query}`,
    emptyList<SiteConfig>(),
  )
  return data.docs[0] ?? null
}

/**
 * GET a site's published renditions. depth=1 populates `site` and `source` so
 * `site.domain` is present.
 *
 * NOTE (contract gap): API_CONTRACT.md does NOT define a rendition→practiceArea
 * relationship field, and the hub returns HTTP 400 for a
 * `where[...][practiceArea.slug]` filter. So practice-area pages list all of a
 * site's renditions rather than a server-filtered subset. If the hub later adds
 * a `practiceArea` relationship on renditions, wire `practiceAreaSlug` back into
 * the query here — the seam is intentionally left in place.
 */
export async function listRenditions(opts?: {
  practiceAreaSlug?: string
  limit?: number
  page?: number
  domain?: string
}): Promise<PayloadListResponse<Rendition>> {
  const domain = opts?.domain ?? SITE_DOMAIN
  if (!domain) return emptyList<Rendition>()

  const params: Record<string, string | number> = {
    'where[and][0][site.domain][equals]': domain,
    'where[and][1][status][equals]': 'published',
    depth: 1,
    limit: opts?.limit ?? 50,
    page: opts?.page ?? 1,
    sort: '-updatedAt',
  }
  // practiceAreaSlug is accepted but intentionally NOT sent as a query filter —
  // see the contract-gap note above. Reserved for future hub support.
  void opts?.practiceAreaSlug
  return hubFetch<PayloadListResponse<Rendition>>(
    `/api/renditions?${qs(params)}`,
    emptyList<Rendition>(),
  )
}

/**
 * GET a single published rendition by slug for this site.
 * Uses the (site, slug) compound filter from the contract.
 */
export async function getRendition(
  slug: string,
  domain: string = SITE_DOMAIN,
): Promise<Rendition | null> {
  if (!domain || !slug) return null
  const query = qs({
    'where[and][0][site.domain][equals]': domain,
    'where[and][1][slug][equals]': slug,
    'where[and][2][status][equals]': 'published',
    depth: 1,
  })
  const data = await hubFetch<PayloadListResponse<Rendition>>(
    `/api/renditions?${query}`,
    emptyList<Rendition>(),
  )
  return data.docs[0] ?? null
}

/** GET /api/practice-areas?sort=order */
export async function listPracticeAreas(): Promise<PracticeArea[]> {
  const data = await hubFetch<PayloadListResponse<PracticeArea>>(
    `/api/practice-areas?${qs({ sort: 'order', limit: 100 })}`,
    emptyList<PracticeArea>(),
  )
  return data.docs
}

/** GET a single practice area by slug. */
export async function getPracticeArea(slug: string): Promise<PracticeArea | null> {
  if (!slug) return null
  const data = await hubFetch<PayloadListResponse<PracticeArea>>(
    `/api/practice-areas?${qs({ 'where[slug][equals]': slug })}`,
    emptyList<PracticeArea>(),
  )
  return data.docs[0] ?? null
}

/** GET /api/glossary?where[locale][equals]={locale} */
export async function getGlossary(locale: 'vi' | 'en' = 'vi'): Promise<GlossaryTerm[]> {
  const data = await hubFetch<PayloadListResponse<GlossaryTerm>>(
    `/api/glossary?${qs({ 'where[locale][equals]': locale, limit: 200 })}`,
    emptyList<GlossaryTerm>(),
  )
  return data.docs
}

/** GET /api/disclaimers?where[key][equals]={key}&where[locale][equals]={locale} */
export async function getDisclaimer(
  key: string = 'general',
  locale: 'vi' | 'en' = 'vi',
): Promise<Disclaimer | null> {
  const query = qs({
    'where[and][0][key][equals]': key,
    'where[and][1][locale][equals]': locale,
  })
  const data = await hubFetch<PayloadListResponse<Disclaimer>>(
    `/api/disclaimers?${query}`,
    emptyList<Disclaimer>(),
  )
  return data.docs[0] ?? null
}

/** GET /api/authors?where[slug][equals]={slug} */
export async function getAuthor(slug: string = 'editorial-team'): Promise<Author | null> {
  const data = await hubFetch<PayloadListResponse<Author>>(
    `/api/authors?${qs({ 'where[slug][equals]': slug })}`,
    emptyList<Author>(),
  )
  return data.docs[0] ?? null
}

/* ------------------------------------------------------------------ *
 * Contact submission (POST — public create per the access matrix)
 * ------------------------------------------------------------------ */

export interface ContactPayload {
  site?: number
  name: string
  email: string
  phone?: string
  message: string
}

/**
 * POST /api/contact-submissions to the hub, then fire-and-forget mirror to the
 * GAS aggregator (CONTACT_HUB_URL). Hub failure surfaces to the caller; the GAS
 * mirror never blocks. This runs server-side (Server Action / route handler).
 */
export async function submitContact(
  payload: ContactPayload,
): Promise<{ ok: boolean; id?: number; error?: string }> {
  // 1) Canonical write to the hub.
  let id: number | undefined
  try {
    const res = await fetch(`${HUB_API_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return { ok: false, error: `Hub responded ${res.status} ${text}`.trim() }
    }
    const data = (await res.json().catch(() => null)) as { doc?: { id?: number } } | null
    id = data?.doc?.id
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }

  // 2) Fire-and-forget mirror to the GAS contact hub (never blocks the user).
  const contactHubUrl = process.env.CONTACT_HUB_URL
  if (contactHubUrl) {
    void fetch(contactHubUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: SITE_DOMAIN }),
      cache: 'no-store',
    }).catch((err) => {
      console.warn('[hub] contact mirror to CONTACT_HUB_URL failed (non-fatal):', err)
    })
  }

  return { ok: true, id }
}

/* ------------------------------------------------------------------ *
 * Media URL resolver (prefer externalUrl per contract)
 * ------------------------------------------------------------------ */

export function resolveMediaUrl(media?: MediaDoc | string | null, size?: string): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url ?? null
  return media.externalUrl ?? media.url ?? null
}

export { HUB_API_URL, SITE_DOMAIN }
