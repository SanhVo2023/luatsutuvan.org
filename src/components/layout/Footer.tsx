/**
 * Footer — credentials, pillar links, contact (moderate), parent-brand link.
 * VN site → links to apolo.com.vn only (Issue 13).
 */

import Link from 'next/link'
import { Scale, MapPin, Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import { PILLARS } from '@/config/pillars'
import { SITE, TRUST } from '@/config/site'
import { APOLO } from '@/config/apolo'
import { getSiteDisclaimer } from '@/lib/boilerplate'

export async function Footer() {
  const disclaimer = await getSiteDisclaimer()
  return (
    <footer className="mt-24 border-t border-line bg-surface-alt">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-navy to-navy-700 text-white">
                <Scale className="size-4.5" />
              </span>
              <span className="font-heading text-lg font-bold text-ink">
                Luật Sư Tư Vấn
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Cẩm nang giúp bạn hiểu rõ quy trình tư vấn pháp luật — khi nào cần
              luật sư, chuẩn bị hồ sơ ra sao và điều gì sẽ diễn ra. Lớp hỗ trợ
              tin cậy của{' '}
              <a
                href={APOLO.vi.parentBrandUrl}
                target="_blank"
                rel="noopener"
                className="font-medium text-navy-700"
              >
                Apolo Lawyers
              </a>
              .
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-pill border border-navy/20 bg-navy-50 px-3.5 py-1.5 text-xs font-medium text-navy-700">
              <ShieldCheck className="size-3.5" />
              {TRUST.barAssociation}
            </div>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-ink">
              Cẩm nang
            </p>
            <ul className="space-y-2.5 text-sm">
              {PILLARS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/${p.slug}/`}
                    className="text-muted transition-colors hover:text-navy-700"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-ink">
              Về chúng tôi
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ve-chung-toi/" className="text-muted hover:text-navy-700">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/lien-he/" className="text-muted hover:text-navy-700">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat/" className="text-muted hover:text-navy-700">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung/" className="text-muted hover:text-navy-700">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-ink">
              Liên hệ
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-navy" />
                <a href={SITE.phoneHref} className="hover:text-navy-700">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy" />
                <a href={`mailto:${SITE.email}`} className="hover:text-navy-700">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-navy" />
                <a href={SITE.zalo} target="_blank" rel="noopener" className="hover:text-navy-700">
                  Zalo: Apolo Lawyers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {APOLO.vi.shortName}. Bảo lưu mọi quyền.
          </p>
          <p className="max-w-xl sm:text-right">{disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
