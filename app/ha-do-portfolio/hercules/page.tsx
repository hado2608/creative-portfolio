'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'deconstruction',  label: 'Deconstruction' },
  { id: 'token-system',    label: 'Token System' },
  { id: 'atoms-organisms', label: 'Atoms → Organisms' },
  { id: 'challenges',      label: 'Challenges' },
  { id: 'testing',         label: 'Testing' },
  { id: 'documentation',   label: 'Documentation' },
  { id: 'outcome',         label: 'Outcome' },
  { id: 'next-steps',      label: 'Next Steps' },
  { id: 'retrospective',   label: 'Retrospective' },
]

const CENTERED: React.CSSProperties = {
  maxWidth: 1400,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 40,
  paddingRight: 40,
}

const SERIF = "'Recoleta', Georgia, serif"
const SANS  = "'Neue Montreal', sans-serif"

const h2Style: React.CSSProperties = {
  fontFamily: SERIF,
  fontSize: 'clamp(28px, 3.5vw, 40px)',
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: 'var(--color-warm-text)',
  marginBottom: 16,
}

const labelStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-warm-muted)',
  marginBottom: 12,
}

const bodyStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.75,
  color: 'var(--color-warm-body)',
  letterSpacing: '0.02em',
  fontFamily: SANS,
}

// ── Reusable components ───────────────────────────────────────────────────────

function VisualBlock({ label, caption, aspect = '16/9' }: { label: string; caption?: string; aspect?: string }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <div style={{ background: '#e2e5ea', borderRadius: 8, aspectRatio: aspect, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#9ba3af', textAlign: 'center', padding: '0 24px', fontFamily: SANS }}>{label}</span>
      </div>
      {caption && (
        <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 10, fontFamily: SANS }}>
          {caption}
        </p>
      )}
    </div>
  )
}

function StatCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '28px 32px', borderTop: '3px solid var(--color-warm-accent)' }}>
      <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', color: 'var(--color-warm-text)', marginBottom: 20, lineHeight: 1.75 }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 18, lineHeight: 1.75, color: 'var(--color-warm-body)', letterSpacing: '0.02em', fontFamily: SANS }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-warm-accent)', flexShrink: 0, marginTop: 8 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote style={{
      borderLeft: '3px solid var(--color-warm-accent)',
      paddingLeft: 28,
      margin: '48px 0',
      fontFamily: SERIF,
      fontSize: 'clamp(20px, 2.5vw, 26px)',
      fontStyle: 'italic',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: 'var(--color-warm-text)',
    }}>
      {children}
    </blockquote>
  )
}

function BrowserFrame({ label }: { label: string }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid var(--color-warm-border)' }}>
      <div style={{ background: '#f0f0f0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ flex: 1, background: '#e0e0e0', borderRadius: 4, height: 20, marginLeft: 8 }} />
      </div>
      <div style={{ background: '#e2e5ea', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#9ba3af', fontFamily: SANS }}>{label}</span>
      </div>
    </div>
  )
}

function CalloutCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: '28px 32px',
      border: '1px solid var(--color-warm-border)',
      borderLeft: '3px solid var(--color-warm-accent)',
      margin: '32px 0',
    }}>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 16, letterSpacing: '0.02em' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function ChallengeCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid var(--color-warm-border)' }}>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', letterSpacing: '0.02em' }}>{title}</p>
      <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-warm-muted)', fontFamily: SANS, letterSpacing: '0.02em' }}>{body}</p>
    </div>
  )
}

function FeedbackQuote({ quote }: { quote: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: '28px 32px',
      border: '1px solid var(--color-warm-border)',
    }}>
      <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: 'var(--color-warm-text)' }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function SideNavItem({ item, active }: { item: typeof NAV_ITEMS[0]; active: string }) {
  const isActive = active === item.id

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <li>
      <button
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: SANS,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: 'rgba(40,40,40,0.5)',
          fontWeight: isActive ? 700 : 500,
          lineHeight: 1.2,
          transition: 'font-weight 150ms',
          textAlign: 'left',
        }}
      >
        <svg width="26" height="4" viewBox="0 0 26 4" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, transition: 'opacity 150ms' }}>
          <path d="M0 0H25.9151L24 4H0V0Z" fill={isActive ? '#5A77DF' : 'transparent'} />
        </svg>
        {item.label}
      </button>
    </li>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HerculesPage() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <article style={{ background: 'var(--color-warm-bg)', color: 'var(--color-warm-body)', minHeight: '100vh' }}>

      <CaseStudyNav nextHref="/ha-do-portfolio/matcha-bot" nextLabel="Next case study" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, paddingTop: 80, paddingBottom: 0 }}>

        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="/assets/hercules-hero.png"
            alt="Hercules UI Kit"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--color-warm-border)' }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 80, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--color-warm-text)', marginBottom: 16 }}>
              Hercules
            </h1>
            <p style={{ ...bodyStyle, color: 'var(--color-warm-body)' }}>
              An unofficial design system for ClassPass. Building the foundation that lets the product grow stronger.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'flex-end' }}>
            {[
              { label: 'Role',     value: 'Systems Designer — Typography lead' },
              { label: 'Timeline', value: 'One semester' },
              { label: 'Team',     value: 'Ha Do · Anvita Shah · Simran Kaur · Matthew Thien' },
              { label: 'Tools',    value: 'Figma · Zeroheight' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ ...bodyStyle, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>{label}</p>
                <p style={{ ...bodyStyle, color: 'var(--color-warm-body)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="cs-mobile-nav" aria-hidden="true" />

      <div className="cs-body" style={{ ...CENTERED, marginTop: 80 }}>

        {/* Sticky nav */}
        <nav className="cs-sidenav" aria-label="Case study sections">
          <ul style={{ position: 'sticky', top: 96, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {NAV_ITEMS.map(item => (
              <SideNavItem key={item.id} item={item} active={activeSection} />
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div style={{ paddingBottom: 160, minWidth: 0 }}>

          {/* ── OVERVIEW ── */}
          <section id="overview" style={{ marginBottom: 128 }}>

            <p style={labelStyle}>Overview</p>
            <h2 style={h2Style}>The world&apos;s largest fitness platform had no design system.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              ClassPass is the world&apos;s largest fitness and wellness marketplace, operating across 30+ countries with millions of members booking studios, gyms, salons, and spas every day. As the product scaled, so did the complexity behind it.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 56 }}>
              But no one had built the infrastructure to match. Components lived in scattered Figma files. Tokens were inconsistent across platforms. Accessibility guidelines existed in a shared doc no one had opened in months. Every new feature meant rebuilding patterns from scratch, or from memory.
            </p>

            {/* Problem */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48, marginBottom: 56 }}>
              <p style={labelStyle}>The Problem</p>
              <h2 style={h2Style}>Mobile-first. Accessibility last.</h2>

              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                ClassPass is a mobile product at its core. Members open the app between meetings, in the locker room, on the walk to a 6am spin class. But the existing UI carried years of accessibility debt: low-contrast text, tap targets too small for a moving screen, typography that didn&apos;t respect Dynamic Type settings.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Fixing it screen by screen would take years. The more efficient answer was further upstream. Build the system that makes every screen better, by default. Mobile is the foundational step. A design system is the most efficient way to get there.
              </p>

              <PullQuote>Design systems are the most efficient path to gradual, lasting impact.</PullQuote>
            </div>

            {/* Solution */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48 }}>
              <p style={labelStyle}>The Solution</p>
              <h2 style={h2Style}>Meet Hercules.</h2>

              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Hercules is ClassPass&apos;s first unofficial design system: a mobile-first library of tokens, components, and documentation built to scale with the product.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                The name carries three meanings we kept coming back to. The twelve trials of Hercules represent the nature of the work itself: nothing worth building is easy, and a design system is a long game that requires sustained conviction.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                The more resonant angle is Hercules&apos; descent from god to human. In mythology, he gives up divinity to live among people. ClassPass runs the same direction: it takes boutique fitness, the kind that once required a dedicated studio membership and a premium price, and opens it to anyone. The system that powers that product should carry the same spirit.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                The third is the most practical. Strength. A design system is what lets a product team move faster, build more consistently, and ship work they can stand behind.
              </p>

              <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
                <img
                  src="/assets/hercules-hero.png"
                  alt="Hercules UI Kit cover"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
                <StatCard
                  title="Impact"
                  items={[
                    'First shared source of truth for design and engineering at ClassPass',
                    'Accessibility built into every token, component, and usage guideline from the start',
                    'Contribution model so the system can grow without becoming a bottleneck',
                    'Pitched to class standing in as ClassPass C-suite: documented, presented, and shipped',
                  ]}
                />
                <StatCard
                  title="My Contribution"
                  items={[
                    'Led typography system end-to-end: font selection, scale structure, and expanded label weights for media-heavy use cases',
                    'Designed components including tabs, navigation, carousels, filter patterns, and text cards from atom to documented component',
                    'Built and designed the Zeroheight documentation site: cover page, site structure, and dos and don\'ts guidelines across component pages',
                    'Ran quality control passes before each milestone, catching token mismatches and naming inconsistencies before they shipped',
                  ]}
                />
              </div>

              {/* What I contributed — numbered breakdown */}
              <p style={{ ...labelStyle, marginBottom: 24 }}>What I contributed</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {[
                  {
                    num: '01',
                    title: 'Typography System',
                    body: 'Selected Avenir as the system font, built the three-category type scale covering headings, labels, and paragraphs, and expanded the label weight options after the first pass proved too limited for ClassPass\'s media-dense interfaces.',
                  },
                  {
                    num: '02',
                    title: 'Components',
                    body: 'Designed tabs, navigation, carousels, filter patterns, and text cards. Each component went from audit to atom to a fully documented, interactive Figma component ready for use.',
                  },
                  {
                    num: '03',
                    title: 'Documentation',
                    body: 'Designed the Zeroheight cover page and overall site structure so the documentation felt consistent with the system itself. Wrote and added dos and don\'ts guidelines to component pages across the library.',
                  },
                  {
                    num: '04',
                    title: 'Quality Control',
                    body: 'Ran a detail pass before each milestone. Token naming drift, inconsistent spacing, misaligned component states: these are the small things that compound into large problems if they ship unchecked.',
                  },
                ].map(({ num, title, body }) => (
                  <div key={num} style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 20 }}>
                    <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-warm-accent)', marginBottom: 8 }}>{num}</p>
                    <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 10 }}>{title}</p>
                    <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-warm-muted)', fontFamily: SANS }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── DECONSTRUCTION ── */}
          <section id="deconstruction" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Deconstruction</p>
            <h2 style={h2Style}>Know the body before you train it.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              You can&apos;t design a system without first understanding what already exists. Before writing a single token or building a single component, we audited the entire ClassPass mobile app in Figma, screenshotting every unique UI element and sorting them into ten categories.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              The categories: typography, color, media, buttons, carousels, forms, navigation, illustrations, interactive components, and blocks. What came out of the audit was less a neat taxonomy and more a diagnosis. Patterns repeated with subtle inconsistencies, and components built from scratch that already existed three screens ago.
            </p>

            <video
              src="/assets/deconstruction.mov"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 8 }}
            />
            <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 8, marginBottom: 32, fontFamily: SANS }}>
              ClassPass mobile UI inventory: 10 component categories mapped in Figma
            </p>

            <img
              src="/assets/hercules-deconstruction.png"
              alt="ClassPass deconstruction board"
              style={{ width: '100%', borderRadius: 8, display: 'block' }}
            />
            <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 10, fontFamily: SANS }}>
              The full audit board: navigation, color, typography, media, buttons, carousels, blocks, interactive components, illustrations, and forms
            </p>
          </section>

          {/* ── TOKEN SYSTEM ── */}
          <section id="token-system" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Token System</p>
            <h2 style={h2Style}>Start with the reps. Adjust the program.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              Tokens are the smallest units of a design system: color values, type sizes, spacing, corner radii. Change a token once, and every component built on top of it updates automatically. That is the whole promise.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              We organized tokens into three layers: primitive, semantic, and component tokens. Primitive tokens hold raw values. Semantic tokens assign meaning to those values, like using a primitive blue as an interactive color. Component tokens pull from semantic ones and define specific usage rules within a component. This structure means a color rebrand or a spacing adjustment touches only the primitive layer, and everything above it updates cleanly.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              We started the spacing scale at 8, 16, and 32, mapped to semantic weights 100, 200, and 300. Easy to reason about, easy to apply.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              Then we started building actual mobile components and hit the edges. Mobile layouts are tighter than desktop. The gap between an icon and its label, the inner padding on a chip, the margin before a section divider: none of those fit neatly into an 8pt grid. We expanded to include 2, 4, and 12. Border radius needed the same treatment. A full-bleed sheet, a button, and a chip all live very differently in space, and &ldquo;medium&rdquo; was not a specific enough answer.
            </p>

            <VisualBlock
              label="Token architecture: primitive scale (2 / 4 / 8 / 12 / 16 / 32) → semantic naming → component usage"
              caption="Token structure: raw values map to semantic names, which feed into every component in the system"
              aspect="16/7"
            />
          </section>

          {/* ── ATOMS → ORGANISMS ── */}
          <section id="atoms-organisms" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Component System</p>
            <h2 style={h2Style}>From 10lb to 100lb.</h2>

            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              We built Hercules following atomic design: atoms (icons, inputs, labels) up through molecules and components to organisms (navigation bars, class cards, booking sheets). The real work was not the hierarchy. It was making each level genuinely useful rather than technically correct.
            </p>

            <p style={{ ...labelStyle, marginBottom: 24 }}>Important design decisions I made along the way</p>

            <CalloutCard title="01 — Typography">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                ClassPass uses a proprietary font we could not replicate, so I chose Avenir as a substitute. Avenir reads clearly at small sizes without feeling generic. It is more dynamic than Inter, without the personality of something like Circular or Tiempos.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                The type system has three categories: headings, labels, and paragraphs. Labels were the interesting challenge. The first pass only had a bold weight, which was enough for primary section labels. But ClassPass is dense with video thumbnails, studio metadata, and list items where bold felt heavy and paragraph felt too light.
              </p>
              <p style={{ ...bodyStyle }}>
                I added medium and subtle weights. That gave designers a vocabulary to distinguish a section label from a caption from an inline detail, without reaching outside the system every time ClassPass needed to show studio distance, ratings, or class duration alongside richer content.
              </p>
            </CalloutCard>

            <CalloutCard title="02 — Navigation and Tabs">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                Navigation and tabs are two of the highest-traffic components in any mobile app. Because they appear on nearly every screen, inconsistencies in them are immediately visible.
              </p>
              <p style={{ ...bodyStyle }}>
                I built both with full interactive state coverage: default, active, hover, disabled. Tabs in particular needed careful attention to how the selected state communicated without relying on color alone, to stay accessible at the token level rather than requiring manual overrides later.
              </p>
            </CalloutCard>

            <CalloutCard title="03 — Carousels and Filter Patterns">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                Carousels are one of ClassPass&apos;s most used patterns for surfacing class options and studio recommendations. The challenge was building a carousel component flexible enough to hold different card types without requiring designers to rebuild it from scratch each time.
              </p>
              <p style={{ ...bodyStyle }}>
                Filter patterns required a similar approach. Filters on ClassPass are contextual: they change depending on which page you&apos;re on and what you&apos;re browsing. I built them as composable components so the pattern could be reused across contexts without losing consistency.
              </p>
            </CalloutCard>

            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48 }}>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.3 }}>
                Component or pattern?
              </h3>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                The harder question was not how to build components. It was what deserved to be one. We ran into this most with cards.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Our first pass put everything card-shaped into a single component category: text cards, class cards with thumbnails, studio cards with ratings and distance. But they have very different complexity levels. A text card is literally just text with some padding, simple, stable, reusable. A class card has media, metadata, an action row, and conditional states for full classes and recently viewed ones.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                We split them. Text cards stayed as components. Cards with media and metadata moved into patterns: more opinionated compositions of smaller pieces that designers can adapt rather than instances they override.
              </p>

              <PullQuote>Components stay stable. Patterns stay flexible.</PullQuote>

              <VisualBlock
                label="Component vs. pattern: text card (component) vs. class card with media and metadata (pattern)"
                caption="Splitting simple from complex: stable components for text, composable patterns for media-rich cards"
                aspect="16/8"
              />
            </div>
          </section>

          {/* ── CHALLENGES ── */}
          <section id="challenges" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Challenges</p>
            <h2 style={h2Style}>Every system has growing pains.</h2>

            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              We hit the predictable problems and a few we did not see coming.
            </p>

            {/* File migration: the most compelling challenge, gets full narrative treatment */}
            <CalloutCard title="The file migration that broke everything">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                We had our first complete iteration of the system ready to test. The problem was the Figma file itself: it was full of reference notes, scratchpad frames, and early explorations that made it hard to read as a published library. The sensible thing seemed to be migrating everything into a clean new file.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                So we did. And immediately broke everything. In Figma, when you move components to a new file, the root component reference changes. Any instance across the product that pointed to the old library is now pointing at nothing. Every component was disconnected. Every override, gone.
              </p>
              <p style={{ ...bodyStyle }}>
                We had to reverse it: designate the old messy file as the master and use the new clean file as the outward-facing export. We lost all of our in-file comments and annotations in the process. The lesson: never migrate out of the master file. Clean up around it, not inside it.
              </p>
            </CalloutCard>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
              <ChallengeCard
                title="Token naming: dashes vs. camelCase"
                body="My tokens used dashes (token-like-this). My teammate's used camelCase (tokenLikeThis). Neither of us caught it until we were deep enough that fixing it required touching everything. We standardized on dashes, then went back through every token, component, and documentation page to fix what we had already shipped."
              />
              <ChallengeCard
                title="Naming every component"
                body='"Card" was too generic. "ClassCardWithRatingAndDistanceInlineVariant" was too specific. Finding names that were short, unambiguous, and actually scannable in a Figma panel took more iteration than expected. The problem compounds across every atom, component, and pattern in the system.'
              />
            </div>
          </section>

          {/* ── TESTING ── */}
          <section id="testing" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Testing</p>
            <h2 style={h2Style}>A system is only as useful as it is for someone who did not build it.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              We brought in designers from our network to work through the Hercules UI kit directly, building ClassPass screens from scratch without guidance from us. The goal was to find where the system broke down before we shipped it.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              I facilitated the test sessions and documented every friction point, from components that were hard to find to spacing that behaved unexpectedly when composing layouts.
            </p>

            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <img
                src="/assets/hercules/hercules-testing.jpeg"
                alt="Ha facilitating a usability test session with the Hercules UI kit"
                style={{ width: '100%', borderRadius: 8, display: 'block' }}
              />
              <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 10, fontFamily: SANS }}>
                Testing the Hercules UI kit with designers from our network
              </p>
            </div>

            <p style={{ ...labelStyle, marginBottom: 24, marginTop: 48 }}>Key iteration decisions</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 24 }}>
                <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 10 }}>
                  Restyled component labels for clarity
                </p>
                <p style={{ ...bodyStyle }}>
                  The frame headings we used to organize the Figma library were styled similarly to the component content below them. When testers first opened the file, they could not tell which frames were navigational labels and which were selectable components. We restyled all component headings to be visually distinct from the components themselves, making the library significantly easier to scan and navigate without external instruction.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 24 }}>
                <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 10 }}>
                  Standardized margins out of components
                </p>
                <p style={{ ...bodyStyle }}>
                  Because we built different parts of the library in parallel, we had inconsistent margin conventions across components. Some included their own margins. Others did not. When testers tried to compose screens, spacing felt uneven and hard to predict: content was not stretching to the edges the way they expected, and the gap between components varied with no clear logic. We resolved it by agreeing on a single rule: margins live in the layout, not the component. Every component was updated to ship without built-in margins, and the difference in composability was immediate.
                </p>
              </div>
            </div>
          </section>

          {/* ── DOCUMENTATION ── */}
          <section id="documentation" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Documentation</p>
            <h2 style={h2Style}>The manual for something that never stops growing.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              A design system without documentation is just a folder of files with good intentions. Docs are what turn a component library into something teams actually trust to use without asking.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              We built the Hercules docs on Zeroheight, a platform purpose-built for design system documentation. Its editor let us build and iterate quickly, keeping documentation aligned with the evolving UI kit without a separate publishing workflow.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              Beyond the structure, I designed the cover page and the visual language for the site. The documentation needed to feel like a product, not an afterthought. If the UI kit is polished but the docs look generic, teams will trust the system less before they have even opened a component.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              Every component page follows the same structure: overview, anatomy, usage guidelines, specs, and dos and don&apos;ts. I added dos and don&apos;ts guidelines across the board after seeing how often components get misused without explicit guardrails. A button used as a link, a label dropped into a heading slot, a card stretched beyond its intended width. Those are the errors that erode consistency quietly over time, and clear guidance is what prevents them from compounding.
            </p>

            <div style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid var(--color-warm-border)' }}>
              <div style={{ background: '#f0f0f0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
                <div style={{ flex: 1, background: '#e0e0e0', borderRadius: 4, height: 20, marginLeft: 8 }} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <video
                  src="/assets/hercules/hercules-zeroheight.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', display: 'block', transform: 'scale(1.08)', transformOrigin: 'top center' }}
                />
              </div>
            </div>
          </section>

          {/* ── OUTCOME ── */}
          <section id="outcome" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Outcome</p>
            <h2 style={h2Style}>Shipped, documented, and pitched.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              The final deliverable was three artifacts: a Figma UI kit, a Zeroheight documentation site, and a pitch to our class standing in as ClassPass&apos;s C-suite.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              The presentation covered our full process from audit to system, demonstrated the UI kit on real ClassPass screens, and walked through the Zeroheight docs live. We framed Hercules as a business investment, not just a design tool, which shaped how we talked about impact, timeline, and governance throughout the deck.
            </p>

            <div style={{ marginBottom: 40 }}>
              <a
                href="https://www.figma.com/deck/d59c9s6yViodN1VdlcbQGz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  background: 'var(--color-warm-text)',
                  color: '#F7F7F7',
                  borderRadius: 6,
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                }}
              >
                View pitch deck
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <VisualBlock
              label="Figma: pitch slides — UI kit demo and Zeroheight walkthrough presented to ClassPass C-suite"
              caption="The final presentation: component demos, documentation tour, and contribution guidelines"
              aspect="16/9"
            />

            <p style={{ ...bodyStyle, marginBottom: 32, marginTop: 56 }}>
              The response from the product design team was strong. Feedback included:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FeedbackQuote quote="I love the roadmap, it helps us as executives understand the logistics of the project." />
              <FeedbackQuote quote="Your presentation structure was really clear, especially your business impacts from having the system is super strong!" />
              <FeedbackQuote quote="The visual design of the deck is amazing!" />
            </div>

            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <img
                src="/assets/hercules/hercules-team.JPG"
                alt="The Hercules team after the final presentation"
                style={{ width: '100%', borderRadius: 8, display: 'block' }}
              />
              <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 10, fontFamily: SANS }}>
                The Hercules team after the final presentation
              </p>
            </div>

            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-warm-muted)', fontFamily: SANS, marginTop: 24 }}>
              It is worth noting that this presentation was delivered as a course final. Classmates took on the role of ClassPass stakeholders and gave critiques on both the product and the presentation, offering perspectives on clarity, usability, and adoption.
            </p>
          </section>

          {/* ── NEXT STEPS ── */}
          <section id="next-steps" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Next Steps</p>
            <h2 style={h2Style}>Version 1 released. Imagining the future of Hercules.</h2>

            <p style={{ ...bodyStyle, marginBottom: 48 }}>
              Hercules version 1 covers ClassPass&apos;s core mobile UI. The next phase is about expanding scope and closing the gap between platforms.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 24, display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24 }}>
                <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-warm-accent)', paddingTop: 4 }}>01</p>
                <div>
                  <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 12 }}>
                    Expand to the full mobile app
                  </p>
                  <p style={{ ...bodyStyle }}>
                    Version 1 focused on the core screens and most common components. A natural next step is auditing the rest of the mobile app for patterns we did not capture: edge-case states, specialized flows, and screen types that exist outside the main booking experience. Every screen that still relies on ad-hoc design decisions is a place the system can reduce future work.
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 24, display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24 }}>
                <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-warm-accent)', paddingTop: 4 }}>02</p>
                <div>
                  <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: 'var(--color-warm-text)', marginBottom: 12 }}>
                    Consolidate with the ClassPass website
                  </p>
                  <p style={{ ...bodyStyle }}>
                    The ClassPass web and mobile products are visually inconsistent today: different spacing conventions, different typographic decisions, different interaction patterns. A unified design system that spans both platforms would give designers and developers a single source of truth, and close a gap that is currently visible to every user who moves between them.
                  </p>
                </div>
              </div>
            </div>

            <VisualBlock
              label="Figma: Hercules product roadmap — version 1 coverage and proposed phase 2 expansion"
              caption="A roadmap for growing the system beyond its initial release"
              aspect="16/7"
            />
          </section>

          {/* ── RETROSPECTIVE ── */}
          <section id="retrospective" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Retrospective</p>
            <h2 style={h2Style}>What the training actually taught me.</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  A design system is never done. You have to govern it like it is not.
                </h3>
                <p style={{ ...bodyStyle }}>
                  We built Hercules to a shippable, well-documented state. But what the project really taught me was that the harder problem is not building the system. It is keeping it coherent over time. Who owns a token decision? Who reviews new components? What happens when two teams solve the same pattern independently? Those questions need answers before the system is real. Building Hercules made me think about governance the way a product team should: not as a restriction, but as the thing that lets everyone move faster.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  We could have gone further up the stack.
                </h3>
                <p style={{ ...bodyStyle }}>
                  Hercules focused on rebuilding the foundation: tokens, atoms, the core component set. That was the right first step. But looking back, more of the visible consistency impact would have come from going higher, building shared patterns for how cards, sheets, and flows actually compose together. The atoms are solid. The organisms are where the product would have started to feel genuinely unified rather than just cleaned up.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  Bad naming hurts from the other side of the handoff.
                </h3>
                <p style={{ ...bodyStyle }}>
                  Before Hercules, I named things however felt right in the moment. After spending weeks reconciling two different naming conventions and going back through every token to fix the inconsistency, I think about naming differently. Every name I write now I test against the same questions: would a developer find this? Would I recognize it six months from now? Going through the pain of fixing a broken convention made me more conscious of building a thoughtful one from the start.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>

      {/* ── TEAM ── */}
      <div style={{ ...CENTERED, paddingBottom: 160 }}>
        <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 80 }}>
          <p style={labelStyle}>About the Team</p>
          <h2 style={{ ...h2Style, marginBottom: 24 }}>Couldn&apos;t have done it without my team.</h2>
          <p style={{ ...bodyStyle, marginBottom: 48 }}>
            Working with Anvita, Simran, and Matthew for a full semester was both productive and genuinely fun. Everyone brought the same level of care to the work, ideas were exchanged freely, and we kept each other accountable at every stage. The strong team dynamic made the collaboration easy and the system stronger.
          </p>

          <div style={{ marginTop: 32, marginBottom: 32 }}>
            <img
              src="/assets/hercules/hercules-team.JPG"
              alt="Ha Do, Anvita Shah, Simran Kaur, Matthew Thien after the Hercules final presentation"
              style={{ width: '100%', borderRadius: 8, display: 'block' }}
            />
            <p style={{ fontSize: 12, color: 'var(--color-warm-muted)', marginTop: 10, fontFamily: SANS }}>
              Ha Do · Anvita Shah · Simran Kaur · Matthew Thien
            </p>
          </div>
        </div>
      </div>

    </article>
  )
}
