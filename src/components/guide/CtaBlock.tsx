/**
 * End-of-guide CTA block (PRD §10). Reassuring, calm tone. Links to
 * luatsutuvan.net with full UTM tagging. NOT a lead form.
 */

import { CheckCircle2, ArrowRight, Clock, Gift } from 'lucide-react'
import { ctaUrl } from '@/config/site'

export function CtaBlock({
  guideSlug,
  headline = 'Bạn đã sẵn sàng cho buổi tư vấn',
  subtext = 'Đặt lịch tư vấn với luật sư chuyên nghiệp tại Apolo Lawyers — phản hồi trong vòng 30 phút làm việc.',
}: {
  guideSlug?: string
  headline?: string
  subtext?: string
}) {
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-3xl border border-teal/20 bg-gradient-to-br from-teal-50 to-sky-50 shadow-soft">
      <div className="border-l-4 border-teal p-7 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal text-white shadow-glow">
            <CheckCircle2 className="size-6" />
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-xl font-bold text-ink sm:text-2xl">
              {headline}
            </h3>
            <p className="mt-2 max-w-xl text-ink-soft leading-relaxed">
              {subtext}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 text-teal-700">
                <Clock className="size-4" /> Phản hồi trong 30 phút
              </span>
              <span className="inline-flex items-center gap-1.5 text-teal-700">
                <Gift className="size-4" /> Tư vấn miễn phí lần đầu
              </span>
            </div>

            <a
              href={ctaUrl({
                content: guideSlug,
                placement: 'guide-cta',
              })}
              target="_blank"
              rel="noopener"
              className="group mt-6 inline-flex items-center gap-2 rounded-pill bg-teal px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:bg-teal-600 hover:shadow-lift"
            >
              Đặt lịch tư vấn ngay
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

/** Subtle inline CTA used mid-content. */
export function InlineCta({ guideSlug }: { guideSlug?: string }) {
  return (
    <div className="not-prose my-7 rounded-2xl border-l-4 border-teal bg-teal-50 px-5 py-4">
      <p className="text-ink-soft">
        Đã hiểu quy trình?{' '}
        <a
          href={ctaUrl({ content: guideSlug, placement: 'inline' })}
          target="_blank"
          rel="noopener"
          className="font-semibold text-teal-700 underline decoration-teal/40 underline-offset-2 hover:decoration-teal"
        >
          Đặt lịch tư vấn với luật sư
        </a>{' '}
        khi bạn đã sẵn sàng.
      </p>
    </div>
  )
}
