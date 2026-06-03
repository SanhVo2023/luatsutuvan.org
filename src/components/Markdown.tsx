/**
 * <Markdown> — Server Component rendering guide body markdown to real HTML.
 * Adapted from shared-assets/components/Markdown.tsx for this site's bespoke
 * `.guide-prose` styling (no @tailwindcss/typography). Headings auto-anchored
 * via rehype-slug so the TOC links resolve.
 */

import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/config/site'

type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  const siteUrl = SITE.url

  const components: Components = {
    a({ href, children }) {
      if (!href) return <>{children}</>
      const external = /^https?:\/\//i.test(href) && !href.startsWith(siteUrl)
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      }
      return <Link href={href}>{children}</Link>
    },
    img({ src, alt }) {
      if (!src || typeof src !== 'string') return <></>
      return (
        <Image
          src={src}
          alt={alt ?? ''}
          width={1200}
          height={675}
          sizes="(max-width: 768px) 100vw, 720px"
          className="w-full h-auto rounded-2xl my-6"
        />
      )
    },
  }

  return (
    <div className={className ?? 'guide-prose'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
