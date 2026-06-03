import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Clock, FileText, CalendarDays, ListChecks } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GuideCard } from '@/components/ui/GuideCard'
import { Markdown } from '@/components/Markdown'
import { Toc } from '@/components/guide/Toc'
import { TrustSidebar } from '@/components/guide/TrustSidebar'
import { Checklist } from '@/components/guide/Checklist'
import { Accordion } from '@/components/guide/Accordion'
import { ProcessSteps } from '@/components/guide/ProcessSteps'
import { CtaBlock } from '@/components/guide/CtaBlock'
import { ScrollHeading, ScrollReveal } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/JsonLd'
import {
  articleSchema,
  faqSchema,
  howToSchema,
  breadcrumbSchema,
} from '@/lib/schema'
import { PILLAR_MAP } from '@/config/pillars'
import {
  getAllGuides,
  getGuide,
  getRelatedGuides,
} from '@/lib/guides'
import { SITE } from '@/config/site'

export function generateStaticParams() {
  return getAllGuides().map((g) => ({
    pillar: PILLAR_MAP[g.pillar].slug,
    slug: g.slug,
  }))
}

type Params = { params: Promise<{ pillar: string; slug: string }> }

function resolve(pillarSlug: string, slug: string) {
  const pillar = Object.values(PILLAR_MAP).find((p) => p.slug === pillarSlug)
  if (!pillar) return null
  const guide = getGuide(pillar.id, slug)
  if (!guide) return null
  return { pillar, guide }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { pillar: pillarSlug, slug } = await params
  const r = resolve(pillarSlug, slug)
  if (!r) return {}
  const { guide } = r
  const title = guide.metaTitle ?? `${guide.title} — Hướng dẫn chi tiết 2026`
  const description = guide.metaDescription ?? guide.excerpt
  const url = `${SITE.url}/${pillarSlug}/${slug}/`
  return {
    title,
    description,
    alternates: { canonical: `/${pillarSlug}/${slug}/` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      ...(guide.heroImage ? { images: [{ url: guide.heroImage }] } : {}),
    },
  }
}

export default async function GuidePage({ params }: Params) {
  const { pillar: pillarSlug, slug } = await params
  const r = resolve(pillarSlug, slug)
  if (!r) notFound()
  const { pillar, guide } = r

  const url = `${SITE.url}/${pillarSlug}/${slug}/`
  const related = getRelatedGuides(guide)

  const schemas: object[] = [
    breadcrumbSchema([
      { name: 'Trang chủ', url: '/' },
      { name: pillar.title, url: `/${pillar.slug}/` },
      { name: guide.title, url: `/${pillar.slug}/${slug}/` },
    ]),
  ]
  if (guide.schema === 'HowTo' && guide.steps?.length) {
    schemas.push(howToSchema(guide, url))
  } else {
    schemas.push(articleSchema(guide, url))
  }
  if (guide.faq?.length) schemas.push(faqSchema(guide.faq))

  return (
    <>
      <JsonLd data={schemas} />

      {/* Header */}
      <section className="bg-aurora relative overflow-hidden border-b border-line">
        <div className="bg-guide-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pb-12 pt-9 lg:px-8">
          <Breadcrumbs
            items={[
              { name: pillar.shortTitle, href: `/${pillar.slug}/` },
              { name: guide.title },
            ]}
          />
          <span className="inline-flex items-center gap-2 rounded-pill bg-teal-50 px-3.5 py-1.5 text-sm font-medium text-teal-700">
            <FileText className="size-4" />
            {pillar.title}
          </span>
          <ScrollHeading className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl">
            {guide.title}
          </ScrollHeading>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {guide.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-teal" />
              {guide.readingTime} phút đọc
            </span>
            {guide.updated && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4 text-teal" />
                Cập nhật {guide.updated}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <ListChecks className="size-4 text-teal" />
              {guide.wordCount.toLocaleString('vi-VN')} từ
            </span>
            <span className="text-muted">Bởi Apolo Editorial Team</span>
          </div>

          {guide.heroImage && (
            <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-3xl border border-line shadow-soft">
              <Image
                src={guide.heroImage}
                alt={guide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Body grid: TOC | content | sidebar */}
      <div className="mx-auto max-w-7xl gap-10 px-5 py-14 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)_18rem] lg:px-8">
        {/* TOC */}
        {guide.toc && guide.headings.length >= 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Toc headings={guide.headings} />
            </div>
          </aside>
        )}

        {/* Content */}
        <article className="min-w-0">
          <Markdown>{guide.body}</Markdown>

          {guide.steps && guide.steps.length > 0 && (
            <ProcessSteps steps={guide.steps} />
          )}

          {guide.checklist && guide.checklist.length > 0 && (
            <Checklist items={guide.checklist} storageKey={guide.slug} />
          )}

          {guide.faq && guide.faq.length > 0 && (
            <div className="not-prose mt-12">
              <h2 className="mb-6 font-heading text-2xl font-bold text-ink">
                Câu hỏi thường gặp
              </h2>
              <Accordion items={guide.faq} />
            </div>
          )}

          <CtaBlock guideSlug={guide.slug} />

          <p className="not-prose mt-8 border-t border-line pt-5 text-sm leading-relaxed text-muted">
            Nội dung bài viết mang tính tham khảo chung, không thay thế cho tư vấn
            pháp lý đối với từng trường hợp cụ thể; quy định pháp luật có thể thay
            đổi theo thời gian. Để được tư vấn chính xác, vui lòng liên hệ trực
            tiếp với luật sư.
          </p>
        </article>

        {/* Trust sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TrustSidebar guideSlug={guide.slug} />
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface-alt">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-ink">
                Hướng dẫn liên quan
              </h2>
              <p className="mt-2 text-muted">
                Tiếp tục chuẩn bị với những hướng dẫn được chọn lọc cho tình
                huống của bạn.
              </p>
            </ScrollReveal>
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
