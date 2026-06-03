import Link from 'next/link'
import { ArrowRight, ShieldCheck, Clock, Gift, BookOpen } from 'lucide-react'
import { ScrollHeading, ScrollReveal } from '@/components/motion/Reveal'
import { ctaUrl, TRUST } from '@/config/site'

export function Hero() {
  return (
    <section className="bg-aurora relative overflow-hidden">
      <div className="bg-guide-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-pill border border-teal/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-teal-700 backdrop-blur">
                <BookOpen className="size-4" />
                Cẩm nang tư vấn pháp luật · Apolo Lawyers
              </span>
            </ScrollReveal>

            <ScrollHeading className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Hiểu rõ mọi điều{' '}
              <span className="relative whitespace-nowrap text-teal">
                trước khi gặp luật sư
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C60 4 140 3 298 7"
                    stroke="#c5972c"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </ScrollHeading>

            <ScrollReveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                Khi nào thực sự cần luật sư? Cần chuẩn bị giấy tờ gì? Chi phí ra
                sao? Đây là cẩm nang bình tĩnh, đầy đủ giúp bạn bước vào buổi tư
                vấn một cách tự tin — không vội vàng, không áp lực.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/khi-nao-nen-gap-luat-su/"
                  className="group inline-flex items-center gap-2 rounded-pill bg-teal px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:bg-teal-600 hover:shadow-lift"
                >
                  Bắt đầu tìm hiểu
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={ctaUrl({ placement: 'hero' })}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-6 py-3.5 font-semibold text-ink-soft transition-colors hover:border-teal/30 hover:text-teal-700"
                >
                  Đặt lịch tư vấn
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-teal" /> {TRUST.barAssociation}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gift className="size-4 text-teal" /> {TRUST.freeConsult}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-teal" /> Phản hồi {TRUST.responseTime}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: trust panel card */}
          <ScrollReveal delay={0.12} className="relative">
            <div className="relative rounded-[2rem] border border-line bg-white/80 p-7 shadow-lift backdrop-blur-sm">
              <div
                aria-hidden
                className="absolute -right-3 -top-3 size-24 rounded-full bg-gradient-to-br from-sky/30 to-teal/20 blur-2xl"
              />
              <p className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
                Apolo Lawyers · Đồng hành cùng bạn
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { v: 'Miễn phí', l: 'Tư vấn lần đầu' },
                  { v: TRUST.responseTime, l: 'Thời gian phản hồi' },
                  { v: '5', l: 'Lĩnh vực tư vấn' },
                  { v: 'TP.HCM', l: 'Đoàn Luật sư' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-line bg-bg px-4 py-4"
                  >
                    <p className="font-heading text-2xl font-extrabold text-teal">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-teal-50 px-4 py-3.5">
                <p className="text-sm leading-relaxed text-teal-700">
                  “Một buổi tư vấn được chuẩn bị tốt tiết kiệm cho bạn rất nhiều
                  thời gian và chi phí về sau.”
                </p>
                <p className="mt-2 text-xs font-medium text-muted">
                  — Luật sư Võ Thiện Hiển, Luật sư Điều hành
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
