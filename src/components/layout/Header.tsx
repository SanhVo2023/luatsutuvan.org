'use client'

/**
 * Site header — calm, glass-on-scroll. Pillar nav, logo wordmark, quiet CTA.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Scale, ArrowUpRight } from 'lucide-react'
import { PILLARS } from '@/config/pillars'
import { ctaUrl, SITE } from '@/config/site'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.6rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-700 text-white shadow-soft">
            <Scale className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[1.15rem] font-bold tracking-tight text-ink">
              Luật Sư Tư Vấn
            </span>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">
              Cẩm nang tư vấn pháp luật
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {PILLARS.map((p) => {
            const href = `/${p.slug}/`
            const active = pathname.startsWith(`/${p.slug}`)
            return (
              <Link
                key={p.id}
                href={href}
                className={`rounded-pill px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                  active
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-ink-soft hover:bg-surface hover:text-ink'
                }`}
              >
                {p.shortTitle}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={ctaUrl({ placement: 'header' })}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1.5 rounded-pill bg-teal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 sm:inline-flex"
          >
            Tư vấn ngay
            <ArrowUpRight className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-5 py-4">
            {PILLARS.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}/`}
                className="block rounded-xl px-4 py-3 font-medium text-ink-soft hover:bg-surface"
              >
                {p.title}
              </Link>
            ))}
            <a
              href={ctaUrl({ placement: 'header-mobile' })}
              target="_blank"
              rel="noopener"
              className="mt-2 block rounded-xl bg-teal px-4 py-3 text-center font-semibold text-white"
            >
              Đặt lịch tư vấn
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
