'use client'

/**
 * Motion primitives — the site's animation vocabulary.
 *   <ScrollReveal>   gentle fade+rise as section enters view
 *   <StaggerReveal>  / <StaggerItem>  sequenced reveal for grids & accordions
 *   <HoverZoom>      soft lift on hover for guide cards
 *
 * All respect prefers-reduced-motion (handled globally in CSS; motion also
 * honours the OS setting via `useReducedMotion`).
 */

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'header' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </M>
  )
}

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function StaggerReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemV}>
      {children}
    </motion.div>
  )
}

export function HoverZoom({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Big heading that settles with a subtle scale — gives long reads weight. */
export function ScrollHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.h1
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.h1>
  )
}
