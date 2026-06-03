# PRD: luatsutuvan.org

## Product Requirements Document

**Project**: luatsutuvan.org -- Intake Authority & Trust Support
**Company**: CONG TY LUAT APOLO LAWYERS
**Managing Partner**: Luat su Vo Thien Hien (Henry Vo)
**Role in Ecosystem**: Trust-building support site for consultation intake funnel
**Language**: Vietnamese only
**Phase**: Phase 2
**Last Updated**: 2026-04-03

---

## 1. Project Overview

### Purpose

luatsutuvan.org is the trust and authority layer behind luatsutuvan.net. While luatsutuvan.net is the conversion machine (forms, calls, bookings), luatsutuvan.org answers the questions people ask BEFORE they are ready to submit a consultation request: "When should I actually see a lawyer?", "What types of consultation exist?", "What documents do I need to prepare?", "How much does it cost?", "What happens during a legal consultation?"

This site reduces the anxiety barrier between "I think I have a legal problem" and "I will contact a lawyer." It is the reassuring hand on the shoulder that says: "Here is exactly what to expect. You are making the right decision."

### Key Differentiator

This is NOT the intake site (that is luatsutuvan.net). This is NOT a scenario site (that is luatsutructuyen.net). This site does NOT publish fragmented situational content. Instead, it provides comprehensive, structured, authoritative guides about the legal consultation process itself -- the meta-content about getting legal help.

### Tech Stack

- Next.js 15 (App Router)
- PayloadCMS v3 (independent instance)
- Supabase PostgreSQL
- Tailwind CSS v4
- GSAP + Framer Motion for animations
- Nano Banana 2 for all non-logo images

### Success Metrics

- Conversion rate to luatsutuvan.net: target 15-22%
- Trust score (survey-based): target 8.5/10
- Average time on page: target 2.5+ minutes
- Pages per session: target 2.0+
- Bounce rate: target below 50%
- 100 indexed SEO content pages within 6 months

---

## 2. Design Direction

### Concept: "Professional Services Guide"

The design language draws from premium healthcare "what to expect" websites and professional services guides. The site should feel like the well-designed patient guide you receive before a medical procedure -- calming, thorough, and reassuring. Everything communicates: "We have done this thousands of times. Here is exactly what will happen. You are in safe hands."

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Calm Teal | #0A8F85 | Headlines, active states, primary accents |
| Secondary | Sky Blue | #4DA3D4 | Links, secondary buttons, informational highlights |
| Background | Soft White | #FAFCFD | Page backgrounds |
| Surface | Pale Teal | #EFF8F7 | Card backgrounds, info boxes |
| Surface Alt | Light Blue Gray | #F0F4F8 | Alternate section backgrounds |
| Text Primary | Deep Slate | #1E293B | Headlines, body text |
| Text Secondary | Cool Gray | #64748B | Captions, metadata, labels |
| Trust Gold | Warm Gold | #C5972C | Star ratings, credential badges, accents |
| Success | Soft Green | #34A853 | Checkmarks, positive indicators |
| Info | Soft Blue | #4285F4 | Info boxes, tips |

### Typography

- **Headings**: Be Vietnam Pro (SemiBold/Bold) -- professional, clear, Vietnamese-optimized
- **Body**: Be Vietnam Pro (Regular) -- comfortable reading for long-form guides
- **Step Numbers**: Be Vietnam Pro (ExtraBold, oversized) -- for step-by-step visuals
- **Credentials**: Be Vietnam Pro (Medium, small caps where applicable)
- **Scale**: Base 17px, modular scale ratio 1.2 (tighter scale for guide-style content)

### Layout Principles

1. **Guide-First Layout**: Pages structured as visual step-by-step guides, not blog articles. Think instruction manuals, not magazines.
2. **Progressive Information**: Start with the simplest overview, then progressively reveal detail. Accordion sections for depth without overwhelm.
3. **Iconography-Heavy**: Every section, every step, every list item accompanied by a clean icon. Visual communication reduces anxiety.
4. **Trust Sidebar**: Desktop layouts include a persistent right sidebar showing lawyer credentials, response time, and a mini CTA to luatsutuvan.net.
5. **Breathing Room**: Extra-generous padding and margins. Dense information presented with maximum whitespace. Nothing feels rushed or overwhelming.
6. **Credential Displays**: Lawyer qualifications, bar association numbers, years of experience prominently displayed with badge-style formatting.

### Motion & Interaction

- Step-by-step reveals: Each step fades in sequentially as user scrolls (GSAP ScrollTrigger, 0.3s stagger)
- Accordion sections: Smooth height animation with content fade (Framer Motion, 0.25s)
- Trust badges: Subtle scale-up on scroll-into-view (1.0 to 1.02, Framer Motion)
- Checklist items: Checkmark draw-on animation when scrolled into view (GSAP DrawSVG)
- Page transitions: Gentle fade (0.2s) between pages
- Hover states: Cards lift with soft shadow increase (CSS transitions)
- Progress indicators: Animated progress bars for multi-section guides

### Mobile Approach

- Card-based navigation for guide categories
- Collapsible sections (accordions) for long guides on mobile
- Sticky "Tu Van Ngay" mini-bar at bottom (subtle, not aggressive)
- Touch-friendly checklist interactions
- Swipeable step-by-step carousels for process guides

---

## 3. Sitemap & Page Structure

### Primary Navigation

```
/                                   -- Homepage (Guide Directory + Trust Overview)
/khi-nao-nen-gap-luat-su/          -- When to See a Lawyer (Hub)
/hinh-thuc-tu-van/                  -- Consultation Types (Hub)
/chuan-bi-ho-so/                    -- Document Preparation (Hub)
/faq-tu-van/                        -- FAQ Hub
/landing-linh-vuc/                  -- Practice Area Landing Hub
/ve-chung-toi/                      -- About
/lien-he/                           -- Contact
```

### "Khi Nao Nen Gap Luat Su" Section (~20 pages)

```
/khi-nao-nen-gap-luat-su/
  /dau-hieu-can-luat-su/                   -- Signs You Need a Lawyer
  /tu-giai-quyet-hay-can-luat-su/          -- DIY vs. Hiring a Lawyer
  /tinh-huong-khan-cap-can-luat-su/        -- Emergency Situations
  /khi-nao-nen-gap-luat-su-ly-hon/         -- When to See a Divorce Lawyer
  /khi-nao-nen-gap-luat-su-dat-dai/        -- When to See a Property Lawyer
  /khi-nao-nen-gap-luat-su-doanh-nghiep/   -- When to See a Business Lawyer
  /khi-nao-nen-gap-luat-su-lao-dong/       -- When for Labor Issues
  /khi-nao-nen-gap-luat-su-hinh-su/        -- When for Criminal Issues
  /khi-nao-nen-gap-luat-su-thua-ke/        -- When for Inheritance
  /khi-nao-nen-gap-luat-su-hop-dong/       -- When for Contracts
  /sai-lam-khi-khong-gap-luat-su-som/      -- Mistakes from Not Seeing a Lawyer Early
  /luat-su-co-the-giup-gi/                 -- What Can a Lawyer Actually Do?
  /su-khac-biet-luat-su-va-tu-van/         -- Lawyer vs. Legal Advisor Difference
  ...and 7 more topical pages
```

### "Hinh Thuc Tu Van" Section (~15 pages)

```
/hinh-thuc-tu-van/
  /tu-van-truc-tiep/                    -- In-Person Consultation
  /tu-van-online/                       -- Online Consultation
  /tu-van-qua-dien-thoai/              -- Phone Consultation
  /tu-van-qua-email/                   -- Email Consultation
  /tu-van-qua-zalo/                    -- Zalo Consultation
  /so-sanh-hinh-thuc-tu-van/           -- Comparison of All Types
  /tu-van-mien-phi-vs-tra-phi/         -- Free vs. Paid Consultation
  /chi-phi-tu-van-luat-su-2026/        -- Consultation Cost Guide 2026
  /thoi-gian-tu-van-bao-lau/           -- How Long Does a Consultation Take?
  /tu-van-nhom-vs-ca-nhan/             -- Group vs. Individual Consultation
  ...and 5 more
```

### "Chuan Bi Ho So" Section (~20 pages)

```
/chuan-bi-ho-so/
  /checklist-ho-so-ly-hon/              -- Divorce Document Checklist
  /checklist-ho-so-dat-dai/             -- Property Document Checklist
  /checklist-ho-so-doanh-nghiep/        -- Business Document Checklist
  /checklist-ho-so-lao-dong/            -- Labor Document Checklist
  /checklist-ho-so-hinh-su/             -- Criminal Case Document Checklist
  /checklist-ho-so-thua-ke/             -- Inheritance Document Checklist
  /checklist-ho-so-hop-dong/            -- Contract Document Checklist
  /cach-to-chuc-ho-so-phap-ly/         -- How to Organize Legal Documents
  /bang-chung-can-thu-thap/             -- Evidence Collection Guide
  /lam-gi-khi-khong-co-giay-to/        -- What If You Lost Documents?
  /ho-so-can-mang-khi-gap-luat-su/     -- What to Bring to a Consultation
  /cach-viet-mo-ta-van-de-phap-ly/     -- How to Describe Your Legal Issue
  ...and 8 more preparation guides
```

### "FAQ Tu Van" Section (~20 pages)

```
/faq-tu-van/
  /luat-su-co-giu-bi-mat-khong/        -- Do Lawyers Keep Secrets?
  /co-phai-tra-tien-ngay-khong/        -- Do I Pay Immediately?
  /tu-van-co-rang-buoc-khong/          -- Am I Bound After Consultation?
  /co-the-doi-luat-su-khong/           -- Can I Change Lawyers?
  /luat-su-co-cam-ket-thang-khong/     -- Do Lawyers Guarantee Winning?
  /faq-chi-phi-luat-su/                -- FAQ About Legal Fees
  /faq-thoi-gian-giai-quyet/          -- FAQ About Case Timeline
  /faq-quyen-loi-khach-hang/          -- FAQ About Client Rights
  /faq-tu-van-online/                  -- FAQ About Online Consultation
  /faq-tu-van-lan-dau/                -- FAQ About First Consultation
  ...and 10 more FAQ pages
```

### "Landing Linh Vuc" Section (~15 pages)

```
/landing-linh-vuc/
  /tu-van-luat-ly-hon/                  -- Divorce Law Consultation Guide
  /tu-van-luat-dat-dai/                 -- Property Law Consultation Guide
  /tu-van-luat-doanh-nghiep/           -- Business Law Consultation Guide
  /tu-van-luat-lao-dong/               -- Labor Law Consultation Guide
  /tu-van-luat-hinh-su/                -- Criminal Law Consultation Guide
  /tu-van-luat-thua-ke/                -- Inheritance Law Consultation Guide
  /tu-van-luat-hop-dong/               -- Contract Law Consultation Guide
  /tu-van-luat-dan-su/                 -- Civil Law Consultation Guide
  ...and 7 more practice area guides
```

### Utility Pages (5 pages)

```
/chinh-sach-bao-mat/                -- Privacy Policy
/dieu-khoan-su-dung/                -- Terms of Use
/sitemap.xml                        -- XML Sitemap
/robots.txt                         -- Robots
/404                                -- Custom 404
```

### Total Page Count: ~100

- 1 Homepage
- ~20 "Khi Nao" pages
- ~15 "Hinh Thuc" pages
- ~20 "Chuan Bi" pages
- ~20 FAQ pages
- ~15 Practice area landing pages
- 3 About/Contact/Utility
- 5 Standard utility pages

---

## 4. SEO Strategy

### Primary Keywords

| Keyword | Monthly Search Volume (est.) | Difficulty | Intent |
|---------|------------------------------|------------|--------|
| tu van phap luat | 5,400 | High | Informational |
| luat su tu van nhanh | 1,100 | Medium | Transactional |
| dich vu luat su online | 1,600 | Medium | Informational/Transactional |
| khi nao can luat su | 900 | Low | Informational |
| chuan bi ho so gap luat su | 600 | Low | Informational |
| chi phi tu van luat su | 1,800 | Medium | Informational |
| tu van luat mien phi | 3,200 | High | Transactional |
| luat su tu van la gi | 500 | Low | Informational |

### On-Page SEO Requirements

- **Title Tag Formula**: `[Topic] -- Huong Dan Chi Tiet [Year] | Luat Su Tu Van`
- **Meta Description Formula**: `Tim hieu [topic] tu A den Z. Huong dan tu luat su chuyen nghiep giup ban [benefit]. Cap nhat moi nhat 2026.`
- **H1**: One per page, informative and reassuring tone
- **H2-H4**: Structured hierarchy for guide-style content (critical for featured snippets)
- **Schema Markup**: FAQPage, HowTo, Article, BreadcrumbList, LegalService
- **Featured Snippet Optimization**: Use definition boxes, numbered lists, and comparison tables formatted for snippet extraction
- **Image Alt Text**: Descriptive, keyword-natural, Vietnamese

### Technical SEO

- Server-side rendering via Next.js App Router
- HowTo and FAQ schema on all guide and FAQ pages
- Canonical URLs on all pages
- Core Web Vitals targets: LCP < 2.0s, FID < 70ms, CLS < 0.05
- Table of contents auto-generated for pages > 1,500 words
- Sticky TOC sidebar on desktop for long guides
- Lazy-loaded images with blur-up placeholders
- Structured breadcrumbs on all pages

### Content SEO Approach

Focus on capturing featured snippets and "People Also Ask" boxes:
- Structure every guide with clear question-answer format
- Use `<details>/<summary>` style accordions (with proper schema)
- Include comparison tables (X vs. Y format)
- Use numbered step lists for all process content
- Target PAA questions as H2s within relevant pages

---

## 5. Content Plan for 100 SEO Pages

### Content Pillar Distribution

| Pillar | Count | Focus |
|--------|-------|-------|
| Khi nao nen gap luat su | 20 | Trigger recognition content -- helping readers identify when they need legal help |
| Hinh thuc tu van | 15 | Consultation type guides -- what each method involves and when to choose it |
| Chuan bi ho so | 20 | Preparation content -- checklists, document guides, evidence collection |
| FAQ tu van | 20 | Anxiety-reduction content -- answering common fears and questions |
| Landing linh vuc | 15 | Practice-area trust pages -- what consultation looks like per legal area |
| Hub + Utility | 10 | Homepage, hub pages, about, contact, legal pages |

### Content Template: "Khi Nao" Articles

```
Word Count: 1,200-1,800 words
Tone: Reassuring, authoritative, empathetic

Structure:
1. Opening (100 words): Normalize the anxiety of seeking legal help
2. Dau hieu nhan biet (300 words): Clear signs/indicators in list format
3. Vi du cu the (300 words): 2-3 real-world examples (brief, relatable)
4. Rui ro neu khong hanh dong (200 words): What happens if you delay
5. Buoc tiep theo (200 words): Exactly what to do next
6. CTA Block: Link to luatsutuvan.net with reassuring copy
7. Related guides: 3-4 links to preparation checklists and FAQ
```

### Content Template: "Chuan Bi" Checklists

```
Word Count: 1,000-1,500 words
Tone: Organized, helpful, practical

Structure:
1. Opening (100 words): Why preparation matters
2. Checklist (500 words): Numbered, detailed checklist with explanations
3. Luu y quan trong (200 words): Common mistakes to avoid
4. Meo tu luat su (200 words): Pro tips from lawyers
5. Buoc tiep theo (100 words): "Now that you are prepared..."
6. CTA Block: "Da chuan bi xong? Dat lich tu van ngay" linking to luatsutuvan.net
7. Downloadable checklist: PDF version (optional, for lead capture)
```

### Content Template: FAQ Pages

```
Word Count: 800-1,200 words
Tone: Direct, honest, demystifying

Structure:
1. Main question as H1
2. Short answer (50 words): Direct, no hedging
3. Chi tiet (300 words): Expanded explanation with context
4. Cau hoi lien quan (300 words): 3-4 related questions with brief answers
5. CTA Block: "Con thac mac? Hoi luat su truc tiep" linking to luatsutuvan.net
6. Schema: FAQPage markup on every FAQ page
```

### Sample Content Titles (25 of 100)

1. Khi nao ban thuc su can gap luat su? 12 dau hieu ro rang
2. Tu giai quyet hay thue luat su -- So sanh chi tiet
3. Tu van truc tiep vs. tu van online -- Nen chon hinh thuc nao?
4. Checklist ho so ly hon -- Danh sach day du can chuan bi
5. Luat su co giu bi mat thong tin cua ban khong?
6. Chi phi tu van luat su 2026 -- Bang gia chi tiet
7. Lan dau gap luat su -- Can mang theo nhung gi?
8. 10 sai lam pho bien khi khong gap luat su som
9. Tu van qua Zalo -- Quy trinh va luu y
10. Checklist ho so tranh chap dat dai
11. Luat su co the giup gi cho ban? Huong dan toan dien
12. Tu van mien phi va tu van tra phi -- Khac nhau the nao?
13. Cach viet mo ta van de phap ly cho luat su hieu nhanh
14. Khi nao can luat su ly hon? 8 tinh huong cu the
15. Thoi gian tu van luat su mat bao lau?
16. Co phai tra tien ngay sau buoi tu van khong?
17. Quyen loi cua ban khi la khach hang cua luat su
18. Checklist ho so thanh lap doanh nghiep
19. Tu van luat lao dong -- Nhung dieu can biet truoc khi gap luat su
20. Lam gi khi mat giay to quan trong truoc khi gap luat su?
21. So sanh cac hinh thuc tu van phap luat tai Viet Nam
22. Khi nao can luat su hinh su? Huong dan khan cap
23. Cach to chuc ho so phap ly gon gang va hieu qua
24. Tu van nhom vs. tu van ca nhan -- Nen chon hinh thuc nao?
25. FAQ: Nhung cau hoi thuong gap khi tu van lan dau

---

## 6. Contact Strategy

### Contact Level: Moderate-Strong

This site builds trust to support conversion at luatsutuvan.net. Contact elements are present and accessible but not aggressive. The primary CTA always routes to luatsutuvan.net rather than capturing leads directly.

### Contact Elements

| Element | Implementation | Priority | Notes |
|---------|---------------|----------|-------|
| Contact Form | Simple form on /lien-he/ | Required | Basic inquiry form, not full intake |
| Phone Number | Footer, contact page, about page | Optional | Displayed but not emphasized |
| Zalo Link | Footer, contact page | Optional | Secondary channel |
| Floating CTA Button | "Dat Lich Tu Van" linking to luatsutuvan.net | Required | Subtle, appears after 40% scroll |
| In-Content CTA | End-of-guide CTA blocks linking to luatsutuvan.net | Required | Reassuring tone, not urgent |
| WhatsApp | Not included | N/A | -- |

### CTA Tone Guidelines

Unlike luatsutuvan.net (urgent, action-oriented), CTAs on this site should be:
- Reassuring: "Ban da san sang -- dat lich tu van ngay"
- Encouraging: "Buoc tiep theo: gui cau hoi cho luat su"
- Validating: "Da hieu quy trinh? Lien he de bat dau"
- Never pressuring or using false urgency

### Contact Information

- **Head Office**: 108 Tran Dinh Xu, TP.HCM
- **Branch**: K&M Tower, 33 Ung Van Khiem
- **Phone**: 0903 419 479
- **Email**: contact@apolo.com.vn
- **Zalo**: https://zalo.me/apololawyers

---

## 7. CMS Collections (PayloadCMS v3)

### Collection: Guides

```typescript
{
  slug: 'guides',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'pillar', type: 'select', options: [
      'khi-nao', 'hinh-thuc', 'chuan-bi', 'faq', 'landing-linh-vuc'
    ], required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'tableOfContents', type: 'checkbox', defaultValue: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'checklist', type: 'array', fields: [
      { name: 'item', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'required', type: 'checkbox', defaultValue: true }
    ]},
    { name: 'faqItems', type: 'array', fields: [
      { name: 'question', type: 'text' },
      { name: 'answer', type: 'richText' }
    ]},
    { name: 'processSteps', type: 'array', fields: [
      { name: 'stepNumber', type: 'number' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'richText' },
      { name: 'icon', type: 'upload', relationTo: 'media' },
      { name: 'duration', type: 'text' }
    ]},
    { name: 'ctaText', type: 'text', defaultValue: 'Dat Lich Tu Van Ngay' },
    { name: 'ctaUrl', type: 'text', defaultValue: 'https://luatsutuvan.net/dat-lich-tu-van' },
    { name: 'relatedGuides', type: 'relationship', relationTo: 'guides', hasMany: true },
    { name: 'practiceArea', type: 'select', options: [
      'ly-hon', 'dat-dai', 'doanh-nghiep', 'dan-su', 'hinh-su', 'lao-dong', 'thua-ke', 'hop-dong', 'general'
    ]},
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'readingTime', type: 'number' },
    { name: 'publishedDate', type: 'date' },
    { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

### Collection: Categories

```typescript
{
  slug: 'categories',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'pillar', type: 'select', options: [
      'khi-nao', 'hinh-thuc', 'chuan-bi', 'faq', 'landing-linh-vuc'
    ]},
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' }
  ]
}
```

### Collection: LawyerCredentials

```typescript
{
  slug: 'lawyer-credentials',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'barNumber', type: 'text' },
    { name: 'yearsExperience', type: 'number' },
    { name: 'specializations', type: 'array', fields: [
      { name: 'area', type: 'text' }
    ]},
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'shortBio', type: 'textarea' },
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

### Collection: TrustBadges

```typescript
{
  slug: 'trust-badges',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'value', type: 'text' },
    { name: 'order', type: 'number' },
    { name: 'placement', type: 'select', options: ['sidebar', 'hero', 'footer', 'inline'], hasMany: true }
  ]
}
```

### Collection: Media

```typescript
{
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 200 },
      { name: 'card', width: 600, height: 400 },
      { name: 'hero', width: 1400, height: 600 },
      { name: 'og', width: 1200, height: 630 },
      { name: 'icon', width: 80, height: 80 }
    ]
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'nanoBananaPrompt', type: 'textarea' }
  ]
}
```

### Global: SiteSettings

```typescript
{
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactEmail', type: 'text' },
    { name: 'zaloUrl', type: 'text' },
    { name: 'primaryCtaText', type: 'text' },
    { name: 'primaryCtaUrl', type: 'text' },
    { name: 'sidebarCtaEnabled', type: 'checkbox', defaultValue: true },
    { name: 'floatingButtonEnabled', type: 'checkbox', defaultValue: true },
    { name: 'floatingButtonScrollTrigger', type: 'number', defaultValue: 40 },
    { name: 'analyticsId', type: 'text' },
    { name: 'footerText', type: 'richText' }
  ]
}
```

---

## 8. AI Image Asset List (Nano Banana 2 Prompts)

### Hero Images

1. **Homepage Hero**
   Prompt: `"Professional Vietnamese lawyer having a calm reassuring conversation with a client in a modern bright office, soft teal and blue color accents, warm natural lighting, trust and comfort feeling, clean modern interior with plants, professional photography style"`

2. **Khi Nao Nen Gap Luat Su Hub**
   Prompt: `"Thoughtful Vietnamese person at a desk looking at documents with a contemplative expression, soft question mark light element in background, teal and cream color palette, reassuring mood, modern clean photography, natural lighting"`

3. **Hinh Thuc Tu Van Hub**
   Prompt: `"Split composition showing three consultation methods: in-person meeting, phone call, and laptop video call, all featuring Vietnamese professionals, soft teal palette, clean modern style, informational infographic feeling"`

4. **Chuan Bi Ho So Hub**
   Prompt: `"Neatly organized stack of legal documents and folders on a clean modern desk with a checklist and pen, soft teal and white palette, organized and calming feeling, overhead angle, professional photography"`

5. **FAQ Hub**
   Prompt: `"Friendly Vietnamese lawyer gesturing openly as if answering a question, speech bubble graphic elements, soft teal and sky blue palette, approachable and demystifying mood, modern clean background"`

### Guide Illustrations

6. **Step-by-Step Process (Generic)**
   Prompt: `"Clean infographic-style illustration showing 4 connected steps with icons: question mark, document, handshake, checkmark, teal and blue gradient, modern flat design, white background, professional"`

7. **Document Checklist Visual**
   Prompt: `"Illustration of a checklist on a clipboard with checkmarks, surrounded by floating document icons, teal and green accents, clean flat design, organized and reassuring feeling, white background"`

8. **Consultation Types Comparison**
   Prompt: `"Three side-by-side illustrations: office meeting room, phone with sound waves, laptop with video call, each in a rounded rectangle, teal palette, modern flat design, clean comparison layout"`

9. **When to See a Lawyer -- Warning Signs**
   Prompt: `"Gentle illustration of warning sign indicators: a clock, a document with exclamation mark, a calendar with X marks, teal and amber accents, informational but not alarming, modern flat style"`

10. **Lawyer Credentials Display**
    Prompt: `"Illustration of a professional certificate frame with a scales of justice badge, gold and teal accents, elegant but modern flat design, trust-building visual, white background"`

### Practice Area Guide Illustrations (8 images)

11. **Divorce Consultation Guide**
    Prompt: `"Soft illustration of two paths diverging from a house symbol, with a guiding hand pointing the way, teal and warm tones, gentle metaphorical visual, modern flat style, reassuring"`

12. **Property Law Guide**
    Prompt: `"Illustration of a house with a magnifying glass examining the foundation, document elements floating around, teal and earth tones, thorough and methodical feeling, modern flat design"`

13. **Business Law Guide**
    Prompt: `"Illustration of a corporate building with a protective shield, contract document visible, teal and professional blue tones, security and preparation feeling, modern flat style"`

14. **Labor Law Guide**
    Prompt: `"Illustration of a handshake between worker and employer figures with a protective umbrella above, teal and warm blue tones, protective and empowering, modern flat design"`

15. **Criminal Law Guide**
    Prompt: `"Illustration of a shield with a gavel, balanced and authoritative composition, teal and deep navy tones, serious but reassuring, modern flat design, professional"`

16. **Inheritance Guide**
    Prompt: `"Illustration of a family tree with document branches, gentle and respectful composition, teal and warm gold accents, legacy and care feeling, modern flat style"`

17. **Contract Law Guide**
    Prompt: `"Illustration of a contract document with a magnifying glass highlighting key clauses, pen ready to annotate, teal and blue, precise and helpful feeling, modern flat design"`

18. **Civil Law Guide**
    Prompt: `"Illustration of two people at a mediation table with a balanced scale between them, teal and neutral tones, fairness and resolution feeling, modern flat style"`

### UI Elements

19. **Trust Badge Icons (Set of 6)**
    Prompt: `"Set of 6 minimal professional icons: (1) shield with checkmark, (2) clock with speed lines, (3) certificate badge, (4) handshake, (5) lock/privacy, (6) star rating -- teal gradient, consistent flat design style, white background"`

20. **Section Background Patterns**
    Prompt: `"Subtle repeating pattern of thin connected lines forming a network, very light teal on white, low opacity, suitable for section background, professional and modern, seamless tile"`

### OG Image Template

21. **Default OG Template**
    Prompt: `"Clean professional layout background with soft teal to white gradient, subtle geometric pattern, space for text overlay, trustworthy and authoritative feeling, 1200x630 ratio"`

---

## 9. Internal Linking Strategy

### Outbound Links (From This Site)

| Target Site | Link Type | Placement | Purpose |
|-------------|-----------|-----------|---------|
| luatsutuvan.net | Primary CTA | Every guide (end-of-content CTA block) | Drive prepared leads to intake |
| luatsutuvan.net | Floating Button | "Dat Lich Tu Van" on all pages | Persistent conversion option |
| luatsutuvan.net | Inline Link | Within "Buoc tiep theo" sections | Natural next-step routing |
| law.org.vn | Authority Link | Credential sections, about page | Authority reference |

### Inbound Links (To This Site)

| Source Site | Link Type | Context |
|-------------|-----------|---------|
| law.org.vn | Resource Link | From authority content to consultation preparation guides |
| luatsutuvan.net | Trust Link | From intake forms to "Huong dan chuan bi" pages |
| luatsutructuyen.net | Preparation Link | From scenarios to preparation checklists |

### Internal Cross-Linking Rules

1. Every "Khi nao" article links to at least 2 relevant "Chuan bi" checklists
2. Every "Chuan bi" checklist links to the corresponding "Khi nao" article and FAQ
3. Every FAQ page links to the most relevant guide in another pillar
4. Every "Landing linh vuc" page links to the "Khi nao", "Chuan bi", and FAQ for that practice area
5. Hub pages link to all child pages within their pillar
6. Homepage features one article from each pillar
7. All pages include a "Huong dan lien quan" section with 3-4 cross-pillar recommendations

### Link Anchor Text Guidelines

- For internal links: Use descriptive, helpful anchors: "Xem checklist chuan bi ho so ly hon"
- For luatsutuvan.net links: Reassuring action anchors: "Dat lich tu van khi ban da san sang"
- Avoid generic anchors
- Include practice-area terms in anchors naturally

### Breadcrumb Structure

```
Trang chu > [Pillar Name] > [Guide Title]
Example: Trang chu > Chuan bi ho so > Checklist ho so ly hon
```

---

## 10. Conversion Funnel

### Funnel Overview

```
AWARENESS (from Google search / law.org.vn / direct)
    |
    v
EDUCATION (reader learns about consultation process)
    |
    v
TRUST BUILDING (reader sees credentials, reads FAQ, anxiety reduced)
    |
    v
PREPARATION (reader uses checklists, organizes documents)
    |
    v
READINESS (reader feels prepared and confident)
    |
    v
CONVERSION (clicks through to luatsutuvan.net to book/submit)
```

### Funnel Stage Details

#### Stage 1: Arrival & Orientation
- **Entry Points**: Google organic (informational queries), referrals from law.org.vn, links from luatsutuvan.net (for unprepared leads sent back to prepare)
- **Goal**: Reader finds the guide relevant to their situation
- **Key Elements**: Clear navigation, pillar-based structure, search functionality
- **Metric**: Bounce rate < 50%

#### Stage 2: Education & Understanding
- **Goal**: Reader understands the consultation process and what to expect
- **Key Elements**: Step-by-step guides, consultation type comparisons, cost transparency
- **Metric**: Average time on page > 2.5 minutes

#### Stage 3: Trust Building
- **Goal**: Reader's anxiety about contacting a lawyer is significantly reduced
- **Key Elements**: FAQ answers, lawyer credentials, confidentiality guarantees, client rights
- **Metric**: Pages per session > 2.0 (reading multiple trust-building pages)

#### Stage 4: Preparation
- **Goal**: Reader actively prepares for a consultation using site resources
- **Key Elements**: Downloadable checklists, document guides, "how to describe your problem" guides
- **Metric**: Checklist page views, time on checklist pages > 3 minutes

#### Stage 5: Conversion to luatsutuvan.net
- **Goal**: Reader clicks through to consultation intake feeling prepared and confident
- **Key Elements**: Reassuring end-of-guide CTAs, floating button, contextual inline links
- **Metric**: CTR to luatsutuvan.net > 15%

### CTA Design Specifications

#### End-of-Guide CTA Block
```
Background: Pale teal (#EFF8F7) with left border in calm teal (#0A8F85)
Icon: Checkmark-in-circle (trust symbol)
Headline: "Ban da san sang cho buoi tu van"
Subtext: "Dat lich tu van voi luat su chuyen nghiep -- phan hoi trong 30 phut"
Button: "Dat Lich Tu Van Ngay" (teal background, white text, rounded)
Link: luatsutuvan.net/dat-lich-tu-van?ref=luatsutuvan-org&guide=[slug]
```

#### Floating CTA Button
```
Position: Bottom-right (desktop), bottom-right corner (mobile, smaller than luatsutuvan.net)
Appearance: Teal pill button with calendar icon
Text: "Dat Lich Tu Van"
Animation: Gentle fade-in (no pulse -- this site is calm)
Trigger: Appears after 40% page scroll
Link: luatsutuvan.net/dat-lich-tu-van?ref=luatsutuvan-org-float
```

#### Trust Sidebar CTA (Desktop Only)
```
Position: Sticky right sidebar on guide pages
Content:
  - Lawyer mini-profile (photo, name, credentials)
  - "Phan hoi trong 30 phut" badge
  - "Tu van mien phi lan dau" badge
  - Mini form: Name + Phone + [Gui]
  - Or: "Dat lich tai luatsutuvan.net" link
```

#### Inline Contextual CTA
```
Format: Subtle highlighted box within guide content
Style: Pale teal background, teal left border
Text: "Da hieu quy trinh? Dat lich tu van voi luat su ngay."
Link: luatsutuvan.net?ref=luatsutuvan-org-inline&guide=[slug]
```

### UTM Parameters

All outbound links to luatsutuvan.net include:
- `utm_source=luatsutuvan-org`
- `utm_medium=referral`
- `utm_campaign=trust-funnel`
- `utm_content=[guide-slug]`

### Conversion Tracking

- Google Analytics 4 events for all CTA clicks
- Custom events: `guide_read_complete`, `checklist_viewed`, `faq_expanded`, `cta_click_primary`, `cta_click_float`, `cta_click_sidebar`
- Scroll depth tracking at 25%, 50%, 75%, 100%
- Checklist interaction tracking (items checked off)
- Session recordings via Clarity for first 3 months

---

## Appendix A: Trust Elements Inventory

### Credential Displays

| Element | Content | Placement |
|---------|---------|-----------|
| Bar Association Badge | "Thanh vien Doan Luat Su TP.HCM" | Sidebar, About, Footer |
| Years of Experience | "15+ nam kinh nghiem" | Sidebar, Hero badges |
| Cases Handled | "1,000+ vu viec da xu ly" | Homepage, About |
| Client Satisfaction | "98% khach hang hai long" | Homepage, Sidebar |
| Response Time | "Phan hoi trong 30 phut" | Every CTA block |
| Free First Consultation | "Tu van mien phi lan dau" | Every CTA block |
| Confidentiality | "Bao mat thong tin tuyet doi" | FAQ, Footer |

### Social Proof Elements

- Client testimonial quotes (anonymized) on homepage and practice area pages
- "So vu viec da tu van" counter on homepage
- Google Reviews widget (if available)
- Professional association logos in footer

---

## Appendix B: Content Calendar (First 3 Months)

### Month 1 (35 Pages)
- Week 1: Homepage + 5 hub pages + 2 utility pages (8 pages)
- Week 2: 7 "Khi nao" articles (high-priority practice areas)
- Week 3: 7 "Chuan bi" checklists (matching Week 2 practice areas)
- Week 4: 7 FAQ pages + 6 "Landing linh vuc" pages

### Month 2 (35 Pages)
- Week 1: 8 "Khi nao" articles (remaining practice areas + general)
- Week 2: 8 "Chuan bi" guides (remaining + general preparation)
- Week 3: 8 FAQ pages (cost, process, rights focused)
- Week 4: 5 "Hinh thuc tu van" guides + 6 "Landing linh vuc" pages

### Month 3 (30 Pages)
- Week 1: 5 "Khi nao" articles (long-tail topics)
- Week 2: 5 "Chuan bi" guides (specialized topics)
- Week 3: 5 FAQ pages + 5 "Hinh thuc tu van" guides
- Week 4: 5 "Hinh thuc tu van" remaining + 5 remaining FAQ

### Month 4-6: Optimization
- Update guides based on Search Console data
- Add internal links to new content
- Create additional FAQ pages based on actual user questions
- Optimize underperforming pages for featured snippets
- A/B test CTA copy and placement
