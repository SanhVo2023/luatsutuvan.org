import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Icon } from './icons'
import { HoverZoom } from '@/components/motion/Reveal'
import { PILLAR_MAP } from '@/config/pillars'
import type { Guide } from '@/lib/guides'

const ACCENT: Record<string, string> = {
  navy: 'from-navy-50 text-navy-700 ring-navy/15',
  gold: 'from-gold-soft text-gold-600 ring-gold/25',
  steel: 'from-navy-50 text-navy-400 ring-navy-400/20',
}

export function GuideCard({ guide }: { guide: Guide }) {
  const pillar = PILLAR_MAP[guide.pillar]
  const accent = ACCENT[pillar?.accent ?? 'navy']
  const href = `/${pillar.slug}/${guide.slug}/`
  return (
    <HoverZoom className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all hover:border-navy/30 hover:shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span
            className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br to-white ring-1 ${accent}`}
          >
            <Icon name={guide.icon ?? pillar.icon} className="size-6" />
          </span>
          <span className="rounded-pill bg-surface px-2.5 py-1 text-xs font-medium text-muted">
            {pillar.shortTitle}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-[1.18rem] font-semibold leading-snug text-ink transition-colors group-hover:text-navy-700">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
          {guide.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock className="size-3.5" />
            {guide.readingTime} phút đọc
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-navy-700">
            Xem hướng dẫn
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </HoverZoom>
  )
}
