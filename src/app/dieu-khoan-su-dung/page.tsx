import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Markdown } from '@/components/Markdown'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  description:
    'Điều khoản sử dụng website Luật Sư Tư Vấn (luatsutuvan.org). Quy định về việc sử dụng nội dung và giới hạn trách nhiệm.',
  alternates: { canonical: '/dieu-khoan-su-dung/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
    url: `${SITE.url}/dieu-khoan-su-dung/`,
    title: 'Điều khoản sử dụng',
    description:
      'Điều khoản sử dụng website Luật Sư Tư Vấn (luatsutuvan.org).',
  },
}

const BODY = `
## Chấp nhận điều khoản

Khi truy cập và sử dụng website **luatsutuvan.org**, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.

## Tính chất nội dung

Nội dung trên website mang **tính chất tham khảo và giáo dục**. Đây là cẩm nang hướng dẫn về quy trình tư vấn pháp luật, **không phải ý kiến pháp lý chính thức** cho trường hợp cụ thể của bạn.

- Mỗi vụ việc có tình tiết riêng; kết quả thực tế phụ thuộc vào chứng cứ, quy định pháp luật áp dụng và diễn biến cụ thể.
- Để nhận tư vấn chính thức, bạn cần làm việc trực tiếp với luật sư.

## Quan hệ luật sư – khách hàng

Việc đọc nội dung trên website **không** tự động hình thành quan hệ luật sư – khách hàng. Quan hệ này chỉ được xác lập khi có thỏa thuận dịch vụ pháp lý bằng văn bản với Apolo Lawyers.

## Quyền sở hữu trí tuệ

Toàn bộ nội dung, hình ảnh và thiết kế trên website thuộc quyền sở hữu của Apolo Lawyers. Bạn có thể trích dẫn cho mục đích cá nhân, phi thương mại, kèm ghi nguồn; không sao chép toàn bộ để đăng lại khi chưa được đồng ý.

## Liên kết đến website khác

Website có liên kết đến **luatsutuvan.net** và các trang thuộc hệ sinh thái Apolo Lawyers. Chúng tôi không chịu trách nhiệm về nội dung của các website bên thứ ba khác.

## Giới hạn trách nhiệm

Chúng tôi nỗ lực bảo đảm thông tin chính xác và cập nhật, nhưng không bảo đảm tuyệt đối. Chúng tôi không chịu trách nhiệm cho thiệt hại phát sinh từ việc bạn dựa hoàn toàn vào nội dung website mà không tham vấn luật sư.

## Liên hệ

Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ: **${SITE.email}**.
`

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', url: '/' },
          { name: 'Điều khoản sử dụng', url: '/dieu-khoan-su-dung/' },
        ])}
      />
      <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <Breadcrumbs items={[{ name: 'Điều khoản sử dụng' }]} />
        <h1 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Điều khoản sử dụng
        </h1>
        <p className="mt-3 text-muted">Cập nhật lần cuối: 2026</p>
        <div className="mt-8">
          <Markdown>{BODY}</Markdown>
        </div>
      </div>
    </>
  )
}
