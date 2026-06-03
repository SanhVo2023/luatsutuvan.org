'use client'

/**
 * <Toc> — sticky table of contents for long guides. Highlights the active
 * section via IntersectionObserver. Auto-shown for guides > ~900 words.
 */

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

export function Toc({
  headings,
}: {
  headings: { id: string; text: string; level: number }[]
}) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav aria-label="Mục lục" className="text-sm">
      <p className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wide text-muted">
        <List className="size-4 text-teal" />
        Nội dung bài viết
      </p>
      <ul className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '0.9rem' : 0 }}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                active === h.id
                  ? 'border-teal font-medium text-teal-700'
                  : 'border-transparent text-muted hover:border-teal/40 hover:text-ink'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
