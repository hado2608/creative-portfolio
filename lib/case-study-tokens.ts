import type { CSSProperties } from 'react'

// ─── Typography ───────────────────────────────────────────────────────────────

export const FONT = {
  sans:  "'Neue Montreal', sans-serif",
  serif: "'The Seasons', serif",
} as const

// Section h2 — applies to every major section heading across all case studies
export const H2: CSSProperties = {
  fontFamily: FONT.sans,
  fontWeight: 500,
  fontSize: 32,
  lineHeight: 1.5,
  color: 'var(--color-warm-text)',
  marginBottom: 16,
}

// Sub-section h3 — used inside sections
export const H3: CSSProperties = {
  fontFamily: FONT.sans,
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 1.4,
  color: 'var(--color-warm-text)',
  marginBottom: 16,
}

// Body paragraph
export const BODY: CSSProperties = {
  fontFamily: FONT.sans,
  fontSize: 18,
  lineHeight: 1.75,
  letterSpacing: '0.02em',
}

// Caption below media
export const CAPTION: CSSProperties = {
  fontFamily: FONT.sans,
  fontStyle: 'italic',
  fontSize: 16,
  lineHeight: 1.75,
  letterSpacing: '0.02em',
  color: 'var(--color-warm-muted)',
  textAlign: 'left',
  marginTop: 8,
  marginBottom: 32,
}

// Section eyebrow label — e.g. "Overview", "Problem"
export const SECTION_LABEL: CSSProperties = {
  fontFamily: FONT.sans,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-warm-muted)',
  marginBottom: 8,
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const GAP = {
  // Between the description paragraph and the first supporting media below it
  descriptionToMedia: 24,

  // Between major sections
  section: 128,

  // Between sub-sections within a section
  subsection: 16,

  // Internal card / callout padding
  cardPadding: 24,
} as const

// ─── Colors (CSS custom properties) ──────────────────────────────────────────

export const COLOR = {
  text:    'var(--color-warm-text)',
  muted:   'var(--color-warm-muted)',
  accent:  'var(--color-warm-accent)',
  border:  'var(--color-warm-border)',
  surface: 'var(--color-warm-surface)',
} as const

// ─── Page layout ─────────────────────────────────────────────────────────────

// Outer centering wrapper (hero, nav)
export const CENTERED: CSSProperties = {
  maxWidth: 1400,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 40,
  paddingRight: 40,
}
