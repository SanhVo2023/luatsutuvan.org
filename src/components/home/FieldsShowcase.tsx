import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StaggerReveal, StaggerItem } from '@/components/motion/Reveal'
import { asset, assetAlt } from '@/lib/assets'

const FIELDS = [
  { slug: 'tu-van-luat-ly-hon', title: 'Ly hôn & Hôn nhân', blurb: 'Ly hôn, cấp dưỡng, chia tài sản, quyền nuôi con.', img: 'field-ly-hon' },
  { slug: 'tu-van-luat-dat-dai', title: 'Đất đai & Nhà ở', blurb: 'Tranh chấp, sổ đỏ, chuyển nhượng, thừa kế nhà đất.', img: 'field-dat-dai' },
  { slug: 'tu-van-luat-doanh-nghiep', title: 'Doanh nghiệp', blurb: 'Thành lập, hợp đồng, tranh chấp, tuân thủ pháp lý.', img: 'field-doanh-nghiep' },
  { slug: 'tu-van-luat-lao-dong', title: 'Lao động', blurb: 'Hợp đồng lao động, sa thải, tranh chấp, bảo hiểm.', img: 'field-lao-dong' },
  { slug: 'tu-van-luat-hinh-su', title: 'Hình sự', blurb: 'Bào chữa, quyền của bị can, thủ tục tố tụng.', img: 'field-hinh-su' },
]

export function FieldsShowcase() {
  return (
    <section className="bg-surface-alt">
      <div className="section-y mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Tư vấn theo lĩnh vực"
          title="Mỗi lĩnh vực một trang hướng dẫn riêng"
          intro="Mỗi lĩnh vực pháp luật có đặc thù riêng. Chọn lĩnh vực của bạn để biết nên chuẩn bị gì và buổi tư vấn sẽ diễn ra thế nào."
        />
        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FIELDS.map((f) => {
            const img = asset(f.img)
            return (
              <StaggerItem key={f.slug} className="h-full">
                <Link
                  href={`/landing-linh-vuc/${f.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-navy shadow-soft ring-1 ring-transparent transition-all hover:shadow-lift hover:ring-gold/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={assetAlt(f.img, f.title)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-navy-deep" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-700/95 via-navy-700/35 to-transparent" />
                    <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-xl font-bold text-white">
                      {f.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col bg-white p-5">
                    <p className="flex-1 text-sm leading-relaxed text-muted">
                      {f.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">
                      Xem hướng dẫn
                      <ArrowUpRight className="size-4 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
