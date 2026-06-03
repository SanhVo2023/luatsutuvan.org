'use client'

/**
 * <ProcessSteps> — numbered, sequential step reveal (PRD motion §). Big
 * ExtraBold step numbers, connecting spine, each step fades in on scroll.
 */

import { Clock } from 'lucide-react'
import { ScrollReveal } from '@/components/motion/Reveal'
import type { ProcessStep } from '@/lib/guides'

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="not-prose my-10 relative">
      <div
        aria-hidden
        className="absolute left-[1.85rem] top-6 bottom-6 w-px bg-gradient-to-b from-navy/40 via-navy-400/30 to-transparent sm:left-[2.1rem]"
      />
      <ol className="space-y-7">
        {steps.map((step, i) => (
          <ScrollReveal as="li" key={i} delay={i * 0.05} className="relative flex gap-5">
            <div
              id={`buoc-${i + 1}`}
              className="relative z-10 grid size-[3.7rem] shrink-0 scroll-mt-28 place-items-center rounded-2xl border border-navy/20 bg-white shadow-soft sm:size-[4.2rem]"
            >
              <span className="font-heading text-2xl font-extrabold leading-none text-navy sm:text-3xl">
                {i + 1}
              </span>
            </div>
            <div className="min-w-0 pt-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                {step.duration && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-muted">
                    <Clock className="size-3" />
                    {step.duration}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-ink-soft leading-relaxed">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  )
}
