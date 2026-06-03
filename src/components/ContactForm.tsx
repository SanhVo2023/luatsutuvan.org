'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { ctaUrl } from '@/config/site'

type State = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Có lỗi xảy ra. Vui lòng thử lại.')
        setState('error')
        return
      }
      setState('sent')
    } catch {
      setError('Không thể gửi. Vui lòng kiểm tra kết nối và thử lại.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-3xl border border-success/30 bg-[#f1faf2] p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-success text-white">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
          Đã nhận được câu hỏi của bạn
        </h3>
        <p className="mt-2 text-ink-soft">
          Cảm ơn bạn. Chúng tôi sẽ phản hồi trong thời gian sớm nhất. Nếu cần hỗ
          trợ ngay, bạn có thể gọi cho chúng tôi.
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-teal focus:bg-white'

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Họ và tên <span className="text-teal">*</span>
          </label>
          <input id="name" name="name" required className={inputCls} placeholder="Nguyễn Văn A" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Số điện thoại
          </label>
          <input id="phone" name="phone" inputMode="tel" className={inputCls} placeholder="09xx xxx xxx" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
          Email
        </label>
        <input id="email" name="email" type="email" className={inputCls} placeholder="email@example.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-soft">
          Câu hỏi của bạn <span className="text-teal">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="Mô tả ngắn gọn vấn đề bạn cần tư vấn..."
        />
      </div>

      {state === 'error' && (
        <p className="rounded-xl bg-gold-soft px-4 py-3 text-sm text-gold">{error}</p>
      )}

      <p className="text-sm text-muted">
        Cần tư vấn chính thức và phản hồi nhanh? Đặt lịch trực tiếp tại{' '}
        <a
          href={ctaUrl({ placement: 'form' })}
          target="_blank"
          rel="noopener"
          className="font-medium text-teal-700 underline decoration-teal/30 underline-offset-2"
        >
          luatsutuvan.net
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center gap-2 rounded-pill bg-teal px-6 py-3.5 font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-70"
      >
        {state === 'sending' ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Đang gửi...
          </>
        ) : (
          <>
            <Send className="size-4" /> Gửi câu hỏi
          </>
        )}
      </button>
    </form>
  )
}
