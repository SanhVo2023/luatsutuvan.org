/**
 * <TrustSidebar> — sticky right sidebar on guide pages (PRD §10, Appendix A).
 * Lawyer mini-profile, response-time + free-consult badges, mini-CTA to
 * luatsutuvan.net. Calm, credential-forward; NOT a lead form on this site.
 */

import { ShieldCheck, Clock, Gift, Lock, ArrowUpRight } from 'lucide-react'
import { ctaUrl, LAWYER, TRUST, SITE } from '@/config/site'

export function TrustSidebar({ guideSlug }: { guideSlug?: string }) {
  return (
    <div className="space-y-5">
      {/* Lawyer mini-profile */}
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3.5">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy-700 font-heading text-xl font-bold text-white">
            VH
          </span>
          <div className="min-w-0">
            <p className="font-heading font-semibold leading-tight text-ink">
              {LAWYER.name}
            </p>
            <p className="text-sm text-muted">{LAWYER.title}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5 text-sm">
          <li className="flex items-center gap-2.5 text-ink-soft">
            <ShieldCheck className="size-4 shrink-0 text-navy" />
            Thành viên {TRUST.barAssociation}
          </li>
          <li className="flex items-center gap-2.5 text-ink-soft">
            <Gift className="size-4 shrink-0 text-navy" />
            {TRUST.freeConsult}
          </li>
          <li className="flex items-center gap-2.5 text-ink-soft">
            <Lock className="size-4 shrink-0 text-navy" />
            {TRUST.confidentiality}
          </li>
        </ul>
      </div>

      {/* Mini CTA */}
      <div className="rounded-3xl border border-navy/20 bg-gradient-to-br from-navy-50 to-navy-50 p-5">
        <p className="font-heading font-semibold text-ink">
          Sẵn sàng trao đổi với luật sư?
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <span className="flex items-center gap-2 text-navy-700">
            <Clock className="size-4" /> Phản hồi trong {TRUST.responseTime}
          </span>
          <span className="flex items-center gap-2 text-navy-700">
            <Gift className="size-4" /> Tư vấn miễn phí lần đầu
          </span>
        </div>
        <a
          href={ctaUrl({ content: guideSlug, placement: 'sidebar' })}
          target="_blank"
          rel="noopener"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-pill bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
        >
          Đặt lịch tại luatsutuvan.net
          <ArrowUpRight className="size-4" />
        </a>
        <p className="mt-3 text-center text-xs text-muted">
          Hoặc gọi{' '}
          <a href={SITE.phoneHref} className="font-medium text-navy-700">
            {SITE.phone}
          </a>
        </p>
      </div>
    </div>
  )
}
