/**
 * Generated-image registry. The reuse-first image pipeline
 * (tools/image-generator/headless.mjs) writes `assets.json` at the site root:
 * an array of { id, name, category, width, aspect, cdn_url, alt, description }.
 *
 * Components reference images by id via `asset(id)` / `assetAlt(id)` so a
 * re-generation (new URLs) needs no code changes. Missing ids return undefined,
 * letting callers fall back gracefully.
 */

import assetsData from '../../assets.json'

export interface AssetEntry {
  id: string
  name?: string
  category?: string
  width?: number
  aspect?: string
  cdn_url: string
  alt?: string
  description?: string
}

const MAP = new Map<string, AssetEntry>(
  (assetsData as AssetEntry[]).map((a) => [a.id, a]),
)

/** R2 CDN url for an image id, or undefined if not generated. */
export function asset(id: string): string | undefined {
  return MAP.get(id)?.cdn_url
}

/** Alt text for an image id, with an optional fallback. */
export function assetAlt(id: string, fallback = ''): string {
  return MAP.get(id)?.alt ?? fallback
}

/** Full entry (url + alt + dims) for an image id. */
export function assetEntry(id: string): AssetEntry | undefined {
  return MAP.get(id)
}
