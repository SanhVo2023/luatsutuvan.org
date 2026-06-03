/**
 * schema.org JSON-LD builders. Returns plain objects passed to <JsonLd>.
 */

import { SITE, LAWYER, TRUST } from '@/config/site'
import { APOLO } from '@/config/apolo'
import type { Guide } from './guides'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: APOLO.vi.shortName,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image`,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: 'VN',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '108 Trần Đình Xu',
      addressLocality: 'Phường Cầu Ông Lãnh, TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    founder: {
      '@type': 'Person',
      name: LAWYER.name,
      jobTitle: LAWYER.title,
    },
    // No aggregateRating: ratings/review counts are emitted only when backed by
    // genuine, verifiable on-site reviews (Google policy + legal-advertising rule).
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'vi-VN',
    description: SITE.tagline,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE.url}${it.url}`,
    })),
  }
}

export function articleSchema(guide: Guide, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    inLanguage: 'vi-VN',
    datePublished: guide.updated ?? '2026-05-01',
    dateModified: guide.updated ?? '2026-05-01',
    wordCount: guide.wordCount,
    author: { '@type': 'Organization', name: 'Apolo Editorial Team' },
    publisher: {
      '@type': 'Organization',
      name: APOLO.vi.shortName,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(guide.heroImage ? { image: guide.heroImage } : {}),
  }
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function howToSchema(guide: Guide, url: string) {
  const steps = guide.steps ?? []
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.excerpt,
    inLanguage: 'vi-VN',
    totalTime: 'PT30M',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${url}#buoc-${i + 1}`,
    })),
  }
}

export { TRUST }
