'use client'

/**
 * <Accordion> — FAQ-style disclosure with smooth height animation (motion).
 * Renders as semantic <dl>; the FAQPage schema is emitted separately via JsonLd
 * so the structured data is independent of this client interactivity.
 */

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { StaggerReveal, StaggerItem } from '@/components/motion/Reveal'

export interface AccordionEntry {
  q: string
  a: string // plain text / simple html-free
}

export function Accordion({ items }: { items: AccordionEntry[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <StaggerReveal className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <StaggerItem key={i}>
            <div
              className={`rounded-2xl border transition-colors ${
                isOpen
                  ? 'border-teal/30 bg-teal-50 shadow-soft'
                  : 'border-line bg-white hover:border-teal/25'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-ink text-[1.05rem] leading-snug">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-teal text-white"
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-ink-soft leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerReveal>
  )
}
