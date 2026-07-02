'use client'

import Link from 'next/link'

const COLOR = '#473E3D'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.561 0 0 0 0 0.659 0 0 0 0 0.706 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

const PILL: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '9.9px 16.9px',
  borderRadius: 999,
  border: '0.9px solid rgba(71, 62, 61, 0.15)',
  background: 'transparent',
  fontSize: 16,
  color: COLOR,
  textDecoration: 'none',
  fontFamily: "'Neue Montreal', sans-serif",
  fontWeight: 400,
  letterSpacing: '0.01em',
  lineHeight: '24px',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
  position: 'relative',
  zIndex: 1,
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1 5.5L6.5 1 12 5.5V12H8.5V8.5H4.5V12H1V5.5Z" stroke={COLOR} strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  )
}

function CornerDownRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M2 2V7.5C2 8.6 2.9 9.5 4 9.5H11" stroke={COLOR} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 7L11 9.5L8.5 12" stroke={COLOR} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function CaseStudyNav({ nextHref }: { nextHref: string }) {
  return (
    <nav
      aria-label="Case study navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 40px',
        background: 'rgba(247, 247, 247, 0.3)',
        backdropFilter: 'blur(4.5px)',
        WebkitBackdropFilter: 'blur(4.5px)',
        borderBottom: '1px solid rgba(71, 62, 61, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <Link href="/work" style={{ ...PILL, position: 'relative', zIndex: 1 }}>
        <HomeIcon />
        back to work
      </Link>

      <Link href={nextHref} style={{ ...PILL, position: 'relative', zIndex: 1 }}>
        <CornerDownRightIcon />
        next case study
      </Link>
    </nav>
  )
}
