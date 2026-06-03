import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'
import { PILLARS, PILLAR_MAP } from '@/config/pillars'
import { getAllGuides } from '@/lib/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ve-chung-toi/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/lien-he/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/chinh-sach-bao-mat/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/dieu-khoan-su-dung/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const pillarPages: MetadataRoute.Sitemap = PILLARS.map((p) => ({
    url: `${base}/${p.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: `${base}/${PILLAR_MAP[g.pillar].slug}/${g.slug}/`,
    lastModified: g.updated ? new Date(g.updated) : now,
    changeFrequency: 'monthly',
    priority: g.featured ? 0.75 : 0.65,
  }))

  return [...staticPages, ...pillarPages, ...guidePages]
}
