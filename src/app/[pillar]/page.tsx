import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GuideCard } from '@/components/ui/GuideCard'
import { Icon } from '@/components/ui/icons'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { PILLARS, pillarByRoute } from '@/config/pillars'
import { getGuidesByPillar } from '@/lib/guides'
import { ctaUrl, SITE } from '@/config/site'
import { asset, assetAlt } from '@/lib/assets'

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }))
}

type Params = { params: Promise<{ pillar: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { pillar: slug } = await params
  const pillar = pillarByRoute(slug)
  if (!pillar) return {}
  const title = `${pillar.title} — Hướng dẫn chi tiết 2026`
  return {
    title,
    description: pillar.description,
    alternates: { canonical: `/${pillar.slug}/` },
    openGraph: { title, description: pillar.description, url: `${SITE.url}/${pillar.slug}/` },
  }
}

export default async function PillarPage({ params }: Params) {
  const { pillar: slug } = await params
  const pillar = pillarByRoute(slug)
  if (!pillar) notFound()

  const guides = getGuidesByPillar(pillar.id)
  const heroImg = pillar.heroImageId ? asset(pillar.heroImageId) : undefined

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', url: '/' },
          { name: pillar.title, url: `/${pillar.slug}/` },
        ])}
      />

      {/* Hub hero */}
      <section className="bg-aurora relative overflow-hidden border-b border-line">
        <div className="bg-guide-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 lg:px-8 lg:pb-16">
          <Breadcrumbs items={[{ name: pillar.title }]} />
          <div className="mt-2 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <ScrollReveal>
              <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy-700 text-white shadow-soft ring-1 ring-gold/30">
                <Icon name={pillar.icon} className="size-8 text-gold-soft" />
              </span>
              <h1 className="mt-6 font-display text-[2.4rem] font-bold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl">
                {pillar.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                {pillar.intro}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-pill border border-gold/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-navy-700 backdrop-blur">
                {guides.length} hướng dẫn trong chủ đề này
              </p>
            </ScrollReveal>

            {heroImg && (
              <ScrollReveal delay={0.12}>
                <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-gold/30">
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={heroImg}
                      alt={assetAlt(pillar.heroImageId!, pillar.title)}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-700/40 to-transparent" />
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Guide grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {guides.length > 0 ? (
          <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <StaggerItem key={g.slug} className="h-full">
                <GuideCard guide={g} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        ) : (
          <p className="rounded-2xl border border-line bg-surface px-6 py-10 text-center text-muted">
            Các hướng dẫn cho chủ đề này đang được biên soạn.
          </p>
        )}

        {/* Other pillars */}
        <SectionHeading
          eyebrow="Chủ đề khác"
          title="Tiếp tục khám phá cẩm nang"
          align="center"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PILLARS.filter((p) => p.id !== pillar.id).map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}/`}
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-navy/30 hover:text-navy-700"
            >
              <Icon name={p.icon} className="size-4 text-navy" />
              {p.shortTitle}
            </Link>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-navy/20 bg-navy-50 px-8 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-heading text-xl font-semibold text-ink">
                Cần trao đổi trực tiếp với luật sư?
              </h3>
              <p className="mt-1.5 text-ink-soft">
                Đặt lịch tư vấn — tư vấn miễn phí lần đầu, phản hồi trong 30 phút.
              </p>
            </div>
            <a
              href={ctaUrl({ placement: `hub-${pillar.id}` })}
              target="_blank"
              rel="noopener"
              className="group inline-flex shrink-0 items-center gap-2 rounded-pill bg-navy px-6 py-3.5 font-semibold text-white transition-colors hover:bg-navy-600"
            >
              Đặt lịch tư vấn
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
