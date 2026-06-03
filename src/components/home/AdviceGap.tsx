import Image from 'next/image'
import { Check, Minus, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/motion/Reveal'
import { asset, assetAlt } from '@/lib/assets'
import { ctaUrl, TRUST } from '@/config/site'

const SELF = [
  'Thông tin chung chung, không gắn với tình tiết và chứng cứ của bạn.',
  'Có thể đã lỗi thời khi quy định pháp luật thay đổi.',
  'Không ai chịu trách nhiệm nghề nghiệp nếu thông tin sai.',
  'Dễ bỏ sót thời hiệu, thủ tục và rủi ro quan trọng.',
]
const LAWYER = [
  'Phân tích đúng tình huống và chứng cứ cụ thể của bạn.',
  'Áp dụng quy định pháp luật đang có hiệu lực.',
  'Chịu trách nhiệm nghề nghiệp với lời tư vấn.',
  'Cảnh báo sớm thời hạn và rủi ro để bạn chủ động.',
]

export function AdviceGap() {
  const img = asset('section-advice-gap')
  return (
    <section className="section-y mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Image */}
        <ScrollReveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-gold/25">
            <div className="relative aspect-[4/5]">
              {img ? (
                <Image
                  src={img}
                  alt={assetAlt('section-advice-gap', 'So sánh thông tin trực tuyến và luật sư')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-navy-deep" />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Vì sao cần luật sư"
            title="Thông tin trên mạng không thay thế một luật sư"
            intro="Tra cứu trực tuyến hay hỏi công cụ AI giúp bạn nắm khái niệm chung. Nhưng một vấn đề pháp lý cụ thể cần được cân nhắc trên chính tình tiết của bạn — đó là việc của luật sư."
          />

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6">
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-muted">
                  Tự tìm hiểu online / AI
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                  {SELF.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <Minus className="mt-0.5 size-4 shrink-0 text-muted" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="h-full rounded-3xl border border-gold/30 bg-gold-soft/40 p-6 shadow-soft">
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-gold-600">
                  Tư vấn cùng luật sư
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                  {LAWYER.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.18}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={ctaUrl({ placement: 'advice-gap' })}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:bg-navy-600 hover:shadow-lift"
              >
                Trao đổi với luật sư
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="text-sm text-muted">
                {TRUST.freeConsult} · bảo mật theo Luật Luật sư
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
