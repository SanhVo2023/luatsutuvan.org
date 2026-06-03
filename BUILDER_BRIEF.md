# Builder Brief — luatsutuvan.org

**Site**: luatsutuvan.org — Intake Authority & Trust Support (Phase 2)
**Language**: Vietnamese only (no EN locale)
**Supabase project**: `zxmdegfnjbvytjnwfhfq` (Project 2 — Apolo Funnel Sites, Singapore region `ap-southeast-1`)
**Schema**: `lto` — set in `payload.config.ts` `postgresAdapter({ schemaName: 'lto' })`. **NOT** `tablePrefix` (schema-based separation per Phase 1 reality)
**Audience**: Vietnamese consumers asking the meta-questions BEFORE booking: "When do I need a lawyer?", "What documents to prepare?", "What does consultation cost?", "What happens during a consultation?" — anxious but pre-decision.

## Role in ecosystem
**Trust + authority layer** behind luatsutuvan.net. Reduces the anxiety barrier between "I think I have a problem" and "I will contact a lawyer." Sister site to luatsutuvan.net — they answer different stages of the same buyer journey and cross-link heavily.

This is NOT a scenario site (that's luatsutructuyen.net). This is NOT a conversion machine (that's luatsutuvan.net). It's the **comprehensive guide to the legal consultation process itself**.

## Reading order (do not skip)
1. `./PRD.md` — design direction "Professional Services Guide", structured comprehensive guides, sitemap
2. `./CLAUDE.md` — coding conventions
3. `../../shared-assets/BUILDER_AGENT_BRIEF.md` — Standing Authorizations + Design Vocabulary + Image Generation workflow (NEW: self-serve image gen with 50-gen soft cap)
4. `../../shared-assets/PAYLOAD_SETUP_SPEC.md` — canonical Payload config (Session Pooler, schema-based, `@next/env` patch)
5. `../../shared-assets/SUPABASE_CONFIG.md` — your project ref + connection string. Schema-based separation.
6. `../../shared-assets/SITE_BUILD_CHECKLIST.md` — 7-phase build order
7. `../../shared-assets/SITE_BUILD_FEEDBACK.md` — known pitfalls
8. `../../shared-assets/LEXICAL_FORMAT_REFERENCE.md` — for richText
9. `../../shared-assets/CONTENT_GENERATION_GUIDE.md` — § Quality Rubric (NEW): the bar matters MOST here. This site IS the authority layer.
10. `../../shared-assets/r2-shared/MANIFEST.md` — reusable assets
11. `../../shared-assets/design-patterns/README.md` — animation library + icon convention
12. `./design-refs/` (if present)

## Pre-built scaffold
None. Fresh Next.js project. Follow SITE_BUILD_CHECKLIST.md phase 1.

## Immediate priorities (in order)
1. Initialize Next.js + PayloadCMS scaffold per PAYLOAD_SETUP_SPEC.md §1:
   - `dns.setDefaultResultOrder('ipv4first')`
   - `schemaName: 'lto'`
   - Lexical editor with full features
   - Boot-time env guards
   - Apply `@next/env` patch
2. **Pre-flight** before first migrate: PM_INBOX request — confirm no `lto` schema exists on `zxmdegfnjbvytjnwfhfq`.
3. `npx payload migrate` after PM confirms.
4. Collections per PRD: comprehensive guides, FAQ, glossary, process explainers, contact submissions.
5. Frontend: structured guide hierarchy, breadcrumbs, in-page TOC for long-form content (these guides are LONG — readers should be able to navigate within an article).
6. Generate 100 SEO comprehensive guides per CONTENT_GENERATION_GUIDE.md § Quality Rubric. **This is the highest-bar content site in Phase 2** — content depth is the entire value prop.
7. Image pipeline — reuse from r2-shared/MANIFEST.md heavily; site needs custom imagery for guide hero shots only.
8. Wire contact form to `CONTACT_HUB_URL` per CONTACT_VI.md.

## Design direction
"Professional Services Guide" — calming, thorough, reassuring. Calm Teal primary (`#0A8F85`), sky blue secondary, pale surfaces. Think the well-designed patient guide you receive before a medical procedure. See PRD §2.

**Design vocabulary** (mandatory minimums):
- `ScrollReveal` on every section heading
- `StaggerReveal` on FAQ accordions + guide-card grids
- `ScrollHeading` on major guide H1/H2 (gives the long-form reads weight)
- `HoverZoom` on guide-thumbnail cards
- 4+ patterns total from `shared-assets/design-patterns/animations/`
- Icons via `lucide-react` (FileText, Calendar, Phone, ShieldCheck, BookOpen, etc.) — SVG, NOT raster

## Content quality bar (CRITICAL for this site)
This site lives or dies by the Quality Rubric. Each guide MUST hit:
- **2,500-4,000 words minimum** (exception: glossary entries can be 200-400 words but each must cite at least one statute)
- **Minimum 5 inline statutory citations** per guide; comprehensive guides should have 8-12
- **At least 1 case-pattern example** per guide
- **Structured H2/H3 hierarchy** — readers will jump-scan via TOC
- Real source mix: primary law + procedure code + named precedent patterns + official guidance
- CTA paragraph at the end linking to luatsutuvan.net consultation page (real link, not `#`)
- **Tone**: trang trọng, có dẫn chứng cụ thể; **no filler** ("It is important to note that..." → cut)

This site's whole reason for being is to demonstrate that Apolo Lawyers knows the legal consultation process inside-out. Anything below the bar undermines that positioning.

## Image workflow
**Self-serve, soft cap at 50 generations / ~$5.**
- Heavy reuse from `r2-shared/MANIFEST.md` (backgrounds, document-signing, courthouse, marble texture)
- Site-specific: maybe 5-10 custom shots for major guide categories
- Icons SVG via `lucide-react`
- **Need raster transparency** (e.g. iconography-heavy guide thumbnails with cut-out subjects on the teal backdrop)? Toggle `transparent: true` on the entry — image-generator-ui chroma-keys it server-side. See `../../shared-assets/IMAGE_MANIFEST_SCHEMA.md § Transparent Backgrounds`. Do NOT prompt "transparent PNG" directly — Nano Banana 2 fakes that as solid white.

## Contact strategy
**MODERATE** (per PRD). WhatsApp link, contact form, NO Zalo float (this site is reading-mode, not conversion-mode), NO sticky phone CTA. Form submissions mirror to `CONTACT_HUB_URL`.

## Internal linking
- **Sends traffic to**: luatsutuvan.net (the conversion target — every guide ends with a CTA to consultation booking there)
- **Sister site**: luatsutuvan.net (mutual cross-links across the buyer journey)
- **Authority backlinks**: vothienhien.com (Managing Partner profile)
- **Topic-relevant**: practice-area sites (luatsudansu.vn etc.) when a guide covers a specific area

## Name / terminology rules
Same as other VN sites: "Luật sư Võ Thiện Hiển", consistent profession noun "Luật sư", F-009 rule applies.

## Exit criteria
Standard 8-task checklist + content-specific:
- Average guide word count ≥ 2,800 (sample-test 10 random guides)
- Citation count: average 7+ per guide
- TOC present on every guide longer than 1,500 words
- Lighthouse score ≥ 90

## Status reporting
PM_INBOX.md after each milestone — the inbox-watcher hook flags updates to the PM session.
