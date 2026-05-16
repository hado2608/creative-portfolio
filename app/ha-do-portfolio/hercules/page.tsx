'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'deconstruction',  label: 'Deconstruction' },
  { id: 'token-system',    label: 'Token System' },
  { id: 'atoms-organisms', label: 'Atoms → Organisms' },
  { id: 'challenges',      label: 'Challenges' },
  { id: 'documentation',   label: 'Documentation' },
  { id: 'final-product',   label: 'Final Product' },
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
            <span style={{ color: 'var(--color-warm-accent)', flexShrink: 0, marginTop: 2 }}>—</span>
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
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13, color: 'var(--color-warm-text)', marginBottom: 16, letterSpacing: '0.02em' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function ChallengeCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid var(--color-warm-border)' }}>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13, color: 'var(--color-warm-text)', letterSpacing: '0.02em' }}>{title}</p>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-warm-muted)', fontFamily: SANS, letterSpacing: '0.02em' }}>{body}</p>
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
          color: '#282828',
          fontWeight: isActive ? 700 : 500,
          lineHeight: 1.2,
          transition: 'font-weight 150ms',
          textAlign: 'left',
        }}
      >
        <span style={{
          display: 'inline-block',
          width: 26,
          height: 4,
          flexShrink: 0,
          maskImage: "url('/assets/template/nav-retangle.svg')",
          WebkitMaskImage: "url('/assets/template/nav-retangle.svg')",
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          backgroundColor: isActive ? '#5A77DF' : 'transparent',
          transition: 'background-color 150ms',
        }} />
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
              An unofficial design system for ClassPass — building the foundation that lets the product grow stronger.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'flex-end' }}>
            {[
              { label: 'Role',     value: 'Systems Designer — Typography lead' },
              { label: 'Timeline', value: 'One semester' },
              { label: 'Team',     value: 'Design + Engineering' },
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
            <h2 style={h2Style}>The world's largest fitness platform had no design system.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              ClassPass is the world's largest fitness and wellness marketplace — 30+ countries, millions of members booking studios, gyms, salons, and spas every day. As the product scaled, so did the complexity behind it.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 56 }}>
              But no one had built the infrastructure to match. Components lived in scattered Figma files. Tokens were inconsistent across platforms. Accessibility guidelines existed in a shared doc no one had opened in months. Every new feature meant rebuilding patterns from scratch, or from memory.
            </p>

            {/* Problem */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48, marginBottom: 56 }}>
              <p style={labelStyle}>The Problem</p>
              <h2 style={h2Style}>Mobile-first. Accessibility last.</h2>

              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                ClassPass is a mobile product at its core. Members open the app between meetings, in the locker room, on the walk to a 6am spin class. But the existing UI carried years of accessibility debt: low-contrast text, tap targets too small for a moving screen, typography that didn't respect Dynamic Type settings.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Fixing it screen by screen would take years. The more efficient answer was further upstream — build the system that makes every screen better, by default. Mobile is the foundational step. A design system is the most efficient way to get there.
              </p>

              <PullQuote>Design systems are the most efficient path to gradual, lasting impact.</PullQuote>
            </div>

            {/* Solution */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48 }}>
              <p style={labelStyle}>The Solution</p>
              <h2 style={h2Style}>Meet Hercules.</h2>

              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                Hercules is ClassPass's first unofficial design system — a mobile-first library of tokens, components, and documentation built to scale with the product. Named for the strength it was meant to give the team building it.
              </p>

              <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
                <img
                  src="/assets/hercules-hero.png"
                  alt="Hercules UI Kit cover"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <StatCard
                  title="Impact"
                  items={[
                    'First shared source of truth for design and engineering at ClassPass',
                    'Accessibility built into every token, component, and usage guideline from the start',
                    'Contribution model so the system can grow without becoming a bottleneck',
                    'Pitched to class standing in as ClassPass C-suite — documented, presented, and shipped',
                  ]}
                />
                <StatCard
                  title="My Contribution"
                  items={[
                    'Led typography system end-to-end — font selection, scale, weights, and casing rules',
                    'Expanded label token system to cover ClassPass\'s media-heavy use cases',
                    'Designed and documented components from atom to organism',
                    'Built contribution and documentation guidelines on Zeroheight',
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── DECONSTRUCTION ── */}
          <section id="deconstruction" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Deconstruction</p>
            <h2 style={h2Style}>Know the body before you train it.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              You can't design a system without first understanding what already exists. Before writing a single token or building a single component, we audited the entire ClassPass mobile app in Figma — screenshotting every unique UI element and sorting them into ten categories.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              The categories: typography, color, media, buttons, carousels, forms, navigation, illustrations, interactive components, and blocks. What came out of the audit was less a neat taxonomy and more a diagnosis — patterns repeated with subtle inconsistencies, and components built from scratch that already existed three screens ago.
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
              ClassPass mobile UI inventory — 10 component categories mapped in Figma
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
              Tokens are the smallest units of a design system — color values, type sizes, spacing, corner radii. Change a token once, and every component built on top of it updates automatically. That's the whole promise.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              We started with a clean spacing scale: 8, 16, 32 — mapped to semantic weights 100, 200, 300. Easy to reason about, easy to apply.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              Then we started building actual mobile components and hit the edges. Mobile layouts are tighter than desktop. The gap between an icon and its label, the inner padding on a chip, the margin before a section divider — none of those fit neatly into an 8pt grid. We expanded: 2, 4, and 12 joined the scale. Border radius needed the same treatment — a full-bleed sheet, a button, and a chip all live very differently in space, and "medium" wasn't a specific enough answer.
            </p>

            <VisualBlock
              label="Token architecture — primitive scale (2 / 4 / 8 / 12 / 16 / 32) → semantic naming → component usage"
              caption="Token structure: raw values map to semantic names, which feed into every component in the system"
              aspect="16/7"
            />
          </section>

          {/* ── ATOMS → ORGANISMS ── */}
          <section id="atoms-organisms" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Component System</p>
            <h2 style={h2Style}>From 10lb to 100lb.</h2>

            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              We built Hercules following atomic design — atoms (icons, inputs, labels) up through molecules and components to organisms (navigation bars, class cards, booking sheets). The real work wasn't the hierarchy. It was making each level genuinely useful rather than technically correct.
            </p>

            <CalloutCard title="Typography — Ha's section">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                ClassPass uses a proprietary font we couldn't replicate, so I chose Avenir as a substitute. Avenir reads clearly at small sizes without feeling generic — it's more dynamic than Inter, without the personality of something like Circular or Tiempos.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                The type system has three categories: headings, labels, and paragraphs. Labels were the interesting challenge. The first pass only had a bold weight — enough for primary section labels, but ClassPass is dense with video thumbnails, studio metadata, and list items where bold felt heavy and paragraph felt too light.
              </p>
              <p style={{ ...bodyStyle }}>
                I added medium and subtle weights. That gave designers a vocabulary to distinguish a section label from a caption from an inline detail, without reaching outside the system every time ClassPass needed to show studio distance, ratings, or class duration alongside richer content.
              </p>
            </CalloutCard>

            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48 }}>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.3 }}>
                Component or pattern?
              </h3>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                The harder question wasn't how to build components — it was what deserved to be one. We ran into this most with cards.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Our first pass put everything card-shaped into a single component category: text cards, class cards with thumbnails, studio cards with ratings and distance. But they have very different complexity levels. A text card is literally just text with some padding — simple, stable, reusable. A class card has media, metadata, an action row, and conditional states for full classes and recently viewed ones.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                We split them. Text cards stayed as components. Cards with media and metadata moved into patterns — more opinionated compositions of smaller pieces that designers can adapt rather than instances they override.
              </p>

              <PullQuote>Components stay stable. Patterns stay flexible.</PullQuote>

              <VisualBlock
                label="Component vs. pattern — text card (component) vs. class card with media + metadata (pattern)"
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
              We hit the predictable problems and a few we didn't see coming.
            </p>

            {/* File migration — the most compelling challenge, gets full narrative treatment */}
            <CalloutCard title="The file migration that broke everything">
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                We had our first complete iteration of the system ready to test. The problem was the Figma file itself: it was full of reference notes, scratchpad frames, and early explorations that made it hard to read as a published library. The sensible thing seemed to be migrating everything into a clean new file.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                So we did. And immediately broke everything. In Figma, when you move components to a new file, the root component reference changes — any instance across the product that pointed to the old library is now pointing at nothing. Every component was disconnected. Every override, gone.
              </p>
              <p style={{ ...bodyStyle }}>
                We had to reverse it: designate the old messy file as the master and use the new clean file as the outward-facing export. We lost all of our in-file comments and annotations in the process. The lesson: never migrate out of the master file. Clean up around it, not inside it.
              </p>
            </CalloutCard>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
              <ChallengeCard
                title="Token naming: dashes vs. camelCase"
                body="My tokens used dashes (token-like-this). My teammate's used camelCase (tokenLikeThis). Neither of us caught it until we were deep enough that fixing it required touching everything. We standardized on dashes — then went back through every token, component, and documentation page to fix what we'd already shipped."
              />
              <ChallengeCard
                title="Naming every component"
                body='"Card" was too generic. "ClassCardWithRatingAndDistanceInlineVariant" was too specific. Finding names that were short, unambiguous, and actually scannable in a Figma panel took more iteration than expected — and the problem compounds across every atom, component, and pattern in the system.'
              />
            </div>
          </section>

          {/* ── DOCUMENTATION ── */}
          <section id="documentation" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Documentation</p>
            <h2 style={h2Style}>The manual for something that never stops growing.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              A design system without documentation is just a folder of files with good intentions. Docs are what turn a component library into something teams actually trust to use without asking.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              We built the Hercules docs on Zeroheight. Every component page follows the same structure: overview, anatomy, usage guidelines, specs, and a path to contribute. No ambiguity about whether the Figma file or the doc is the source of truth — the doc always is.
            </p>

            <BrowserFrame label="Zeroheight — Hercules component documentation" />
          </section>

          {/* ── FINAL PRODUCT ── */}
          <section id="final-product" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Final Product</p>
            <h2 style={h2Style}>Shipped, documented, and pitched.</h2>

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              The final deliverable was three things: a Figma UI kit, a Zeroheight documentation site, and a pitch to our class standing in as ClassPass's C-suite — walking them through both.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              The presentation covered our full process from audit to system, showed the UI kit in use across real ClassPass screens, and walked through the Zeroheight docs live. Treating it as a real pitch — not just a class submission — made us hold the work to a higher standard throughout.
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
              label="Pitch slides — UI kit demo + Zeroheight walkthrough presented to ClassPass C-suite"
              caption="The final presentation: component demos, documentation tour, and contribution guidelines"
              aspect="16/9"
            />
          </section>

          {/* ── RETROSPECTIVE ── */}
          <section id="retrospective" style={{ marginBottom: 128 }}>
            <p style={labelStyle}>Retrospective</p>
            <h2 style={h2Style}>What the training actually taught me.</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  A design system is never done. You have to govern it like it isn't.
                </h3>
                <p style={{ ...bodyStyle }}>
                  We built Hercules to a shippable, well-documented state. But what the project really taught me was that the harder problem isn't building the system — it's keeping it coherent over time. Who owns a token decision? Who reviews new components? What happens when two teams solve the same pattern independently? Those questions need answers before the system is real. Building Hercules made me think about governance the way a product team should: not as a restriction, but as the thing that lets everyone move faster.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  We could have gone further up the stack.
                </h3>
                <p style={{ ...bodyStyle }}>
                  Hercules focused on rebuilding the foundation: tokens, atoms, the core component set. That was the right first step. But looking back, more of the visible consistency impact would have come from going higher — building shared patterns for how cards, sheets, and flows actually compose together. The atoms are solid. The organisms are where the product would have started to feel genuinely unified rather than just cleaned up.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 12, lineHeight: 1.3 }}>
                  Bad naming hurts from the other side of the handoff.
                </h3>
                <p style={{ ...bodyStyle }}>
                  Before Hercules, I named things however felt right in the moment. After spending weeks reconciling two different naming systems and going back through every token to fix the inconsistency, I think about naming differently. Every name I write now I test against the same questions: would a developer find this? Would I recognize it six months from now? Going through the pain of fixing a broken convention made me more conscious of building a thoughtful one from the start.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </article>
  )
}
