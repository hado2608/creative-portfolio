'use client'

import Link from 'next/link'

const PILL: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '9px 16px',
  borderRadius: 999,
  border: '1px solid rgba(71, 62, 61, 0.15)',
  background: 'rgba(247, 247, 247, 0.88)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  fontSize: 13,
  color: '#473E3D',
  textDecoration: 'none',
  fontFamily: "'Neue Montreal', sans-serif",
  fontWeight: 500,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5.5L6.5 1 12 5.5V12H8.5V8.5H4.5V12H1V5.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function CaseStudyNav({
  nextHref,
  nextLabel = 'Next case study',
}: {
  nextHref: string
  nextLabel?: string
}) {
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
      }}
    >
      <Link href="/" style={PILL}>
        <HomeIcon />
        back to home
      </Link>

      <Link href={nextHref} style={PILL}>
        {nextLabel}
        <ArrowIcon />
      </Link>
    </nav>
  )
}
