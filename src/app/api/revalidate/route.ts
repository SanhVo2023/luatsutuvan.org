/**
 * POST /api/revalidate?secret=…&path=… — on-demand ISR.
 *
 * The Content Hub pings this after any edit (using the shared REVALIDATE_SECRET)
 * so changes appear within seconds instead of waiting for the 1-hour ISR window.
 * Validates the secret server-side; revalidates the given path (default '/').
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const expected = process.env.REVALIDATE_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const path = req.nextUrl.searchParams.get('path') || '/'
  try {
    revalidatePath(path)
    return NextResponse.json({ ok: true, revalidated: path })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Revalidation failed' },
      { status: 500 },
    )
  }
}
