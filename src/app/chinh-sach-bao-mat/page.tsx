import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Markdown } from '@/components/Markdown'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description:
    'Chính sách bảo mật thông tin của website Luật Sư Tư Vấn (luatsutuvan.org). Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.',
  alternates: { canonical: '/chinh-sach-bao-mat/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
    url: `${SITE.url}/chinh-sach-bao-mat/`,
    title: 'Chính sách bảo mật',
    description:
      'Chính sách bảo mật thông tin của website Luật Sư Tư Vấn (luatsutuvan.org).',
  },
}

const BODY = `
## Phạm vi áp dụng

Chính sách này áp dụng cho website **luatsutuvan.org** ("chúng tôi"). Website là cẩm nang thông tin pháp luật thuộc hệ sinh thái của Apolo Lawyers, không phải nơi tiếp nhận hồ sơ vụ việc chính thức.

## Thông tin chúng tôi thu thập

- **Thông tin bạn cung cấp**: họ tên, email, số điện thoại và nội dung câu hỏi khi bạn sử dụng biểu mẫu liên hệ.
- **Thông tin tự động**: dữ liệu truy cập ẩn danh (loại trình duyệt, trang đã xem) phục vụ thống kê và cải thiện nội dung.

## Mục đích sử dụng

- Phản hồi câu hỏi và yêu cầu liên hệ của bạn.
- Cải thiện chất lượng nội dung hướng dẫn.
- Chúng tôi **không** bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.

## Bảo mật thông tin nghề luật sư

Mọi thông tin bạn chia sẻ trong quá trình tư vấn pháp lý với luật sư được bảo mật theo quy định về nghĩa vụ giữ bí mật của luật sư trong Luật Luật sư hiện hành.

## Cookie

Website có thể sử dụng cookie để ghi nhớ lựa chọn của bạn (ví dụ tiến độ checklist) và phục vụ thống kê. Bạn có thể tắt cookie trong trình duyệt, một số tính năng có thể bị ảnh hưởng.

## Quyền của bạn

Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân đã cung cấp bằng cách liên hệ với chúng tôi qua email.

## Liên hệ

Mọi câu hỏi về chính sách bảo mật, vui lòng liên hệ: **${SITE.email}**.

Chính sách có thể được cập nhật theo thời gian. Phiên bản hiện tại được cập nhật năm 2026.
`

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', url: '/' },
          { name: 'Chính sách bảo mật', url: '/chinh-sach-bao-mat/' },
        ])}
      />
      <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <Breadcrumbs items={[{ name: 'Chính sách bảo mật' }]} />
        <h1 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Chính sách bảo mật
        </h1>
        <p className="mt-3 text-muted">Cập nhật lần cuối: 2026</p>
        <div className="mt-8">
          <Markdown>{BODY}</Markdown>
        </div>
      </div>
    </>
  )
}
