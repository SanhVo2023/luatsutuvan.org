import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingCta } from '@/components/layout/FloatingCta'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { SITE } from '@/config/site'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Cẩm nang tư vấn pháp luật toàn diện: khi nào nên gặp luật sư, các hình thức tư vấn, chuẩn bị hồ sơ và giải đáp thắc mắc. Hướng dẫn từ luật sư Apolo Lawyers.',
  applicationName: SITE.name,
  authors: [{ name: 'Apolo Editorial Team' }],
  creator: 'Apolo Lawyers',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      'Hiểu rõ quy trình tư vấn pháp luật trước khi gặp luật sư. Cẩm nang bình tĩnh, đầy đủ, đáng tin cậy.',
    // og:image is supplied automatically by app/opengraph-image.tsx (dynamic card).
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0a8f85',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // env(safe-area-inset-*) resolves on notched iOS/Android
  interactiveWidget: 'resizes-content', // on-screen keyboard shrinks layout, not overlays
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="skip-link">
          Bỏ qua tới nội dung chính
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  )
}
