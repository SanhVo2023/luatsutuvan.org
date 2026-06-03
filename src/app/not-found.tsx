import Link from 'next/link'
import { Compass, ArrowRight, Home } from 'lucide-react'
import { PILLARS } from '@/config/pillars'
import { Icon } from '@/components/ui/icons'

export default function NotFound() {
  return (
    <div className="bg-aurora relative overflow-hidden">
      <div className="bg-guide-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center lg:px-8">
        <span className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-navy to-navy-700 text-white shadow-lift">
          <Compass className="size-10" />
        </span>
        <p className="mt-8 font-heading text-7xl font-extrabold text-navy/20">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Không tìm thấy trang bạn cần
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          Có thể đường dẫn đã thay đổi. Hãy quay về trang chủ hoặc chọn một chủ đề
          trong cẩm nang dưới đây.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PILLARS.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}/`}
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-navy/30 hover:text-navy-700"
            >
              <Icon name={p.icon} className="size-4 text-navy" />
              {p.shortTitle}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3.5 font-semibold text-white shadow-glow transition-colors hover:bg-navy-600"
        >
          <Home className="size-4" />
          Về trang chủ
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
