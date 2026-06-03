import Image from 'next/image'
import { ShieldCheck, Gift, Clock, Lock, Scale } from 'lucide-react'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal'
import { asset, assetAlt } from '@/lib/assets'
import { TRUST } from '@/config/site'

const SIGNALS = [
  { icon: ShieldCheck, value: 'Đoàn Luật sư', label: 'Thành viên TP. Hồ Chí Minh' },
  { icon: Gift, value: 'Miễn phí', label: 'Tư vấn lần đầu' },
  { icon: Clock, value: TRUST.responseTime, label: 'Cam kết thời gian phản hồi' },
  { icon: Lock, value: 'Theo luật', label: 'Bảo mật theo Luật Luật sư' },
  { icon: Scale, value: '5 lĩnh vực', label: 'Tư vấn chuyên sâu' },
]

export function AuthorityBand() {
  const bg = asset('authority-band-bg')
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {bg && (
        <Image
          src={bg}
          alt={assetAlt('authority-band-bg', '')}
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy-700/85" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            Vì sao tin tưởng
          </p>
          <h2 className="font-display text-[2rem] font-bold leading-[1.12] text-white sm:text-[2.5rem]">
            Những cam kết có thể kiểm chứng — không phải lời hứa suông
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            Chúng tôi không quảng cáo tỷ lệ thắng kiện hay con số khách hàng.
            Thay vào đó là những cam kết và tư cách hành nghề bạn có thể kiểm
            chứng.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {SIGNALS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col gap-2">
                <span className="grid size-12 place-items-center rounded-2xl border border-gold/30 bg-white/5 text-gold">
                  <s.icon className="size-6" />
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-sm leading-snug text-white/65">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
