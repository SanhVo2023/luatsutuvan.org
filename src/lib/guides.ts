/**
 * Build-time guide loader. Guides are authored as markdown files with YAML
 * frontmatter in src/content/guides/<pillar>/<slug>.md and rendered to real
 * HTML via the <Markdown> component (NO literal markdown leaks).
 *
 * This is the entire content layer — no database, no Payload, no pg. SSG.
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { PillarId } from '@/config/pillars'

export interface ChecklistItem {
  text: string
  note?: string
  required?: boolean
}

export interface FaqItem {
  q: string
  a: string
}

export interface ProcessStep {
  title: string
  description: string
  duration?: string
}

export interface GuideFrontmatter {
  title: string
  slug: string
  pillar: PillarId
  excerpt: string
  metaTitle?: string
  metaDescription?: string
  schema?: 'Article' | 'HowTo' | 'FAQPage'
  practiceArea?: string
  icon?: string
  heroImage?: string
  updated?: string
  featured?: boolean
  toc?: boolean
  checklist?: ChecklistItem[]
  faq?: FaqItem[]
  steps?: ProcessStep[]
  related?: string[] // slugs
  ctaPath?: string
}

export interface Guide extends GuideFrontmatter {
  body: string
  readingTime: number
  wordCount: number
  toc: boolean
  headings: { id: string; text: string; level: number }[]
}

const GUIDES_DIR = path.join(process.cwd(), 'src', 'content', 'guides')

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Extract H2/H3 from markdown body for the table of contents. */
function extractHeadings(body: string) {
  const lines = body.split('\n')
  const headings: { id: string; text: string; level: number }[] = []
  let inFence = false
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (m) {
      const level = m[1].length
      const text = m[2].replace(/\*\*/g, '').replace(/\[(.+?)\]\(.+?\)/g, '$1').trim()
      headings.push({ id: slugify(text), text, level })
    }
  }
  return headings
}

function countWords(body: string, fm: GuideFrontmatter): number {
  let text = body.replace(/[#>*_`|-]/g, ' ')
  if (fm.checklist) text += ' ' + fm.checklist.map((c) => `${c.text} ${c.note ?? ''}`).join(' ')
  if (fm.faq) text += ' ' + fm.faq.map((f) => `${f.q} ${f.a}`).join(' ')
  if (fm.steps) text += ' ' + fm.steps.map((s) => `${s.title} ${s.description}`).join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

let _cache: Guide[] | null = null

export function getAllGuides(): Guide[] {
  if (_cache) return _cache
  const guides: Guide[] = []
  if (!fs.existsSync(GUIDES_DIR)) {
    _cache = []
    return _cache
  }
  const pillarDirs = fs.readdirSync(GUIDES_DIR)
  for (const dir of pillarDirs) {
    const pillarPath = path.join(GUIDES_DIR, dir)
    if (!fs.statSync(pillarPath).isDirectory()) continue
    for (const file of fs.readdirSync(pillarPath)) {
      if (!file.endsWith('.md')) continue
      const raw = fs.readFileSync(path.join(pillarPath, file), 'utf-8')
      const { data, content } = matter(raw)
      const fm = data as GuideFrontmatter
      const wordCount = countWords(content, fm)
      guides.push({
        ...fm,
        body: content,
        toc: fm.toc ?? wordCount > 900,
        wordCount,
        readingTime: Math.max(1, Math.round(wordCount / 200)),
        headings: extractHeadings(content),
      })
    }
  }
  _cache = guides
  return guides
}

export function getGuidesByPillar(pillar: PillarId): Guide[] {
  return getAllGuides()
    .filter((g) => g.pillar === pillar)
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
}

export function getGuide(pillar: PillarId, slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.pillar === pillar && g.slug === slug)
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug)
}

export function getFeaturedByPillar(pillar: PillarId): Guide | undefined {
  const list = getGuidesByPillar(pillar)
  return list.find((g) => g.featured) ?? list[0]
}

export function getRelatedGuides(guide: Guide, limit = 4): Guide[] {
  const all = getAllGuides()
  const out: Guide[] = []
  // Explicit related first.
  for (const slug of guide.related ?? []) {
    const g = all.find((x) => x.slug === slug)
    if (g && g.slug !== guide.slug) out.push(g)
  }
  // Fill with same practice area across pillars, then same pillar.
  if (out.length < limit) {
    for (const g of all) {
      if (out.length >= limit) break
      if (g.slug === guide.slug || out.includes(g)) continue
      if (guide.practiceArea && g.practiceArea === guide.practiceArea) out.push(g)
    }
  }
  if (out.length < limit) {
    for (const g of all) {
      if (out.length >= limit) break
      if (g.slug === guide.slug || out.includes(g)) continue
      if (g.pillar === guide.pillar) out.push(g)
    }
  }
  return out.slice(0, limit)
}

export { slugify }
