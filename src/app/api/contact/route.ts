/**
 * POST /api/contact — minimal contact form handler (PRD §6, MODERATE contact).
 * This site has NO local database. The submission is mirrored fire-and-forget to
 * the Apolo Contact Hub (Google Apps Script, CONTACT_HUB_URL). Primary lead
 * capture happens on luatsutuvan.net; this is a light inquiry channel only.
 */

import { NextResponse } from 'next/server'

const CONTACT_HUB_URL = process.env.CONTACT_HUB_URL

export async function POST(req: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Dữ liệu không hợp lệ.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const phone = (body.phone ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || (!email && !phone) || !message) {
    return NextResponse.json(
      { ok: false, error: 'Vui lòng nhập họ tên, email hoặc số điện thoại, và nội dung.' },
      { status: 400 },
    )
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Email không hợp lệ.' }, { status: 400 })
  }

  // Fire-and-forget mirror to the GAS contact hub. Never block the user on it.
  if (CONTACT_HUB_URL) {
    try {
      await fetch(CONTACT_HUB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: 'luatsutuvan.org',
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      })
    } catch (err) {
      console.warn('[contact] mirror to CONTACT_HUB_URL failed (non-fatal):', err)
    }
  } else {
    console.warn('[contact] CONTACT_HUB_URL not set — submission logged only:', {
      name,
      email,
      phone,
    })
  }

  return NextResponse.json({ ok: true })
}
