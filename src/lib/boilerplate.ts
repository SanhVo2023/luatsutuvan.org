/**
 * Shared boilerplate resolved from the Content Hub with hardcoded local fallbacks.
 *
 * Hybrid model: the hub owns these strings so Mr Hien can edit them in /admin,
 * but every getter degrades to the canonical local text when the hub is off
 * (`hubEnabled()` false), unreachable, or hasn't been populated yet. This means
 * the site renders identically today (hub has no `general` disclaimer yet) and
 * picks up hub edits automatically once they exist — no code change needed.
 */

import { getDisclaimer, getAuthor, hubEnabled } from './hub'

/** Footer / global reference disclaimer. */
export const LOCAL_DISCLAIMER =
  'Nội dung trên website mang tính tham khảo, không thay thế cho tư vấn pháp lý trực tiếp đối với từng trường hợp cụ thể.'

/** Longer per-article disclaimer shown at the end of each guide. */
export const LOCAL_GUIDE_DISCLAIMER =
  'Nội dung bài viết mang tính tham khảo chung, không thay thế cho tư vấn pháp lý đối với từng trường hợp cụ thể; quy định pháp luật có thể thay đổi theo thời gian. Để được tư vấn chính xác, vui lòng liên hệ trực tiếp với luật sư.'

/** Canonical English byline across the ecosystem. */
export const LOCAL_BYLINE = 'Apolo Editorial Team'

/** Reference disclaimer text — hub `disclaimers[key=general, locale=vi]` or fallback. */
export async function getSiteDisclaimer(fallback: string = LOCAL_DISCLAIMER): Promise<string> {
  if (!hubEnabled()) return fallback
  const d = await getDisclaimer('general', 'vi')
  return d?.body?.trim() || fallback
}

/** Author display name — hub `authors[slug=editorial-team]` or fallback. */
export async function getBylineName(fallback: string = LOCAL_BYLINE): Promise<string> {
  if (!hubEnabled()) return fallback
  const a = await getAuthor('editorial-team')
  return a?.name?.trim() || fallback
}
