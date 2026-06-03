'use client'

/**
 * Floating CTA — appears after 40% scroll (PRD §10). Gentle fade-in, NO pulse
 * (this site is calm). Links to luatsutuvan.net with UTM. Hidden in reduced
 * motion as a static pill (no entrance animation).
 */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck } from 'lucide-react'
import { ctaUrl } from '@/config/site'

export function FloatingCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      setShow(pct > 0.4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={ctaUrl({ placement: 'float' })}
          target="_blank"
          rel="noopener"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
          className="fixed right-5 z-40 inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-3.5 font-semibold text-white shadow-lift transition-colors hover:bg-navy-600"
        >
          <CalendarCheck className="size-5" />
          <span className="hidden sm:inline">Đặt lịch tư vấn</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
