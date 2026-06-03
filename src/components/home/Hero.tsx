import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Clock, Gift, BookOpen } from 'lucide-react'
import { ScrollHeading, ScrollReveal } from '@/components/motion/Reveal'
import { ctaUrl, TRUST, LAWYER } from '@/config/site'
import { asset, assetAlt } from '@/lib/assets'

export function Hero() {
  const heroImg = asset('home-hero')
  const stroke = asset('accent-gold-stroke')
  return (
    <section className="bg-aurora relative overflow-hidden">
      <div className="bg-guide-grid absolute inset-0 opacity-50" aria-hidden />
      {/* atmospheric gold-stroke accent, top-right */}
      {stroke && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 hidden h-[34rem] w-[34rem] opacity-[0.06] mix-blend-multiply lg:block"
          style={{
            backgroundImage: `url(${stroke})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-pill border border-gold/40 bg-white/70 px-4 py-1.5 text-sm font-medium text-navy-700 backdrop-blur">
                <BookOpen className="size-4 text-gold-600" />
                Cẩm nang tư vấn pháp luật · Apolo Lawyers
              </span>
            </ScrollReveal>

            <ScrollHeading className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
              Hiểu rõ mọi điều{' '}
              <span className="relative whitespace-nowrap text-navy">
                trước khi gặp luật sư
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C60 4 140 3 298 7"
                    stroke="#c2a14d"
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
                  className="group inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:bg-navy-600 hover:shadow-lift"
                >
                  Bắt đầu tìm hiểu
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={ctaUrl({ placement: 'hero' })}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-pill border border-navy/20 bg-white px-6 py-3.5 font-semibold text-ink-soft transition-colors hover:border-gold/50 hover:text-navy-700"
                >
                  Đặt lịch tư vấn
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-gold-600" /> {TRUST.barAssociation}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gift className="size-4 text-gold-600" /> {TRUST.freeConsult}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-gold-600" /> Phản hồi {TRUST.responseTime}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: architectural image, gold-hairline frame, quote scrim + floating chip */}
          <ScrollReveal delay={0.12} className="relative">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-gold/30">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/5] lg:aspect-[4/5]">
                  {heroImg ? (
                    <Image
                      src={heroImg}
                      alt={assetAlt('home-hero', 'Đại sảnh pháp đình với cán cân công lý')}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy-deep" />
                  )}
                  {/* navy scrim for quote legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-700/90 via-navy/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="font-display text-lg leading-snug text-white">
                      “Một buổi tư vấn được chuẩn bị tốt tiết kiệm cho bạn rất
                      nhiều thời gian và chi phí về sau.”
                    </p>
                    <p className="mt-2 text-sm font-medium text-gold-soft">
                      — {LAWYER.name}, {LAWYER.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* floating credential chip (overlap) */}
              <div className="absolute -left-4 -top-4 hidden items-center gap-2 rounded-2xl border border-gold/30 bg-white/95 px-4 py-2.5 shadow-lift backdrop-blur sm:flex">
                <ShieldCheck className="size-5 text-gold-600" />
                <div className="leading-tight">
                  <p className="text-xs text-muted">Thành viên</p>
                  <p className="text-sm font-semibold text-navy-700">
                    {TRUST.barAssociation}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <div className="rule-gold" aria-hidden />
    </section>
  )
}
