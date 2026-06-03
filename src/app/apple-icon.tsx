import { ImageResponse } from 'next/og'

// Route segment config
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Apple touch icon — oxford-navy brand with a gold balance-scale glyph.
// Uses only inline SVG + background (no custom font) so it builds cleanly.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B2A4A 0%, #08203A 100%)',
          borderRadius: 40,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          fill="none"
          stroke="#C2A14D"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 16 V46" />
          <path d="M24 48 H40" />
          <path d="M18 22 H46" />
          <path d="M18 22 L13 33" />
          <path d="M18 22 L23 33" />
          <path d="M46 22 L41 33" />
          <path d="M46 22 L51 33" />
          <path d="M12 33 Q18 41 24 33" />
          <path d="M40 33 Q46 41 52 33" />
          <circle cx="32" cy="16" r="3" fill="#C2A14D" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  )
}
