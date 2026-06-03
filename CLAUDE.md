# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Reality check: this site is a **thin static Next.js frontend** — there is **no PayloadCMS, no database, no `pg`, no migrations, no i18n** in this folder, despite what older briefs (BUILDER_BRIEF.md, PRD.md) imply. Content is plain markdown on disk. The workspace-root `../../../CLAUDE.md` (the PM root) explains the wider ecosystem; this file describes only what actually runs here.

## What this site is

`luatsutuvan.org` — a Vietnamese-only **trust/authority guide layer** sitting in front of the conversion site `luatsutuvan.net`. Its job: reassure people hesitant about consulting a lawyer (when to see one, consultation formats, how to prepare), then funnel every primary CTA to `luatsutuvan.net` with UTM tagging. **"Oxford Navy & Gold" international legal-authority aesthetic** (deep oxford navy `#0B2A4A` + antique gold `#C2A14D` on warm ivory; architectural & symbolic imagery), deliberately distinct from the urgent green/orange of its sister `.net` site. (Redesigned 2026-06 off the original teal — see `globals.css` `@theme`.)

Stack: **Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript (strict)**. Animations via `motion` (Framer Motion) + `gsap`. Markdown via `react-markdown`. All pages are SSG. Deploys to Vercel.

## Commands

```bash
npm install
npm run dev      # http://localhost:3402  (port is fixed to 3402)
npm run build
npm run start    # serves the production build on 3402
npm run lint     # next lint
```

There are **no tests** and no Payload/migration scripts (`npx payload ...` does not apply here). `npm run build` is the verification gate — it runs `generateStaticParams` over every guide, so a malformed markdown frontmatter or a broken pillar reference fails the build.

## The content layer (this is the non-obvious part)

Content is authored as **markdown files with YAML frontmatter** in `src/content/guides/<pillar-dir>/<slug>.md` (~40 guides). `src/lib/guides.ts` is the *entire* live content layer:

- Reads every `.md` at build time (cached in-module), parses frontmatter with `gray-matter`.
- Derives `wordCount`, `readingTime`, auto-extracts H2/H3 `headings` for the TOC, and decides `toc` (auto-on when >900 words).
- Frontmatter (`GuideFrontmatter`) can carry structured blocks rendered by dedicated components: `checklist[]`, `faq[]`, `steps[]` (HowTo), plus `schema` ('Article' | 'HowTo' | 'FAQPage'), `related[]` (slugs), `featured`, `heroImage`, `practiceArea`.
- `getRelatedGuides` resolves explicit `related` slugs first, then same `practiceArea`, then same pillar.

**The `cms/` folder is a dormant hub client, NOT wired into the app.** `cms/hub-client.ts` is a typed HTTP client for the central Apolo Content Hub (Payload REST), and `.env.local` has `NEXT_PUBLIC_USE_HUB=0`. `cms/` is **excluded in `tsconfig.json`** and nothing under `src/` imports it. The app runs 100% on local markdown today. If asked to "connect to the hub," that means copying `cms/hub-client.ts` → `src/lib/hub.ts`, wiring its helpers into the route components, and flipping the flag — it is a deliberate future seam, not a regression. `cms/API_CONTRACT.md` is the hub's source of truth if you do.

## Routing & pillars

Five content **pillars** are defined in `src/config/pillars.ts` as the single source of truth. **A pillar's route `slug` is NOT its `id`** — frontmatter and `guides.ts` key off `id` (e.g. `khi-nao`), but the URL uses `slug` (e.g. `khi-nao-nen-gap-luat-su`). Always map through `PILLAR_MAP` / `pillarByRoute`; the content directory names under `src/content/guides/` match the **`id`**, not the slug.

| Route | Page | Source |
|---|---|---|
| `/` | `src/app/page.tsx` | home: hero + pillar grid |
| `/[pillar]` | pillar hub — lists that pillar's guides | `getGuidesByPillar` |
| `/[pillar]/[slug]` | a single guide | `getGuide` |
| `/lien-he`, `/ve-chung-toi`, `/chinh-sach-bao-mat`, `/dieu-khoan-su-dung` | static pages | — |

Canonical URLs are emitted **with a trailing slash** (`/${pillar}/${slug}/`) — keep that consistent in any new links/schema. `sitemap.ts` and `robots.ts` are generated from `getAllGuides()` + `PILLARS`.

## Config & conventions

- `src/config/site.ts` — `SITE` constants, trust metrics, lawyer bio, and **`ctaUrl()`**: every conversion CTA must route to `luatsutuvan.net` through this helper so UTM/`ref` tagging stays consistent. `src/config/apolo.ts` holds shared parent-brand constants.
- **Ecosystem linking rule:** this is a VN site → it links to the VN parent brand (`apolo.com.vn`) and to `luatsutuvan.net` (conversion) / `vothienhien.com` (partner). Do not cross-link to EN parent brands or unrelated conversion sites.
- **Design system** is bespoke Tailwind v4 `@theme` tokens in `src/app/globals.css` (Oxford Navy & Gold palette, 17px base / 1.2 modular scale, `--font-be-vietnam`). There is **no `@tailwindcss/typography`** — guide bodies use the hand-rolled `.guide-prose` class. Reuse the semantic tokens (`text-ink`, `bg-surface`, `text-navy`/`text-navy-700`/`text-navy-400`, `text-gold`/`bg-gold-soft`, `border-line`, `shadow-soft`, `bg-aurora`, `bg-navy-deep`, `bg-guide-grid`, `.section-y`) rather than raw hex. Pillar accents (`navy`/`gold`/`steel`) live in `pillars.ts` + the `ACCENT` dicts. Generated images are referenced by id via `src/lib/assets.ts` (`asset(id)`), sourced from `assets.json` (built by `tools/image-generator`).
- Font: `Be_Vietnam_Pro` via `next/font` (Vietnamese subset) in `layout.tsx`.
- **Every page** ships JSON-LD via `<JsonLd>` (helpers in `src/lib/schema.ts`: organization/website at root layout, breadcrumb + article/howTo + faq per guide) and exports `generateMetadata`. Keep this when adding pages.
- Images: `next/image` only; remote host whitelisted in `next.config.ts` is the R2 CDN (`pub-ebe397ad...r2.dev`). `image-assets.json` is the generation manifest for this site's AI images.
- Animation components live in `src/components/motion/Reveal.tsx` (`ScrollReveal`, `StaggerReveal`/`StaggerItem`, `ScrollHeading`); guide-specific UI blocks in `src/components/guide/` (`Toc`, `Checklist`, `Accordion`, `ProcessSteps`, `CtaBlock`, `TrustSidebar`).

## Contact form

`src/app/api/contact/route.ts` has **no database**. It validates (name + (email | phone) + message) and does a fire-and-forget mirror to the shared Google-Apps-Script aggregator at `CONTACT_HUB_URL`; it never blocks the user. Primary lead capture is on `luatsutuvan.net`, so this is intentionally a light inquiry channel. (Note: `cms/hub-client.ts` contains a richer `submitContact` that also writes to the hub — it is part of the dormant hub path, not the live route.)

## Env

`.env.local` (see `.env.example`): `NEXT_PUBLIC_USE_HUB` (0 = local markdown, live), `NEXT_PUBLIC_SITE_URL`, `CONTACT_HUB_URL`. The hub path additionally needs `HUB_API_URL` + `SITE_DOMAIN` (see `.env.cms.example`) — only relevant once the hub is wired in.

## Frontend invariants (hard-won, keep them)

These are distilled from the ecosystem's builder DNA — only the items that are real for *this* static frontend. (The DNA also carries embedded-Payload rules — `force-dynamic`, `payload migrate`, seed scripts, Media→R2 bridge, Lexical — that do **not** apply here; ignore them.)

- **Never trap content at `opacity:0`.** Reveal animations must be safe if JS/observers don't fire. `src/components/motion/Reveal.tsx` already does this via `useReducedMotion` — preserve that guard on any new reveal; don't hide first-paint content behind an `IntersectionObserver` with no fallback.
- **Mobile/long-form motion is one-shot or CSS, never JS-driven continuous loops** (those freeze mid-scroll on mobile). Match the existing `ease`/duration vocabulary in `Reveal.tsx`.
- **One CTA target, one helper.** Every conversion CTA goes through `ctaUrl()` → `luatsutuvan.net`; no competing CTAs, and NAP/brand strings come from `SITE`/`APOLO` config, never hardcoded. This is already enforced — don't regress it.
- **Use `dvh`, not `100vh`,** for any full-height mobile UI.
- **AI/gradient banners over duplicate stock photos** — never reuse one stock image across guides (duplicate-asset penalty + bland look). Image-gen manifest is `image-assets.json`.
- **Verification gate:** `npm run build` must stay green (it statically renders every guide), and for UI changes do a Playwright mobile pass — no horizontal scroll, no hidden (`opacity:0`) content, hero motion actually advancing, zero console errors.

Known divergence (not a bug, by design): the mobile menu in `Header.tsx` is a simple inline dropdown — **no** `100dvh` / body-scroll-lock / Esc-to-close / portal. The heavier "drawer" pattern from the DNA was deliberately not used for this calm, short-nav trust site. Harden it only if asked.
