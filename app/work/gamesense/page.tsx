'use client'

import { useEffect, useState } from 'react'

// ── Nav config ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',              label: 'Overview' },
  { id: 'why-this-project',      label: 'Why This Project' },
  { id: 'defining-the-problem',  label: 'Defining the Problem' },
  { id: 'notable-iterations',    label: 'Notable Iterations' },
  { id: 'final-designs',         label: 'Final Designs' },
  { id: 'retrospective',         label: 'Retrospective' },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function Placeholder({ label, ratio, id }: { label: string; ratio: string; id: string }) {
  return (
    <div
      data-placeholder={id}
      className={`${ratio} w-full bg-gray-200 rounded-md flex items-center justify-center my-8`}
    >
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-4">
      {text}
    </p>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h3 className="font-[family-name:var(--font-serif)] text-xl text-warm-text mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}

function SideNavItem({ item, active }: { item: typeof NAV_ITEMS[0]; active: string }) {
  const isActive = active === item.id
  return (
    <li>
      <a
        href={`#${item.id}`}
        className={[
          'flex items-center gap-2 text-xs uppercase tracking-widest transition-colors duration-200',
          isActive
            ? 'text-warm-text font-medium'
            : 'text-warm-muted hover:text-warm-text',
        ].join(' ')}
      >
        <span className={isActive ? 'text-warm-accent' : 'text-warm-border'}>—</span>
        {item.label}
      </a>
    </li>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GameSensePage() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <article className="bg-warm-bg text-warm-text min-h-screen">

      {/* ── HERO BLOCK ── */}
      <header className="max-w-[1280px] mx-auto px-6 pt-20 pb-0 text-center">

        <Placeholder label="Hero shot" ratio="aspect-[16/10]" id="hero-shot" />

        <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl tracking-tight text-warm-text mt-12 mb-5">
          GameSense
        </h1>

        <p className="text-warm-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          A swipe-based game discovery feature for Conduit Gaming that transforms passive browsing
          into active, gamified exploration.
        </p>

        {/* Metadata row */}
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 pb-20 border-b border-warm-border">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-1">Timeline</p>
            <p className="text-warm-text text-sm">4 weeks (Apr – May 2026)</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-1">Role</p>
            <p className="text-warm-text text-sm">Solo UI/UX Designer (Contract)</p>
          </div>
          <div className="max-w-xs">
            <p className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-1">Outcome</p>
            <p className="text-warm-text text-sm leading-relaxed">
              Designed mobile + desktop hi-fi prototypes for engineering handoff, transforming a
              list-based dashboard into a gamified discovery interface.
            </p>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="max-w-[1280px] mx-auto px-6 mt-24 md:grid md:grid-cols-[200px_1fr] md:gap-20">

        {/* Left — sticky nav */}
        <nav className="hidden md:block" aria-label="Case study sections">
          <ul className="sticky top-24 space-y-5">
            {NAV_ITEMS.map(item => (
              <SideNavItem key={item.id} item={item} active={activeSection} />
            ))}
          </ul>
        </nav>

        {/* Right — content */}
        <div className="space-y-32 pb-40">

          {/* SECTION 1 — Overview */}
          <section id="overview">
            <SectionLabel text="Overview" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              What is Conduit Gaming?
            </h2>
            <p className="text-warm-text leading-[1.7] text-base">
              Conduit Gaming is a pre-seed startup building tools for gamers to discover, organize,
              and engage with games beyond traditional storefronts. Their existing product surfaced
              game recommendations through a list-based dashboard — passive, lookup-driven.
            </p>
            <Placeholder label="Existing dashboard" ratio="aspect-[16/10]" id="existing-dashboard" />
          </section>

          {/* SECTION 2 — Why This Project */}
          <section id="why-this-project">
            <SectionLabel text="Why This Project" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              Building a discovery experience that feels like play.
            </h2>
            <p className="text-warm-text leading-[1.7] text-base">
              The CEO wanted to evolve the dashboard into something gamified and gesture-based —
              borrowing the swipe-card pattern popularized by Tinder, but applied to game discovery.
              The hypothesis: active, gamified browsing would drive deeper exploration than passive
              scrolling. As a designer interested in interaction design for novel contexts, the
              project was a chance to interrogate when a familiar pattern fits a new domain — and
              when it doesn't.
            </p>
            <Placeholder label="Swipe pattern reference" ratio="aspect-[16/10]" id="swipe-references" />
          </section>

          {/* SECTION 3 — Defining the Problem */}
          <section id="defining-the-problem">
            <SectionLabel text="Initial Problem Discovery" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              How might I translate a familiar gestural pattern into a gaming context where user
              goals, mental models, and decision stakes differ from dating or content consumption?
            </h2>
            <p className="text-warm-text leading-[1.7] text-base">
              Unlike a self-driven research project, GameSense came with a defined scope from
              Conduit's CEO. My job wasn't to validate whether swipe discovery should exist — that
              decision was made — but to make it work as a coherent, intuitive, and ownable
              interaction system. Three open questions emerged early.
            </p>

            <SubSection title="#1 — Does Tinder's gesture vocabulary belong here?">
              <p className="text-warm-text leading-[1.7] text-base">
                In dating apps, swipe-right means commit, swipe-left means pass. In gaming, right
                often means next or forward — carousels, character select screens, level
                progression. Borrowing the convention had risks. So did breaking it.
              </p>
            </SubSection>

            <SubSection title="#2 — What does swipe become on desktop?">
              <p className="text-warm-text leading-[1.7] text-base">
                Swipe is touch-native. Translating it to mouse and keyboard isn't obvious —
                click-and-drag, hover-preview, keyboard arrows, and side-by-side comparison were
                all viable directions, each with different cognitive trade-offs.
              </p>
            </SubSection>

            <SubSection title="#3 — How do I gamify discovery without trivializing it?">
              <p className="text-warm-text leading-[1.7] text-base">
                Choosing a game to play is closer to Netflix browsing than to dating — the stakes
                are lower, but the decision quality matters more. The interaction had to feel
                playful without becoming dismissive.
              </p>
            </SubSection>
          </section>

          {/* SECTION 4 — Solution Highlights (no nav link) */}
          <section id="solution-highlights">
            <SectionLabel text="Solution Highlights" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-8">
              (psst…a sneak peek just for you: here's GameSense)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Placeholder label="Mobile swipe interaction" ratio="aspect-video" id="mobile-swipe" />
              <Placeholder label="Desktop equivalent" ratio="aspect-video" id="desktop-interaction" />
            </div>
          </section>

          {/* SECTION 5 — Notable Iterations */}
          <section id="notable-iterations">
            <SectionLabel text="Notable Iterations" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              Designing a system, not just a card.
            </h2>

            <SubSection title="Card visual language: from neutral to atmospheric">
              <p className="text-warm-text leading-[1.7] text-base">
                Early iterations of the card felt generic — a flat background with metadata stacked
                predictably. Three rounds of iteration explored saturation, gradient treatment, and
                edge handling. The middle version landed: a deeper purple gave the cosmic game art
                saturation to play against, the gradient fade into the text panel felt intentional,
                and the card edge dissolved cleanly into the canvas.
              </p>
              <Placeholder label="Card iterations" ratio="aspect-[16/10]" id="card-iterations" />
            </SubSection>

            <SubSection title="Swipe direction: convention vs. context">
              <p className="text-warm-text leading-[1.7] text-base">
                I weighed breaking the right=like convention against keeping it. Ultimately I kept
                the convention — cross-app familiarity from dating and discovery apps was doing more
                work than gaming-context dissonance was breaking. Strong visual feedback during drag
                (color wash, icon reveal) reinforces meaning in the first card. I documented the
                alternatives — vertical swipe, asymmetric gestures, three-way — as future
                explorations.
              </p>
              <Placeholder label="Swipe direction options" ratio="aspect-[16/10]" id="swipe-directions" />
            </SubSection>

            <SubSection title="Mobile-to-desktop translation">
              <p className="text-warm-text leading-[1.7] text-base text-warm-muted italic">
                [Placeholder — fill in with the actual approach you chose for desktop interaction.]
              </p>
              <Placeholder label="Mobile vs desktop" ratio="aspect-[16/10]" id="mobile-vs-desktop" />
            </SubSection>
          </section>

          {/* SECTION 6 — Final Designs */}
          <section id="final-designs">
            <SectionLabel text="Final Designs" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              A swipe loop that respects both convention and context.
            </h2>
            <p className="text-warm-text leading-[1.7] text-base mb-10">
              GameSense delivers the gamified discovery feel Conduit asked for while introducing
              thoughtful deviations where the gaming context demanded them.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Placeholder label="Mobile default state" ratio="aspect-[16/10]" id="final-default" />
              <Placeholder label="Mid-swipe state"      ratio="aspect-[16/10]" id="final-mid-swipe" />
              <Placeholder label="Paywall"              ratio="aspect-[16/10]" id="final-paywall" />
              <Placeholder label="Desktop version"      ratio="aspect-[16/10]" id="final-desktop" />
            </div>

            {/* Callout lines */}
            <div className="mt-16 space-y-6 border-t border-warm-border pt-12">
              {[
                'Familiar gesture, atmospheric card.',
                'A state system that handles the full discovery loop.',
                'Freemium gating that feels like a feature, not a wall.',
              ].map(line => (
                <p
                  key={line}
                  className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl text-warm-text italic leading-snug"
                >
                  "{line}"
                </p>
              ))}
            </div>
          </section>

          {/* SECTION 7 — Retrospective */}
          <section id="retrospective">
            <SectionLabel text="Retrospective" />
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-warm-text mb-6">
              What I'd carry forward.
            </h2>
            <p className="text-warm-muted leading-[1.7] text-base italic">
              [Placeholder — to be written. Will cover: what working solo in pre-seed taught me,
              what coursework prepared me for vs. didn't, and what I'd do differently — likely
              earlier user testing on the convention question.]
            </p>
          </section>

        </div>
      </div>
    </article>
  )
}
