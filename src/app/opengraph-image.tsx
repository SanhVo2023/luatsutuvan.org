import { ImageResponse } from 'next/og'

// Route segment config
export const alt = 'Luật Sư Tư Vấn — Hướng dẫn tư vấn pháp luật'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// 1200x630 branded social card on an oxford-navy gradient with gold accents.
// Uses the next/og built-in default font (no remote/bundled font fetch),
// so the build has no external dependency and renders cleanly.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0B2A4A 0%, #0A2540 55%, #08203A 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand mark row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'rgba(194,161,77,0.14)',
              border: '2px solid rgba(194,161,77,0.45)',
            }}
          >
            <svg
              width="60"
              height="60"
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
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.92)',
            }}
          >
            luatsutuvan.org
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Luật Sư Tư Vấn
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 44,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Hướng dẫn tư vấn pháp luật
          </div>
        </div>

        {/* Footer accent line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <div style={{ display: 'flex', width: 64, height: 6, borderRadius: 3, background: '#C2A14D' }} />
          Tư vấn pháp luật rõ ràng, dễ hiểu
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
