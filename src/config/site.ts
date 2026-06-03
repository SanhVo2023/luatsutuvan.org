/**
 * Site-level constants for luatsutuvan.org.
 * Trust/authority guide layer in front of the conversion site luatsutuvan.net.
 */

import { APOLO } from './apolo'

export const SITE = {
  domain: 'luatsutuvan.org',
  name: 'Luật Sư Tư Vấn',
  tagline: 'Cẩm nang tư vấn pháp luật — hiểu rõ trước khi gặp luật sư',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luatsutuvan.org',
  locale: 'vi' as const,
  // Conversion target — every primary CTA routes here (PRD §10).
  intakeUrl: 'https://luatsutuvan.net',
  intakeBookUrl: 'https://luatsutuvan.net/dat-lich-tu-van',
  parentBrandUrl: APOLO.vi.parentBrandUrl,
  partnerProfileUrl: 'https://vothienhien.com',
  phone: APOLO.vi.callCenter,
  phoneHref: 'tel:0903419479',
  email: APOLO.vi.email,
  zalo: 'https://zalo.me/apololawyers',
  address: APOLO.vi.address,
  branchAddress:
    '9th/F, Tower K&M Building, 33 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP. Hồ Chí Minh',
}

/** Build a luatsutuvan.net CTA link with full UTM tagging (PRD §10). */
export function ctaUrl(opts?: {
  path?: string
  content?: string
  placement?: string
}): string {
  const base = opts?.path
    ? `${SITE.intakeUrl}${opts.path}`
    : SITE.intakeBookUrl
  const params = new URLSearchParams({
    ref: opts?.placement
      ? `luatsutuvan-org-${opts.placement}`
      : 'luatsutuvan-org',
    utm_source: 'luatsutuvan-org',
    utm_medium: 'referral',
    utm_campaign: 'trust-funnel',
  })
  if (opts?.content) params.set('utm_content', opts.content)
  return `${base}?${params.toString()}`
}

/**
 * Defensible trust signals displayed across the site.
 * No unverifiable numeric claims (no star ratings, client counts, or
 * years-of-experience headline stats) — those are a Google policy violation
 * and a legal-advertising risk. Only operational commitments + verifiable
 * credentials + statutory duties.
 */
export const TRUST = {
  responseTime: '30 phút', // operational commitment, not a guarantee
  barAssociation: 'Đoàn Luật sư TP. Hồ Chí Minh',
  freeConsult: 'Tư vấn miễn phí lần đầu',
  confidentiality: 'Bảo mật theo Luật Luật sư',
  practiceAreas: '5 lĩnh vực tư vấn', // ly hôn · đất đai · lao động · hình sự · doanh nghiệp
}

export const LAWYER = {
  name: 'Luật sư Võ Thiện Hiển',
  shortName: 'LS. Võ Thiện Hiển',
  title: 'Luật sư Điều hành (Managing Partner)',
  english: 'Henry Vo',
  bio: 'Hành nghề trong các lĩnh vực dân sự, đất đai, doanh nghiệp và hôn nhân — gia đình. Thành viên Đoàn Luật sư TP. Hồ Chí Minh.',
}
