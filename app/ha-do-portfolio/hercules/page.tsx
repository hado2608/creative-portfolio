'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',          label: 'Overview' },
  { id: 'deconstruction',    label: 'Deconstruction' },
  { id: 'token-system',      label: 'Token System' },
  { id: 'atoms-organisms',   label: 'Atoms → Organisms' },
  { id: 'challenges',        label: 'Challenges' },
  { id: 'documentation',     label: 'Documentation' },
]

// ── Shared styles ─────────────────────────────────────────────────────────────

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
  letterSpacing: '-0.01em',
  color: 'var(--color-warm-text)',
  marginBottom: 8,
}

const labelStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-warm-muted)',
  marginBottom: 12,
}

const bodyStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.75,
  color: 'var(--color-warm-body)',
  letterSpacing: '0.02em',
}

// ── Reusable components ───────────────────────────────────────────────────────

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={labelStyle}>{label}</p>
      <h2 style={h2Style}>{title}</h2>
      <p style={{ fontFamily: SANS, fontSize: 15, fontStyle: 'italic', color: 'var(--color-warm-muted)', marginTop: 4 }}>
        {subtitle}
      </p>
    </div>
  )
}

function TwoColumn({ left, right, gap = 40 }: { left: React.ReactNode; right: React.ReactNode; gap?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

function VisualBlock({ label, caption, aspect = '16/9' }: { label: string; caption?: string; aspect?: string }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <div style={{ background: '#e2e5ea', borderRadius: 8, aspectRatio: aspect, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#9ba3af' }}>{label}</span>
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
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-text)', marginBottom: 20 }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.6, color: 'var(--color-warm-text)' }}>
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
      margin: '40px 0',
      fontFamily: SERIF,
      fontSize: 'clamp(20px, 2.5vw, 26px)',
      fontStyle: 'italic',
      lineHeight: 1.4,
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
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ flex: 1, background: '#e0e0e0', borderRadius: 4, height: 20, marginLeft: 8 }} />
      </div>
      <div style={{ background: '#e2e5ea', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#9ba3af' }}>{label}</span>
      </div>
    </div>
  )
}

function ChallengeCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13, color: 'var(--color-warm-text)' }}>{title}</p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-warm-muted)' }}>{body}</p>
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
          gap: 8,
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: SANS,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: isActive ? 'var(--color-warm-text)' : 'var(--color-warm-muted)',
          fontWeight: isActive ? 600 : 500,
          transition: 'color 200ms',
          textAlign: 'left',
          lineHeight: 1.4,
        }}
      >
        <span style={{ display: 'inline-block', width: 16, flexShrink: 0, color: isActive ? 'var(--color-warm-accent)' : 'transparent' }}>—</span>
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
      <header style={{ ...CENTERED, height: '100vh', paddingTop: 80, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, minHeight: 0, background: '#e2e5ea', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 13, color: '#b0b5be' }}>Component mosaic</span>
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--color-warm-border)' }}>
          {/* Left: title + tagline */}
          <div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-warm-text)', marginBottom: 16 }}>
              Hercules
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.75, color: 'var(--color-warm-body)' }}>
              A mobile-first design system for ClassPass — lifting the foundations so the product can grow stronger.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            {[
              { label: 'Role',     value: 'Lead Systems Designer' },
              { label: 'Timeline', value: '6 months' },
              { label: 'Team',     value: 'Design + Engineering' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-text)', marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 14, color: 'var(--color-warm-body)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      {/* Mobile nav placeholder — hidden until designed */}
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
            <SectionHeading label="Overview" title="Background" subtitle="Warming up" />

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              ClassPass is the world's largest fitness and wellness marketplace, connecting members
              to studios, gyms, salons, and spas across 30+ countries. As the product has scaled,
              so has the complexity behind it.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 56 }}>
              Unlike many products at this scale, ClassPass had no public-facing design system.
              Components lived in scattered Figma files, tokens were inconsistent, and every new
              feature meant rebuilding patterns from memory. The result: visual drift, slow
              handoffs, and accessibility gaps quietly piling up.
            </p>

            {/* Problem */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48, marginBottom: 48 }}>
              <SectionHeading label="The Problem" title="Where it hurts" subtitle="Where it hurts" />
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                ClassPass is a mobile-first product. Members open the app in the back of an Uber,
                between meetings, in the locker room. But the existing UI carried a lot of
                accessibility debt: low-contrast text, inconsistent tap targets, casing rules that
                confused screen readers, and font sizes that didn't respect Dynamic Type.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                Fixing screen by screen would have taken years. We needed a foundational solution —
                something that would let every team ship more accessible, more consistent product,
                by default.
              </p>
              <PullQuote>So we started where it mattered most: mobile.</PullQuote>
            </div>

            {/* Solution */}
            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48 }}>
              <SectionHeading label="The Solution" title="Meet Hercules" subtitle="Meet Hercules" />
              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                Hercules is ClassPass's first design system: a mobile-first library of tokens,
                components, and documentation built to scale across the product.
              </p>

              <VisualBlock label="Hercules overview — system spread" caption="Hero visual: design system overview" aspect="21/9" />

              <TwoColumn
                gap={24}
                left={
                  <StatCard
                    title="Impact"
                    items={[
                      'First shared source of truth for design and engineering at ClassPass',
                      'Documented accessibility rules across every text token, color, and component',
                      'Cut component build time from days to hours',
                      'Contribution model so the system can grow without bottlenecking',
                    ]}
                  />
                }
                right={
                  <StatCard
                    title="My Contribution"
                    items={[
                      'Led typography foundations end-to-end — scale, weights, line height, casing rules',
                      'Designed and documented components from atom to organism',
                      'Built the Zeroheight documentation structure',
                      'Wrote the contribution and help & support guidelines',
                    ]}
                  />
                }
              />
            </div>
          </section>

          {/* ── DECONSTRUCTION ── */}
          <section id="deconstruction" style={{ marginBottom: 128 }}>
            <SectionHeading
              label="Deconstruction"
              title="Knowing the body before training it"
              subtitle="Knowing the body before training it"
            />

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              You can't program a workout without understanding anatomy. Same goes for a design
              system: before building anything, we had to break the existing product down to its
              parts. What components repeated? Which patterns were duplicated with subtle
              differences? What was actually a system, and what was a one-off?
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              We audited every screen in the ClassPass app, cataloguing every button, card, banner,
              and sheet — then mapped them against each other to find the real shared DNA.
            </p>

            <VisualBlock
              label="Annotated screenshot collage — component audit"
              caption="Component audit across the ClassPass app, cataloguing repeated patterns"
              aspect="16/9"
            />
          </section>

          {/* ── TOKEN SYSTEM ── */}
          <section id="token-system" style={{ marginBottom: 128 }}>
            <SectionHeading
              label="Token System"
              title="Start light. Adjust as you go."
              subtitle="Start light. Adjust as you go."
            />

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              Tokens are the smallest unit of the system — colors, type sizes, spacing values,
              radii. They're the base reps you build everything else on top of.
            </p>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              We drafted our first token set early, mapping primitives (raw values like{' '}
              <code style={{ fontFamily: 'monospace', fontSize: 14, background: '#f0ede8', padding: '2px 6px', borderRadius: 3 }}>#1A1A1A</code>
              {' '}or{' '}
              <code style={{ fontFamily: 'monospace', fontSize: 14, background: '#f0ede8', padding: '2px 6px', borderRadius: 3 }}>16px</code>)
              to semantic tokens (purposeful names like{' '}
              <code style={{ fontFamily: 'monospace', fontSize: 14, background: '#f0ede8', padding: '2px 6px', borderRadius: 3 }}>text/primary</code>
              {' '}or{' '}
              <code style={{ fontFamily: 'monospace', fontSize: 14, background: '#f0ede8', padding: '2px 6px', borderRadius: 3 }}>paragraph/medium</code>).
              Change the primitive once, every component built on it updates automatically.
            </p>

            <VisualBlock
              label="Token diagram — primitive → semantic → component"
              caption="Token architecture: raw values map to semantic names, semantic names feed into components"
              aspect="16/7"
            />

            <p style={{ ...bodyStyle, marginBottom: 16 }}>
              But tokens aren't a one-and-done. As we built more components, we kept finding edges:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                'Spacing values needed more granularity for tight mobile layouts',
                'Border radius needed a wider range for everything from chips to full-bleed cards',
                'Some semantic tokens needed splitting — surface/default wasn\'t enough once we hit overlay sheets and modals',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', ...bodyStyle }}>
                  <span style={{ color: 'var(--color-warm-accent)', flexShrink: 0, marginTop: 2 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ ...bodyStyle }}>
              Every revision tightened the system. By the end, the token layer was less of a list
              and more of a flexible vocabulary.
            </p>
          </section>

          {/* ── ATOMS → ORGANISMS ── */}
          <section id="atoms-organisms" style={{ marginBottom: 128 }}>
            <SectionHeading
              label="Component System"
              title="From 10lb to 100lb"
              subtitle="From 10lb to 100lb"
            />

            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              We followed atomic design — atoms (icons, inputs) → molecules (form fields, list items)
              → components (cards, banners) → organisms (carousels, sheets, navigation bars).
            </p>

            <VisualBlock
              label="Atomic hierarchy — Hercules component examples"
              caption="Component hierarchy from atom to organism, with Hercules examples at each level"
              aspect="16/9"
            />

            <div style={{ background: '#fff', borderRadius: 8, padding: '28px 32px', borderLeft: '3px solid var(--color-warm-accent)', margin: '40px 0' }}>
              <p style={{ ...bodyStyle }}>
                <strong>Typography lead:</strong> I led the design of typography — Avenir, four
                weights, a type scale built for mobile, and a unified 130% line height. Casing rules
                (sentence case as default) came from accessibility research into how screen readers
                handle ALL CAPS.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-warm-border)', paddingTop: 48, marginTop: 48 }}>
                      <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.3 }}>
                Component vs. component group
              </h3>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                One of the harder questions: where does a "component" end and a "component group"
                begin? Is a card with a thumbnail, title, and metadata one component, or a
                composition of three?
              </p>
              <p style={{ ...bodyStyle, marginBottom: 32 }}>
                We iterated multiple times. Some components were too granular — designers had to
                assemble five pieces every time. Others were too rigid — a single locked component
                couldn't flex.
              </p>

              <VisualBlock
                label="Class card iterations — over-modular → too rigid → final"
                caption="Three rounds of iteration on the class card: disaggregated, locked, and final balanced version"
                aspect="16/8"
              />

              <PullQuote>Molecules stay flexible. Organisms stay opinionated.</PullQuote>
            </div>
          </section>

          {/* ── CHALLENGES ── */}
          <section id="challenges" style={{ marginBottom: 128 }}>
            <SectionHeading
              label="Challenges"
              title="The DOMS phase"
              subtitle="The DOMS phase"
            />

            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              Every case study has a "we shipped it and everyone loved it" section. Ours had a lot
              of "we shipped it and immediately had to rename everything" first.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <ChallengeCard
                title="Naming conventions"
                body="Files mixed kebab-case, camelCase, and PascalCase. Inconsistency made the system feel unprofessional and broke developer handoff. We standardized on one convention — then went back through every file to fix what we'd already shipped."
              />
              <ChallengeCard
                title="Naming every component"
                body={'`Card` is too generic. `ClassCardWithRatingAndDistance` is too specific. Finding names that were short, descriptive, and unambiguous took more design hours than expected.'}
              />
              <ChallengeCard
                title="Cleaning up the system itself"
                body="The design system had its own design system problem — files weren't organized, components were duplicated, every reorganization risked breaking the dependency chain."
              />
              <ChallengeCard
                title="Files moving broke things"
                body="Reorganizing the Figma library meant breaking instances across the product. We learned (the hard way) to migrate carefully, with deprecation notices and overlap periods."
              />
            </div>
          </section>

          {/* ── DOCUMENTATION ── */}
          <section id="documentation" style={{ marginBottom: 128 }}>
            <SectionHeading
              label="Documentation"
              title="The training manual"
              subtitle="The training manual"
            />

            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              A system without docs is just a folder of files. Documentation is what turns a
              collection of components into something teams actually trust and use. We built the
              Hercules docs on Zeroheight — structured so designers and engineers could find
              anything in under thirty seconds.
            </p>

            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              Every component page follows the same structure: overview, anatomy, usage
              guidelines, specs, and a contribution path. No guessing whether the design or
              the code is the source of truth.
            </p>

            <BrowserFrame label="Zeroheight documentation — component page" />

            <div style={{ marginTop: 48, borderTop: '1px solid var(--color-warm-border)', paddingTop: 40 }}>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.3 }}>
                Contribution model
              </h3>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>
                One of the riskiest things for a young design system is becoming a bottleneck.
                If every new component has to go through one person, the system slows the product
                it's supposed to accelerate.
              </p>
              <p style={{ ...bodyStyle, marginBottom: 40 }}>
                We wrote a contribution guide that lets any designer propose, build, and ship new
                components — with a review process that keeps quality high without creating a
                gatekeeping dynamic.
              </p>

              <TwoColumn
                gap={24}
                left={
                  <StatCard
                    title="Documentation covers"
                    items={[
                      'Component anatomy and usage guidelines',
                      'Accessibility requirements per component',
                      'Token mapping and theming instructions',
                      'Contribution and review process',
                      'Help & support escalation paths',
                    ]}
                  />
                }
                right={
                  <StatCard
                    title="What we learned"
                    items={[
                      'Docs written by the system team get out of date fastest — make contribution easy',
                      'Engineers read specs differently than designers — write for both',
                      'A decision log is worth more than a change log',
                      '"Why" always matters more than "what" in guidelines',
                    ]}
                  />
                }
              />
            </div>

            <PullQuote>
              A design system doesn't ship when the last component is documented. It ships when
              the first team reaches for it by default.
            </PullQuote>
          </section>

        </div>
      </div>
    </article>
  )
}
