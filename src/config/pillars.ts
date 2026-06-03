/**
 * The 5 content pillars (PRD §3). Each pillar maps to a hub page route and a
 * frontmatter `pillar` value used by guides in src/content/guides.
 */

export type PillarId =
  | 'khi-nao'
  | 'hinh-thuc'
  | 'chuan-bi'
  | 'faq'
  | 'landing-linh-vuc'

export interface Pillar {
  id: PillarId
  slug: string // route segment
  title: string
  shortTitle: string
  description: string
  intro: string
  icon: string // lucide icon name
  accent: 'navy' | 'gold' | 'steel'
  heroImageId?: string // generated hero image id (src/lib/assets.ts), optional
}

export const PILLARS: Pillar[] = [
  {
    id: 'khi-nao',
    slug: 'khi-nao-nen-gap-luat-su',
    title: 'Khi nào nên gặp luật sư',
    shortTitle: 'Khi nào cần luật sư',
    description:
      'Nhận diện đúng thời điểm cần đến luật sư — những dấu hiệu, tình huống và rủi ro nếu chần chừ.',
    intro:
      'Phần lớn rắc rối pháp lý trở nên tốn kém vì người trong cuộc gặp luật sư quá muộn. Những hướng dẫn dưới đây giúp bạn nhận ra thời điểm nên tìm đến luật sư — bình tĩnh, có căn cứ, đúng lúc.',
    icon: 'Compass',
    accent: 'navy',
    heroImageId: 'hub-khi-nao',
  },
  {
    id: 'hinh-thuc',
    slug: 'hinh-thuc-tu-van',
    title: 'Hình thức tư vấn',
    shortTitle: 'Hình thức tư vấn',
    description:
      'Tư vấn trực tiếp, online, qua điện thoại hay email — mỗi hình thức phù hợp với tình huống nào?',
    intro:
      'Bạn không nhất thiết phải đến văn phòng mới được tư vấn. Tìm hiểu từng hình thức tư vấn pháp luật, chi phí, ưu nhược điểm để chọn cách phù hợp nhất với hoàn cảnh của mình.',
    icon: 'MessagesSquare',
    accent: 'gold',
    heroImageId: 'hub-hinh-thuc',
  },
  {
    id: 'chuan-bi',
    slug: 'chuan-bi-ho-so',
    title: 'Chuẩn bị hồ sơ',
    shortTitle: 'Chuẩn bị hồ sơ',
    description:
      'Danh sách giấy tờ, cách tổ chức hồ sơ và thu thập chứng cứ trước buổi tư vấn.',
    intro:
      'Một buổi tư vấn hiệu quả bắt đầu từ sự chuẩn bị. Các checklist dưới đây liệt kê chính xác những giấy tờ cần mang theo cho từng loại vụ việc, kèm hướng dẫn tổ chức hồ sơ gọn gàng.',
    icon: 'ClipboardCheck',
    accent: 'steel',
    heroImageId: 'hub-chuan-bi',
  },
  {
    id: 'faq',
    slug: 'faq-tu-van',
    title: 'Câu hỏi thường gặp',
    shortTitle: 'Câu hỏi thường gặp',
    description:
      'Giải đáp thẳng thắn những lo lắng phổ biến: chi phí, bảo mật, quyền lợi, cam kết thắng kiện.',
    intro:
      'Những băn khoăn khiến nhiều người ngần ngại liên hệ luật sư thường xuất phát từ hiểu lầm. Phần này trả lời trực tiếp, trung thực và có dẫn chiếu quy định pháp luật.',
    icon: 'HelpCircle',
    accent: 'navy',
    heroImageId: 'hub-faq',
  },
  {
    id: 'landing-linh-vuc',
    slug: 'landing-linh-vuc',
    title: 'Tư vấn theo lĩnh vực',
    shortTitle: 'Theo lĩnh vực',
    description:
      'Buổi tư vấn diễn ra như thế nào với từng lĩnh vực: ly hôn, đất đai, doanh nghiệp, lao động…',
    intro:
      'Mỗi lĩnh vực pháp luật có đặc thù riêng. Các trang dưới đây mô tả những gì bạn nên biết và nên chuẩn bị trước khi tư vấn theo từng lĩnh vực cụ thể.',
    icon: 'Scale',
    accent: 'gold',
    heroImageId: 'hub-linh-vuc',
  },
]

export const PILLAR_MAP: Record<PillarId, Pillar> = PILLARS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<PillarId, Pillar>,
)

export function pillarByRoute(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug)
}
