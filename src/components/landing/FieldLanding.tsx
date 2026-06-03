import Image from 'next/image'
import { ArrowRight, Phone, ShieldCheck, Gift, Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GuideCard } from '@/components/ui/GuideCard'
import { Markdown } from '@/components/Markdown'
import { Accordion } from '@/components/guide/Accordion'
import { ProcessSteps } from '@/components/guide/ProcessSteps'
import { TrustSidebar } from '@/components/guide/TrustSidebar'
import { AuthorityBand } from '@/components/home/AuthorityBand'
import { ScrollReveal, ScrollHeading } from '@/components/motion/Reveal'
import { asset, assetAlt } from '@/lib/assets'
import { ctaUrl, SITE, TRUST } from '@/config/site'
import type { Guide } from '@/lib/guides'
import type { Pillar } from '@/config/pillars'

/** Maps a field-landing guide slug → its generated field hero image id. */
const FIELD_IMG: Record<string, string> = {
  'tu-van-luat-ly-hon': 'field-ly-hon',
  'tu-van-luat-doanh-nghiep': 'field-doanh-nghiep',
  'tu-van-luat-hinh-su': 'field-hinh-su',
  'tu-van-luat-lao-dong': 'field-lao-dong',
  'tu-van-luat-dat-dai': 'field-dat-dai',
}

export function FieldLanding({
  guide,
  pillar,
  byline,
  disclaimer,
  related,
}: {
  guide: Guide
  pillar: Pillar
  byline: string
  disclaimer: string
  related: Guide[]
}) {
  const imgId = FIELD_IMG[guide.slug]
  const heroImg = (imgId && asset(imgId)) || guide.heroImage

  return (
    <>
      {/* Field hero — navy band, image + conversion copy */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="bg-guide-grid absolute inset-0 opacity-10" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-9 lg:px-8 lg:pb-20">
          <div className="[&_*]:!text-white/70">
            <Breadcrumbs
              items={[
                { name: pillar.shortTitle, href: `/${pillar.slug}/` },
                { name: guide.title },
              ]}
            />
          </div>
          <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 rounded-pill border border-gold/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-soft backdrop-blur">
                  Tư vấn theo lĩnh vực
                </span>
              </ScrollReveal>
              <ScrollHeading className="mt-5 font-display text-[2.4rem] font-bold leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl">
                {guide.title}
              </ScrollHeading>
              <ScrollReveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                  {guide.excerpt}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href={ctaUrl({ content: guide.slug, placement: 'field-hero' })}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 rounded-pill bg-gold px-6 py-3.5 font-semibold text-navy-700 shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    Đặt lịch tư vấn
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-2 rounded-pill border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="size-4" /> {SITE.phone}
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-gold" /> {TRUST.barAssociation}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gift className="size-4 text-gold" /> {TRUST.freeConsult}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-gold" /> Phản hồi {TRUST.responseTime}
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {heroImg && (
              <ScrollReveal delay={0.12}>
                <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-gold/40">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={heroImg}
                      alt={imgId ? assetAlt(imgId, guide.title) : guide.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Body: content + sticky consult sidebar */}
      <div className="mx-auto max-w-7xl gap-10 px-5 py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <article className="min-w-0">
          <Markdown>{guide.body}</Markdown>

          {guide.steps && guide.steps.length > 0 && (
            <ProcessSteps steps={guide.steps} />
          )}

          {guide.faq && guide.faq.length > 0 && (
            <div className="not-prose mt-12">
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">
                Câu hỏi thường gặp
              </h2>
              <Accordion items={guide.faq} />
            </div>
          )}

          <p className="not-prose mt-10 border-t border-line pt-5 text-sm leading-relaxed text-muted">
            Bởi {byline}. {disclaimer}
          </p>
        </article>

        <aside className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <TrustSidebar guideSlug={guide.slug} />
          </div>
        </aside>
      </div>

      {/* Authority band (defensible signals) */}
      <AuthorityBand />

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface-alt">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              Hướng dẫn liên quan
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
