import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Lock, Clock, Gift, Compass, ClipboardCheck, MessagesSquare, CheckCircle2 } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { AdviceGap } from '@/components/home/AdviceGap'
import { FieldsShowcase } from '@/components/home/FieldsShowcase'
import { AuthorityBand } from '@/components/home/AuthorityBand'
import { PillarGrid } from '@/components/home/PillarGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GuideCard } from '@/components/ui/GuideCard'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { PILLARS } from '@/config/pillars'
import { getFeaturedByPillar } from '@/lib/guides'
import { ctaUrl, TRUST } from '@/config/site'
import { asset, assetAlt } from '@/lib/assets'

const JOURNEY = [
  { icon: Compass, title: 'Nhận diện vấn đề', text: 'Xác định bạn có thực sự cần luật sư hay không, và ở thời điểm nào.' },
  { icon: MessagesSquare, title: 'Chọn hình thức tư vấn', text: 'Trực tiếp, online hay qua điện thoại — chọn cách phù hợp với bạn.' },
  { icon: ClipboardCheck, title: 'Chuẩn bị hồ sơ', text: 'Dùng checklist để mang đúng giấy tờ, mô tả vấn đề rõ ràng.' },
  { icon: CheckCircle2, title: 'Tự tin tư vấn', text: 'Bước vào buổi tư vấn với sự chuẩn bị đầy đủ và tâm thế bình tĩnh.' },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, value: TRUST.barAssociation, label: 'Thành viên đoàn luật sư' },
  { icon: Gift, value: 'Miễn phí', label: 'Tư vấn lần đầu' },
  { icon: Clock, value: TRUST.responseTime, label: 'Thời gian phản hồi' },
  { icon: Lock, value: 'Theo luật', label: 'Bảo mật thông tin' },
]

export default function HomePage() {
  const ctaBg = asset('cta-band-bg')
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Trang chủ', url: '/' }])} />
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <StaggerReveal className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_BADGES.map((b) => (
              <StaggerItem key={b.label} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <b.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold leading-tight text-ink">
                    {b.value}
                  </p>
                  <p className="text-xs text-muted">{b.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Advice gap — why a lawyer */}
      <AdviceGap />

      {/* Pillars */}
      <section className="bg-surface-alt">
        <div className="section-y mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Cẩm nang chia theo chủ đề"
            title="Bạn đang cần tìm hiểu điều gì?"
            intro="Năm nhóm hướng dẫn được sắp xếp theo đúng hành trình của bạn — từ lúc băn khoăn cho đến khi sẵn sàng gặp luật sư."
          />
          <div className="mt-12">
            <PillarGrid />
          </div>
        </div>
      </section>

      {/* Fields showcase */}
      <FieldsShowcase />

      {/* Journey */}
      <section className="section-y mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Hành trình tư vấn"
          title="Bốn bước để bước vào buổi tư vấn một cách tự tin"
          align="center"
        />
        <StaggerReveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative h-full rounded-3xl border border-line bg-white p-6 text-center shadow-soft">
                <span className="absolute right-5 top-3 font-display text-5xl font-bold text-gold/25">
                  {i + 1}
                </span>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                  <s.icon className="size-7" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* Featured per pillar */}
      <section className="bg-surface-alt">
        <div className="section-y mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Hướng dẫn nổi bật"
            title="Bắt đầu từ những bài được đọc nhiều nhất"
            intro="Mỗi nhóm chủ đề một hướng dẫn tiêu biểu — đầy đủ, có dẫn chiếu quy định pháp luật."
          />
          <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => {
              const g = getFeaturedByPillar(p.id)
              if (!g) return null
              return (
                <StaggerItem key={p.id} className="h-full">
                  <GuideCard guide={g} />
                </StaggerItem>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Authority band */}
      <AuthorityBand />

      {/* Closing CTA — marble band */}
      <section className="section-y mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white shadow-lift ring-1 ring-gold/20 sm:px-12">
            {ctaBg ? (
              <Image
                src={ctaBg}
                alt={assetAlt('cta-band-bg', '')}
                fill
                sizes="(max-width: 1024px) 100vw, 80rem"
                className="object-cover"
                aria-hidden
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/92 to-navy-700/92" aria-hidden />
            <div className="bg-guide-grid absolute inset-0 opacity-10" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-[2rem] font-bold leading-[1.12] sm:text-[2.5rem]">
                Đã hiểu quy trình? Bước tiếp theo rất đơn giản.
              </h2>
              <p className="mt-4 text-lg text-white/85">
                Khi bạn đã sẵn sàng, hãy đặt lịch tư vấn với luật sư Apolo
                Lawyers. Tư vấn miễn phí lần đầu, phản hồi trong {TRUST.responseTime}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={ctaUrl({ placement: 'home-closing' })}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2 rounded-pill bg-gold px-7 py-3.5 font-semibold text-navy-700 transition-transform hover:scale-[1.02]"
                >
                  Đặt lịch tư vấn ngay
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="/ve-chung-toi/"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Tìm hiểu về chúng tôi
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
