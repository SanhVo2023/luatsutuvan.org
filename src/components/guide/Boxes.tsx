/**
 * Static guide callouts: info / tip / warning boxes and a definition box
 * (featured-snippet friendly). Server components.
 */

import { Info, Lightbulb, AlertTriangle, BookMarked } from 'lucide-react'
import type { ReactNode } from 'react'

const VARIANTS = {
  info: {
    icon: Info,
    ring: 'border-info/25',
    bg: 'bg-navy-50',
    iconBg: 'bg-info/12 text-info',
    label: 'Thông tin',
  },
  tip: {
    icon: Lightbulb,
    ring: 'border-navy/25',
    bg: 'bg-navy-50',
    iconBg: 'bg-navy/12 text-navy-700',
    label: 'Mẹo từ luật sư',
  },
  warning: {
    icon: AlertTriangle,
    ring: 'border-gold/30',
    bg: 'bg-gold-soft/60',
    iconBg: 'bg-gold/15 text-gold',
    label: 'Lưu ý quan trọng',
  },
} as const

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: keyof typeof VARIANTS
  title?: string
  children: ReactNode
}) {
  const v = VARIANTS[variant]
  const Icon = v.icon
  return (
    <div className={`not-prose my-7 flex gap-4 rounded-2xl border ${v.ring} ${v.bg} p-5`}>
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${v.iconBg}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {title ?? v.label}
        </p>
        <div className="text-ink-soft leading-relaxed [&>p]:mt-2 [&>p:first-child]:mt-0">
          {children}
        </div>
      </div>
    </div>
  )
}

/** Definition box — the answer Google likes to lift into a featured snippet. */
export function DefinitionBox({
  term,
  children,
}: {
  term: string
  children: ReactNode
}) {
  return (
    <div className="not-prose my-7 overflow-hidden rounded-2xl border border-navy/20 bg-white shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-navy/15 bg-navy-50 px-5 py-3">
        <BookMarked className="size-4 text-navy-700" />
        <span className="font-heading font-semibold text-navy-700">{term}</span>
      </div>
      <div className="px-5 py-4 text-[1.05rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  )
}
