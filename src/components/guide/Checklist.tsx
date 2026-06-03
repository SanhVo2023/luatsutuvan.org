'use client'

/**
 * <Checklist> — interactive, check-off document list. Each checkmark draws on
 * via GSAP (stroke-dashoffset) when scrolled into view; tapping an item toggles
 * a persisted "done" state (localStorage, keyed by checklist id) so a reader can
 * track preparation progress across visits. Progress bar at top.
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ChecklistItem } from '@/lib/guides'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Checklist({
  items,
  storageKey,
}: {
  items: ChecklistItem[]
  storageKey: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false))
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`checklist:${storageKey}`)
      if (saved) {
        const arr = JSON.parse(saved) as boolean[]
        if (Array.isArray(arr) && arr.length === items.length) setDone(arr)
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [storageKey, items.length])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(`checklist:${storageKey}`, JSON.stringify(done))
    } catch {
      /* ignore */
    }
  }, [done, hydrated, storageKey])

  // GSAP draw-on for the checkmark paths on scroll-in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.chk-path')
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 92%' },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const completed = done.filter(Boolean).length
  const pct = items.length ? Math.round((completed / items.length) * 100) : 0

  return (
    <div ref={rootRef} className="not-prose my-8 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-heading text-lg font-semibold text-ink">
          Danh sách giấy tờ cần chuẩn bị
        </h3>
        <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          {completed}/{items.length}
        </span>
      </div>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-sky transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => {
          const isDone = done[i]
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() =>
                  setDone((d) => d.map((v, idx) => (idx === i ? !v : v)))
                }
                className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  isDone
                    ? 'border-success/40 bg-[#f1faf2]'
                    : 'border-line bg-bg hover:border-teal/30 hover:bg-teal-50/40'
                }`}
              >
                <span
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 transition-colors ${
                    isDone
                      ? 'border-success bg-success'
                      : 'border-teal/40 bg-white'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none">
                    <path
                      className="chk-path"
                      d="M5 12.5l4 4L19 7"
                      stroke={isDone ? '#fff' : '#0a8f85'}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-medium ${
                      isDone ? 'text-muted line-through' : 'text-ink'
                    }`}
                  >
                    {item.text}
                    {item.required === false && (
                      <span className="ml-2 rounded bg-surface-alt px-1.5 py-0.5 text-xs font-normal text-muted align-middle">
                        không bắt buộc
                      </span>
                    )}
                  </span>
                  {item.note && (
                    <span className="mt-1 block text-sm text-muted">
                      {item.note}
                    </span>
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {pct === 100 && (
        <p className="mt-5 rounded-2xl bg-teal-50 px-4 py-3 text-center text-sm font-medium text-teal-700">
          Bạn đã chuẩn bị xong hồ sơ. Đây là thời điểm tốt để đặt lịch tư vấn.
        </p>
      )}
    </div>
  )
}
