import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/icons'
import { StaggerReveal, StaggerItem, HoverZoom } from '@/components/motion/Reveal'
import { PILLARS } from '@/config/pillars'
import { getGuidesByPillar } from '@/lib/guides'

const ACCENT: Record<string, { ring: string; chip: string; icon: string }> = {
  teal: { ring: 'hover:border-teal/35', chip: 'bg-teal-50 text-teal-700', icon: 'from-teal to-teal-700' },
  sky: { ring: 'hover:border-sky/40', chip: 'bg-sky-50 text-sky', icon: 'from-sky to-[#3a86bd]' },
  gold: { ring: 'hover:border-gold/40', chip: 'bg-gold-soft text-gold', icon: 'from-gold to-[#a87d20]' },
  success: { ring: 'hover:border-success/40', chip: 'bg-[#eef9f0] text-success', icon: 'from-success to-[#2a8943]' },
}

export function PillarGrid() {
  return (
    <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PILLARS.map((p) => {
        const count = getGuidesByPillar(p.id).length
        const a = ACCENT[p.accent]
        return (
          <StaggerItem key={p.id} className="h-full">
            <HoverZoom className="h-full">
              <Link
                href={`/${p.slug}/`}
                className={`group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all hover:shadow-lift ${a.ring}`}
              >
                <span
                  className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${a.icon} text-white shadow-soft`}
                >
                  <Icon name={p.icon} className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 leading-relaxed text-muted">
                  {p.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${a.chip}`}>
                    {count} hướng dẫn
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                    Khám phá
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </HoverZoom>
          </StaggerItem>
        )
      })}
    </StaggerReveal>
  )
}
