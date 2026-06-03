# CMS Integration Kit — how this site consumes the Apolo Content Hub

This `cms/` folder gives the site everything it needs to read content from the
central **Apolo Content Hub** (a headless PayloadCMS). The site is a thin frontend:
**no database, no Payload** — it fetches published content over cached HTTP.

## What's in `cms/`
- `hub-client.ts` — typed fetch client. Copy to `src/lib/hub.ts` and import the helpers.
- `API_CONTRACT.md` — canonical contract: every endpoint, query, and response shape. Source of truth.

## Env (copy `../.env.cms.example` → `.env.local`, fill values)
| Var | Meaning |
|---|---|
| `HUB_API_URL` | Hub base URL. Local: `http://localhost:3001`. Prod: deployed hub URL (see `hub/DEPLOY.md`). |
| `SITE_DOMAIN` | This site's domain — selects its content/config in the hub. |
| `NEXT_PUBLIC_SITE_URL` | This site's public URL (canonicals/sitemap). |
| `CONTACT_HUB_URL` | Google-Apps-Script contact mirror (from `PM_CREDENTIALS.md`). |

## Quick start
```ts
import { getSiteConfig, listRenditions, getRendition } from '@/lib/hub'
const cfg = await getSiteConfig()        // theme, nav, parentBrandLocale for SITE_DOMAIN
const { docs } = await listRenditions()  // this site's published articles
const article = await getRendition(slug) // one article (markdown body)
```
Render `article.body` (markdown) with `shared-assets/components/Markdown.tsx`.
All reads use `fetch(..., { next: { revalidate: 3600 } })` → ISR-cached, no DB pool.

## What the hub serves (shapes in API_CONTRACT.md)
- **renditions** — this site's per-site differentiated articles (PUBLIC, published-only). What you render.
- **site-configs** — theme/nav/parentBrandLocale for this domain.
- **practice-areas / glossary / disclaimers / authors** — shared boilerplate (PUBLIC).
- **contact-submissions** — POST the contact form here (PUBLIC create); also mirror to `CONTACT_HUB_URL`.
- **articles** — canonical SOURCE masters. ADMIN-ONLY. Never serve these; serve `renditions`.

## Rules
- Markdown bodies (not Lexical). Render real HTML; never leak literal `##`.
- Canonical = the rendition's own `canonicalUrl` (self-referential; the variant ranks on its own).
- VN sites link to `apolo.com.vn`, EN to `apololawyers.com` (Issue 13) — driven by site-config `parentBrandLocale`.
- **Design**: do NOT ship the generic default template look. A premium design pass is pending — ask the PM before building UI.

## Reference implementation
`sites/frontends/luatsudansu.vn` is a full working frontend built from `shared-assets/site-template` against this hub. Copy its structure; restyle per brand.
