# How to Wire a Site to the Apolo Central Payload Hub

A detailed, reproducible guide for connecting a thin Next.js frontend (like
`luatsutuvan.net`) to the central **Content Hub** (PayloadCMS v3). It documents the
exact pipeline this site uses, every credential required, and the verification
steps.

> **Content model today:** content is authored as **100% built-in Markdown** —
> `src/content/blog-articles/*.md` files with YAML-style frontmatter. A publish
> script pushes those Markdown files into the Hub as `articles` + published
> `renditions`. The frontend then **fetches the published renditions from the Hub**
> at runtime (with the local Markdown kept only as a build-time fallback). So
> Markdown is the *source of truth you write in*; the Hub is what the site *serves*
> and what the owner edits.

---

## 0. Architecture in one paragraph

The **Hub** is one Next.js + PayloadCMS app holding ALL content for every site,
backed by Supabase Postgres (schema `hub`) and Cloudflare R2 (media). A **frontend**
is a thin Next.js app with **no database** — it calls the Hub's public REST API over
cached HTTP (`src/lib/hub.ts`), renders Markdown bodies, and degrades to a typed
empty state (or local Markdown) if the Hub is unreachable. After any edit, the Hub
POSTs the frontend's `/api/revalidate` so changes appear within seconds.

```
Markdown (.md)  →  publish-blogs.mjs  →  HUB (Payload: articles → renditions, R2 media)
                                              │  public REST API (cached HTTP, ISR)
                                              ▼
                        Frontend (src/lib/hub.ts) → renders pages
                                              ▲
              Hub edit → POST /api/revalidate?secret=… (on-demand ISR)
```

---

## 1. Credentials & configuration required (COMPLETE LIST)

Secret **values** live in `hub/.env.local`, the frontend `.env.local`, the Vercel
project env, and `PM_CREDENTIALS.md` — never in committed code or this doc.

### A. Hub side (only needed to *run* the Hub and *publish* content)
| Key | What it is | Where it lives / how to get it |
|---|---|---|
| `DATABASE_URI` | Supabase **session pooler** URI (port 5432) for schema `hub` | `hub/.env.local`; password in `PM_CREDENTIALS.md` (Funnel project `zxmdegfnjbvytjnwfhfq`) |
| `PAYLOAD_SECRET` | Payload auth/JWT secret | `hub/.env.local` / `PM_CREDENTIALS.md` |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Hub **admin login** (used by the setup/publish scripts) | `hub/.env.local`; admin table in `PM_CREDENTIALS.md` |
| `R2_BUCKET` `R2_ACCOUNT_ID` `R2_ACCESS_KEY_ID` `R2_SECRET_ACCESS_KEY` `R2_ENDPOINT` `R2_PUBLIC_URL` | Cloudflare R2 (media uploads + CDN host) | `PM_CREDENTIALS.md` → Cloudflare R2; bucket `apolowebsite`, CDN `pub-…r2.dev` |
| `REVALIDATE_SECRET` | Shared secret the Hub uses to ping every frontend | `hub/.env.local` — **must match the frontend's value** |
| `NEXT_PUBLIC_SITE_URL` | Hub's own public URL | Vercel env / `hub/.env.local` |

### B. Frontend side (this repo's `.env.local` + Vercel env)
| Key | Example / value | Purpose |
|---|---|---|
| `HUB_API_URL` | `https://apolohub-sanhvo2023s-projects.vercel.app` (prod) · `http://localhost:3001` (dev) | Base URL the frontend fetches from. Use the Hub's **stable** project URL in prod, never a per-deployment URL. |
| `SITE_DOMAIN` | `luatsutuvan.net` | Tenant key — every Hub query filters `where[site.domain][equals]=$SITE_DOMAIN`. |
| `HUB_SITE_ID` | `11` | The Hub `site-configs` numeric id for this domain (used by the contact route to write `contact-submissions`). Get it from the setup script output or `GET /api/site-configs?where[domain][equals]=…`. |
| `REVALIDATE_SECRET` | (same value as the Hub's) | Validates incoming `/api/revalidate` pings. **Must equal the Hub's.** |
| `CONTACT_HUB_URL` | Google Apps Script web-app URL | Lead mirror to the shared sheet (in addition to the Hub). From `PM_CREDENTIALS.md`. |
| `NEXT_PUBLIC_SITE_URL` | `https://luatsutuvan.net` | Canonical URLs / OG. |

### C. Deploy side (to make it public)
| Need | Where |
|---|---|
| **Vercel** account/login (`sanhvo2023`) | Git Credential Manager / `vercel login` |
| **GitHub** push auth | Git Credential Manager (account `SanhVo2023`) |
| Hub `site-settings.frontendBaseUrl` set to the live frontend URL | set by `hub-setup.mjs --frontend …` or in `/admin` |
| Vercel **Deployment Protection = OFF** on both projects | else public gets 401 (see Troubleshooting) |

---

## 2. The Hub data client — `src/lib/hub.ts`

This file is the entire data layer. Key exports:
- `listBlogPosts({ categorySlug?, limit?, page? })` → published `renditions` where `contentType=blog`.
- `getRendition(slug)` → one published rendition for this site.
- `listRenditions({ contentType?, categorySlug? })`, `listCategories(locale)`.
- `getNavigation()` → per-site header/footer global.
- `getSiteSettings()` → per-site NAP / OG / `frontendBaseUrl`.
- Every call uses `next: { revalidate: 3600 }` and returns a typed **empty fallback** on any error (build never crashes).

It reads `HUB_API_URL` and `SITE_DOMAIN` from env. To wire a new site, copy this
file and point those env vars at the Hub + the new domain.

---

## 3. Step-by-step wiring

### Step 1 — Frontend env
Create `.env.local` (gitignored) with the **B. Frontend side** keys above. For local
dev, `HUB_API_URL=http://localhost:3001` and run the Hub locally.

### Step 2 — Register the site in the Hub (tenant + globals)
Run the idempotent setup script — it creates the `site-config` (tenant), `navigation`
(header/footer), `site-settings` (NAP/OG/`frontendBaseUrl`), and blog `categories`:

```bash
# Admin creds are read from hub/.env.local automatically (never on the CLI).
node scripts/hub-setup.mjs --hub http://localhost:3001 --frontend https://luatsutuvan.net
```
Output prints the `site-config id` → put it in the frontend env as `HUB_SITE_ID`.

### Step 3 — Author content as Markdown (the built-in source)
Add files to `src/content/blog-articles/<slug>.md` with frontmatter:
```markdown
---
title: Cấp dưỡng nuôi con sau ly hôn
slug: cap-duong-nuoi-con-sau-ly-hon
category: hon-nhan-gia-dinh        # one of the 8 practice-area category slugs
excerpt: Mức cấp dưỡng và cách yêu cầu…
tags: cấp dưỡng, ly hôn, nuôi con
metaTitle: …            # optional (SEO)
metaDescription: …      # optional (SEO)
heroImageId: blog-divorce   # optional; else auto-mapped from category
---
## Heading
Markdown body…
```
**Content rules enforced by the publisher** (conversion-blog bar): 1,200–2,600 words,
**≥3 statutory references** (`(Điều … )`, `(Luật … )`, etc.), a consultation CTA
(`/lien-he`, `/dat-lich-tu-van`, `/gui-cau-hoi`, or the phone number), **Markdown
only** (no raw HTML). Citations from `*.gov.vn` / `vbpl.vn` only; author byline
`editorial-team`.

### Step 4 — Images on R2
Hero images come from `assets.json` (written by the reuse-first image generator,
`tools/image-generator/headless.mjs`). The publisher maps each category to a default
hero id (`HERO_BY_CATEGORY`) or uses the frontmatter `heroImageId`. Image URLs are R2
CDN links (`pub-…r2.dev/<site>/…webp`).

### Step 5 — Publish Markdown → Hub
```bash
node scripts/publish-blogs.mjs --hub http://localhost:3001 --dry-run   # validate first
node scripts/publish-blogs.mjs --hub http://localhost:3001             # publish
```
For each `.md`: creates/updates a source `article` (`contentType: blog`, `targetSites:
[siteId]`) and a **published** per-site `rendition` (with `heroImageUrl`, `category`,
`tags`, self-referential `canonicalUrl`, SEO `meta`). Idempotent (re-running updates).

### Step 6 — Wire the pages to fetch (already done in this repo)
- `src/app/noi-dung-tu-van/page.tsx` → `listBlogPosts()` (local Markdown fallback).
- `src/app/noi-dung-tu-van/[slug]/page.tsx` → `getRendition(slug)` + `<Markdown>`.
- `src/app/layout.tsx` → `getNavigation()` (passed to chrome).
- `src/components/Footer.tsx` → renders Hub footer columns (fallback to defaults).
- `src/app/sitemap.ts` → Hub blog URLs.
- `src/app/api/contact/route.ts` → also POSTs to Hub `contact-submissions` via `HUB_SITE_ID`.
- `src/app/api/revalidate/route.ts` → validates `?secret=$REVALIDATE_SECRET`, calls `revalidatePath`.

### Step 7 — Deploy (make it public)
1. Deploy the **Hub** first (must be public at build + revalidate time). Set all
   **A. Hub side** env on Vercel; enable Fluid Compute.
2. Deploy the **frontend**. Set all **B. Frontend side** env (point `HUB_API_URL` at
   the Hub's stable URL).
3. **Disable Vercel Deployment Protection** on both projects:
   `vercel project protection disable <project> --sso`.
4. Set the Hub's `site-settings.frontendBaseUrl` to the live frontend URL (re-run
   `hub-setup.mjs --frontend <url>` or edit in `/admin`) so revalidation pings land.

### Step 8 — Verify
```bash
curl -I https://<frontend>/                      # 200 (not 401)
curl -s https://<frontend>/noi-dung-tu-van | grep -c '/noi-dung-tu-van/'   # post links present
curl -s -o /dev/null -w '%{http_code}' https://<hub>/api/renditions?limit=1   # 200 public
```
Then edit a post in the Hub `/admin`, confirm it appears on the frontend within
seconds (on-demand revalidation).

---

## 4. Troubleshooting
| Symptom | Cause | Fix |
|---|---|---|
| Public site returns **401 / "Authentication Required"** | Vercel Deployment Protection (SSO) is ON | `vercel project protection disable <project> --sso` (both Hub + frontend) |
| Blog list is **empty** in prod | `HUB_API_URL` wrong/unreachable, or Hub protected → frontend 401s the fetch → empty fallback | Fix `HUB_API_URL` to the Hub's stable public URL; ensure Hub protection is OFF; redeploy |
| Edits **don't appear** until ~1h | `frontendBaseUrl` or `REVALIDATE_SECRET` mismatch → revalidation ping fails | Make secrets equal on both sides; set `frontendBaseUrl` to the real frontend URL |
| `publish-blogs.mjs` rejects an article | Below the content bar | Meet 1,200–2,600 words, ≥3 refs, a CTA, Markdown only |
| `hub-setup.mjs` "No admin creds" | Script can't read `hub/.env.local` | Pass `--hub-env <path>` or set `HUB_ADMIN_EMAIL`/`HUB_ADMIN_PASSWORD` |

## 5. What's hub-driven vs still built-in (this site, today)
- **Hub-driven (editable in `/admin`):** blog/Cẩm nang posts, footer columns + legal line, lead capture (`contact-submissions`), sitemap blog URLs.
- **Still built-in Markdown / config (code change + redeploy to edit):** homepage sections, practice-area pages, FAQ page, Google-Ads `/lp/*` pages, company NAP constants. These can be migrated to Hub `pages` later using the same pattern.
