import type { ReactNode } from 'react'
import { ScrollReveal } from '@/components/motion/Reveal'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <ScrollReveal
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          {align === 'center' && <span className="h-px w-6 bg-teal/40" />}
          {eyebrow}
          <span className="h-px w-6 bg-teal/40" />
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
      )}
    </ScrollReveal>
  )
}
