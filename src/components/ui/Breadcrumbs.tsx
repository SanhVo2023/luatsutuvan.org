import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-navy-700">
            <Home className="size-3.5" />
            <span className="sr-only">Trang chủ</span>
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 text-line" />
            {it.href && i < items.length - 1 ? (
              <Link href={it.href} className="hover:text-navy-700">
                {it.name}
              </Link>
            ) : (
              <span className="font-medium text-ink-soft line-clamp-1">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
