import type { Metadata } from 'next'
import { MapPin, Phone, Mail, MessageCircle, Clock, Building2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'
import { ScrollReveal } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { SITE, TRUST } from '@/config/site'

export const metadata: Metadata = {
  title: 'Liên hệ — Gửi câu hỏi cho luật sư',
  description:
    'Gửi câu hỏi hoặc liên hệ với đội ngũ Apolo Lawyers. Tư vấn miễn phí lần đầu, phản hồi trong 30 phút làm việc. Văn phòng tại TP. Hồ Chí Minh.',
  alternates: { canonical: '/lien-he/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
    url: `${SITE.url}/lien-he/`,
    title: 'Liên hệ — Gửi câu hỏi cho luật sư',
    description:
      'Gửi câu hỏi hoặc liên hệ với đội ngũ Apolo Lawyers. Tư vấn miễn phí lần đầu, phản hồi trong 30 phút làm việc.',
  },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', url: '/' },
          { name: 'Liên hệ', url: '/lien-he/' },
        ])}
      />

      <section className="bg-aurora relative overflow-hidden border-b border-line">
        <div className="bg-guide-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pb-12 pt-10 lg:px-8">
          <Breadcrumbs items={[{ name: 'Liên hệ' }]} />
          <ScrollReveal>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Còn thắc mắc? Hãy để chúng tôi giúp bạn
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Gửi câu hỏi của bạn — chúng tôi sẽ phản hồi sớm nhất có thể. Nếu cần
              tư vấn chính thức, bạn có thể đặt lịch trực tiếp để được luật sư
              trao đổi chi tiết.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl gap-10 px-5 py-16 lg:grid lg:grid-cols-[1fr_22rem] lg:px-8">
        <ScrollReveal>
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-9">
            <h2 className="font-heading text-2xl font-bold text-ink">
              Gửi câu hỏi
            </h2>
            <p className="mt-2 text-muted">
              Vui lòng cung cấp họ tên, một cách liên hệ và mô tả ngắn gọn vấn đề.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8 lg:mt-0">
          <div className="space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-ink">
                Thông tin liên hệ
              </h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="font-medium text-ink">Trụ sở chính</p>
                    <p className="text-muted">{SITE.address}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Building2 className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="font-medium text-ink">Chi nhánh Đông Sài Gòn</p>
                    <p className="text-muted">{SITE.branchAddress}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="font-medium text-ink">Điện thoại</p>
                    <a href={SITE.phoneHref} className="text-navy-700 hover:underline">
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="font-medium text-ink">Email</p>
                    <a href={`mailto:${SITE.email}`} className="text-navy-700 hover:underline">
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="font-medium text-ink">Zalo</p>
                    <a href={SITE.zalo} target="_blank" rel="noopener" className="text-navy-700 hover:underline">
                      Apolo Lawyers
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-navy/20 bg-navy-50 p-6">
              <span className="inline-flex items-center gap-2 text-navy-700">
                <Clock className="size-5" />
                <span className="font-semibold">Phản hồi trong {TRUST.responseTime}</span>
              </span>
              <p className="mt-2 text-sm text-ink-soft">
                Trong giờ làm việc, đội ngũ của chúng tôi cố gắng phản hồi mọi câu
                hỏi trong vòng 30 phút.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}
