import type { Metadata } from 'next'
import { ShieldCheck, Clock, Lock, Gift, Target, HeartHandshake } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal'
import { CtaBlock } from '@/components/guide/CtaBlock'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { LAWYER, TRUST, SITE } from '@/config/site'
import { APOLO } from '@/config/apolo'

export const metadata: Metadata = {
  title: 'Về chúng tôi — Cẩm nang tư vấn pháp luật Apolo Lawyers',
  description:
    'Luật Sư Tư Vấn là lớp hỗ trợ tin cậy của Apolo Lawyers, giúp bạn hiểu rõ quy trình tư vấn pháp luật trước khi gặp luật sư. Tìm hiểu về đội ngũ và cam kết của chúng tôi.',
  alternates: { canonical: '/ve-chung-toi/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
    url: `${SITE.url}/ve-chung-toi/`,
    title: 'Về chúng tôi — Cẩm nang tư vấn pháp luật Apolo Lawyers',
    description:
      'Luật Sư Tư Vấn là lớp hỗ trợ tin cậy của Apolo Lawyers, giúp bạn hiểu rõ quy trình tư vấn pháp luật trước khi gặp luật sư.',
  },
}

const VALUES = [
  { icon: Target, title: 'Rõ ràng, đầy đủ', text: 'Mỗi hướng dẫn được biên soạn kỹ, có dẫn chiếu quy định pháp luật để bạn nắm chắc thông tin.' },
  { icon: HeartHandshake, title: 'Bình tĩnh, không áp lực', text: 'Chúng tôi không thúc ép. Mục tiêu là giúp bạn tự tin, không phải tạo cảm giác vội vàng.' },
  { icon: Lock, title: 'Bảo mật tuyệt đối', text: 'Mọi thông tin bạn chia sẻ trong quá trình tư vấn được bảo mật theo quy định nghề luật sư.' },
]

const CREDS = [
  { icon: ShieldCheck, value: TRUST.barAssociation, label: 'Thành viên đoàn luật sư' },
  { icon: Gift, value: 'Miễn phí', label: 'Tư vấn lần đầu' },
  { icon: Clock, value: TRUST.responseTime, label: 'Thời gian phản hồi' },
  { icon: Lock, value: 'Theo luật', label: 'Bảo mật thông tin' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', url: '/' },
          { name: 'Về chúng tôi', url: '/ve-chung-toi/' },
        ])}
      />

      <section className="bg-aurora relative overflow-hidden border-b border-line">
        <div className="bg-guide-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-10 lg:px-8">
          <Breadcrumbs items={[{ name: 'Về chúng tôi' }]} />
          <ScrollReveal>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Đồng hành cùng bạn từ băn khoăn đến tự tin
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">Luật Sư Tư Vấn</strong> là cẩm nang
              hướng dẫn thuộc hệ sinh thái của{' '}
              <a
                href={APOLO.vi.parentBrandUrl}
                target="_blank"
                rel="noopener"
                className="font-medium text-navy-700 underline decoration-navy/30 underline-offset-2"
              >
                Apolo Lawyers
              </a>
              . Chúng tôi không phải nơi tiếp nhận hồ sơ — chúng tôi là nơi giúp
              bạn hiểu rõ quy trình tư vấn pháp luật để bước vào buổi gặp luật sư
              một cách chủ động và bình tĩnh.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <StaggerReveal className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {CREDS.map((c) => (
            <StaggerItem key={c.label}>
              <div className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                  <c.icon className="size-6" />
                </span>
                <p className="mt-3 font-heading text-lg font-bold text-ink">
                  {c.value}
                </p>
                <p className="text-sm text-muted">{c.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-14 grid gap-8 rounded-3xl border border-line bg-white p-8 shadow-soft lg:grid-cols-[auto_1fr] lg:p-10">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="grid size-24 place-items-center rounded-3xl bg-gradient-to-br from-navy to-navy-700 font-heading text-3xl font-bold text-white">
              VH
            </span>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-pill border border-navy/20 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
              <ShieldCheck className="size-3.5" />
              {TRUST.barAssociation}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">
              {LAWYER.name}
            </h2>
            <p className="mt-1 font-medium text-navy-700">{LAWYER.title}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{LAWYER.bio}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Quan điểm xuyên suốt của chúng tôi: một khách hàng được trang bị
              kiến thức là một khách hàng được bảo vệ tốt hơn. Vì vậy, trước khi
              mời bạn liên hệ, chúng tôi muốn bạn hiểu rõ mình đang ở đâu trong
              quy trình pháp lý.
            </p>
          </div>
        </div>

        <SectionHeading
          eyebrow="Giá trị cốt lõi"
          title="Cách chúng tôi xây dựng cẩm nang này"
          align="center"
        />
        <StaggerReveal className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                  <v.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-14">
          <CtaBlock
            headline="Sẵn sàng trao đổi với luật sư của chúng tôi?"
            subtext={`Đặt lịch tư vấn tại ${SITE.intakeUrl.replace('https://', '')} — tư vấn miễn phí lần đầu, phản hồi trong ${TRUST.responseTime}.`}
          />
        </div>
      </section>
    </>
  )
}
