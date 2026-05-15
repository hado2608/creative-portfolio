'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',                  label: 'Overview' },
  { id: 'why-this-project',          label: 'Why This Project' },
  { id: 'initial-problem-discovery', label: 'Initial Problem Discovery' },
  { id: 'card-anatomy',              label: 'Card Anatomy' },
  { id: 'notable-iterations',        label: 'Notable Iterations' },
  { id: 'final-designs',             label: 'Final Designs' },
  { id: 'retrospective',             label: 'Retrospective' },
]

const CENTERED: React.CSSProperties = {
  maxWidth: 1400,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 40,
  paddingRight: 40,
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Placeholder({ label, ratio, id }: { label: string; ratio: string; id: string }) {
  return (
    <div
      data-placeholder={id}
      className={`${ratio} w-full bg-gray-200 rounded-md flex items-center justify-center`}
      style={{ marginTop: 32, marginBottom: 8 }}
    >
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginBottom: 32, lineHeight: 1.5 }}>
      {text}
    </p>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ marginBottom: 16, letterSpacing: '0.1em', fontSize: 11, textTransform: 'uppercase', fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, color: 'var(--color-warm-muted)' }}>
      {text}
    </p>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 56 }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 20, color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.4 }}>
        {title}
      </h3>
      {children}
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
          fontFamily: "'Neue Montreal', sans-serif",
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
        <span style={{
          display: 'inline-block',
          width: 16,
          flexShrink: 0,
          color: isActive ? 'var(--color-warm-accent)' : 'transparent',
        }}>—</span>
        {item.label}
      </button>
    </li>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GameSensePage() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.35
      let current = NAV_ITEMS[0].id
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <article style={{ background: 'var(--color-warm-bg)', color: 'var(--color-warm-body)', minHeight: '100vh' }}>

      <CaseStudyNav nextHref="/ha-do-portfolio/hercules" nextLabel="Next: Hercules" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, height: '100vh', paddingTop: 80, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Hero image */}
        <div
          id="hero-shot"
          style={{ flex: 1, minHeight: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}
        >
          <img
            src="/assets/conduit-hero.png"
            alt="GameSense hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--color-warm-border)' }}>
          {/* Left: title + description */}
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-warm-text)', marginBottom: 20 }}>
              GameSense
            </h1>
            <p style={{ color: 'var(--color-warm-body)', fontSize: 16, lineHeight: 1.75, letterSpacing: '0.02em' }}>
              A swipe-based discovery feature for Conduit Gaming that helps players find indie and under-the-radar games. Built around the bet that game discovery is a curiosity problem, not a search problem.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-text)', marginBottom: 6 }}>Timeline</p>
              <p style={{ fontSize: 14, color: 'var(--color-warm-body)' }}>4 weeks (Apr to May 2026)</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-text)', marginBottom: 6 }}>Role</p>
              <p style={{ fontSize: 14, color: 'var(--color-warm-body)' }}>Solo UI/UX Designer (Contract)</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-text)', marginBottom: 6 }}>Outcome</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-warm-body)' }}>
                Mobile and desktop hi-fi prototypes shipped to engineering. Feature is currently in QA on staging with first-iteration functionality built out, and is preparing to launch summer 2026.
              </p>
            </div>
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

          {/* OVERVIEW */}
          <section id="overview" style={{ marginBottom: 128 }}>
            <SectionLabel text="Overview" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              What is Conduit Gaming?
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
              Conduit Gaming is a pre-seed startup building tools for gamers to discover, organize, and engage with games beyond traditional storefronts. The company started as a way to save and share Minecraft server playlists, then expanded as the team saw the same discovery problem across the broader gaming landscape.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 20 }}>
              GameSense is a feature inside Conduit&apos;s product, accessed through a tab in the main nav. The team is positioning it as the value proposition they&apos;ll lead with when pitching investors at the next stage, which shaped the scope and stakes of the work.
            </p>
          </section>

          {/* WHY THIS PROJECT */}
          <section id="why-this-project" style={{ marginBottom: 128 }}>
            <SectionLabel text="Why This Project" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Building a discovery experience that feels like play.
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
              When Nick pitched the swipe pattern, I was excited and skeptical in roughly equal measure. Excited because the contract was a chance to own a feature end-to-end and bring some play into a category that usually defaults to grids and filters. Skeptical because Conduit&apos;s users are gamers, and gamers live on desktop. A swipe gesture is native to a phone in your hand on the subway, not a mouse in front of a monitor at 11pm. The first thing I pushed for was making GameSense work cross-platform from the start, so we could test the gamified premise in the environment where these users actually are.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 20 }}>
              The design question I went in curious about was smaller and more tactile than the strategy questions: how do you fit a game&apos;s metadata onto a card that has to read in a fraction of a second during a swipe? Games carry a lot of signal (platform, genre, tags, multiplayer support, release year, art style), and some of it is optional, so cards have to handle missing fields without looking broken. Swipeable cards are usually built for one or two glanceable attributes (a face, an age, a distance). A game card has to do more, faster, and degrade gracefully when the data is sparse.
            </p>
          </section>

          {/* INITIAL PROBLEM DISCOVERY */}
          <section id="initial-problem-discovery" style={{ marginBottom: 128 }}>
            <SectionLabel text="Initial Problem Discovery" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.3, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Three design problems, pulled apart.
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
              I broke the swipe-card brief into three smaller design problems and pulled reference for each one separately, instead of treating &quot;the card&quot; as a single object to study.
            </p>

            <SubSection title="3.1 Swipe onboarding: how do you teach the gesture without a tutorial wall?">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                Reference set: short swipe-tutorial flows from existing apps. The pattern most of them use is a dedicated 3 or 4 screen sequence at first launch (&quot;slide right to like, slide left to pass, swipe up for more&quot;). It works, but it front-loads instruction before the user has anything to react to.
              </p>
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 16 }}>
                For GameSense, we considered an onboarding moment but scoped it out of the MVP. The bet was that the gesture is now familiar enough across apps that most users can intuit it from the card stack itself, with subtle visual affordances doing the teaching. If retention data shows otherwise, onboarding is the first thing to add back.
              </p>
            </SubSection>

            <SubSection title="3.2 Swiping cards: where does the interaction itself come from?">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                Reference set: Tinder, Instagram&apos;s &quot;See more of what you love,&quot; and physical trivia/party card decks. I deliberately included a physical reference because the digital ones all share a screen-bound vocabulary (tap, drag, snap-back), and I wanted to remember that the swipe gesture is borrowing from a much older interaction: flipping through a stack of cards in your hands.
              </p>
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 16 }}>
                The thing I took from Tinder was the stack itself, not the dating app metaphor. Seeing the next card peeking behind the active one is what makes the deck feel finite and tactile, instead of feeling like an infinite scroll dressed up. The thing I took from physical decks was the weight of the gesture: a real card flip is committed and irreversible. I wanted the digital swipe to carry some of that weight, which later shaped the tilt and animation iterations.
              </p>
            </SubSection>

            <SubSection title="3.3 The info card itself: how do you fit game metadata onto a glanceable surface?">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                Reference set: Yu-Gi-Oh and Pok&eacute;mon trading cards, Pok&eacute;mon Go&apos;s profile and Pok&eacute;dex cards, and a mix of indie game-style info cards. Trading cards were the most useful reference because they&apos;re built around the exact constraint I was facing: dense, optional, semi-structured metadata (attack, defense, type, rarity, edition) arranged so a player can read the card in under a second across a table.
              </p>
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 16 }}>
                What trading cards do well is hierarchy through fixed zones. The art is always in the same place, the name is always at the top, the stats are always at the bottom. Missing fields don&apos;t break the layout because every zone has an expected shape. That principle, fixed zones with graceful fallback, became the foundation for the GameSense card&apos;s metadata structure.
              </p>
            </SubSection>

            <img
              src="/assets/reference-board.png"
              alt="Reference board broken into three problems: swipe onboarding, the swipe interaction, and the info card itself"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, marginTop: 32, marginBottom: 8 }}
            />
            <Caption text="Reference board, broken into three problems: swipe onboarding, the swipe interaction, and the info card itself." />
          </section>

          {/* CARD ANATOMY */}
          <section id="card-anatomy" style={{ marginBottom: 128 }}>
            <SectionLabel text="Card Anatomy" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Zones, not freeform layout.
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
              Before iterating on motion or layout, I broke the card itself down into a fixed set of zones. The front of the card carries six required and one optional element: media (1), title and short description (2), average rating (3), genres (4), price (5), and an optional promotion badge (6). The back carries long description, developer/publisher, gallery, platform, and a link to the game.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 20 }}>
              Two principles came out of this anatomy work and held through every later iteration:
            </p>
            <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                <strong>Media stays on top, always.</strong> Even when user feedback asked for genre tags to move further up, media kept the dominant zone because that&apos;s what catches the eye first when a card enters view. It&apos;s the same psychology behind why trading card art is always front-and-center.
              </li>
              <li style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                <strong>Optional zones (like the promotion badge) reserve their slot but don&apos;t break layout when absent.</strong> The card looks the same with or without them.
              </li>
            </ul>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 20 }}>
              Defining the anatomy this early meant later iterations were about motion, focus, and translation, not about re-litigating where things go.
            </p>

            <img
              src="/assets/card-anatomy.png"
              alt="Card anatomy diagram showing front and back of the GameSense card with numbered zones"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, marginTop: 32, marginBottom: 8 }}
            />
            <Caption text="Front and back of the GameSense card, broken into fixed zones." />
          </section>

          {/* NOTABLE ITERATIONS */}
          <section id="notable-iterations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Notable Iterations" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Three decisions worth showing.
            </h2>

            <SubSection title="5.1 Card tilt angle: finding the sweet spot between boring and overwhelming">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                I tested three tilt angles for the active card during a swipe: 3&deg;, 5&deg;, and 15&deg;.
              </p>
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>3&deg;</strong>{' '}was too tight. You couldn&apos;t really see the difference between the active card and the stack behind it, and the gesture didn&apos;t feel dynamic enough to register as a real choice.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>15&deg;</strong>{' '}was too dramatic. The card swung so far that the act of choosing started to feel overwhelming, like every swipe was a high-stakes commitment.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>5&deg;</strong>{' '}landed as the sweet spot. Enough motion to feel responsive and tactile, not so much that the user starts second-guessing every swipe.
                </li>
              </ul>
              <img
                src="/assets/tilt-angles.png"
                alt="Side-by-side comparison of 3°, 5°, and 15° card tilt angles"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, marginTop: 32 }}
              />
            </SubSection>

            <SubSection title="5.2 Nav bar blur during swipe: protecting focus">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                I tested keeping the nav bar sharp versus blurring it the moment a swipe starts. I landed on blur. The job of the swipe moment is to make a single decision about the card in your hand, and a sharp nav bar in peripheral vision pulls attention toward navigation options the user doesn&apos;t need right then. Blurring it reduces cognitive load and lets the card carry the whole frame.
              </p>
              <img
                src="/assets/nav-blur.png"
                alt="Before and after showing nav bar blur during swipe"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, marginTop: 32 }}
              />
            </SubSection>

            <SubSection title="5.3 Desktop translation: unstacking the deck without losing the deck feel">
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                The hardest translation problem was figuring out what swipe becomes on desktop. Stacking cards on top of each other works on mobile because your thumb is already touching the screen, but on desktop a stack just sits there waiting to be clicked, which kills the gesture-driven feel.
              </p>
              <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginTop: 16 }}>
                I landed on a 5-card horizontal carousel with only the center card in sharp focus and the four flanking cards blurred. The blur trick from the mobile nav bar carried over here as a focal device: the user always knows which card is &quot;active&quot; because everything else softens around it. Liking is mapped to arrow-up and passing to arrow-down (with the inverse on click), and the animation when a card moves out resembles the shuffle of a physical deck. The desktop version doesn&apos;t try to imitate the mobile swipe, it borrows the same underlying metaphor (a deck of cards in motion) and finds new gestures that fit the input device.
              </p>
              <img
                src="/assets/desktop-carousel.png"
                alt="Desktop 5-card carousel with center card in focus"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, marginTop: 32 }}
              />
            </SubSection>
          </section>

          {/* FINAL DESIGNS */}
          <section id="final-designs" style={{ marginBottom: 128 }}>
            <SectionLabel text="Final Designs" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Mobile and desktop, currently in QA.
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em', marginBottom: 40 }}>
              Mobile and desktop, in QA on staging, preparing to launch summer 2026.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <img src="/assets/final-default.png"   alt="Mobile default state"  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
              <img src="/assets/final-mid-swipe.png" alt="Mid-swipe state"       style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
              <img src="/assets/final-paywall.png"   alt="Paywall"               style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
              <img src="/assets/final-desktop.png"   alt="Desktop version"       style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
            </div>

          </section>

          {/* RETROSPECTIVE */}
          <section id="retrospective">
            <SectionLabel text="Retrospective" />
            <ul style={{ marginTop: 24, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 40 }}>
              <li>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Creativity has to live inside technical reality.
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                  I checked with engineering before proposing any animation that would ship to production. The 5&deg; tilt and the desktop blur both survived this filter; a few more elaborate ideas didn&apos;t, and the design is better for it.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Designing for gamers requires a different mental map.
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                  Gamers carry interaction muscle memory from games themselves (WSAD, arrow keys, hover states with rich tooltips) that most product designers don&apos;t account for. Getting comfortable with this audience meant getting comfortable with unconventional inputs as a starting point, not an exception.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Don&apos;t break what works.
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 16, letterSpacing: '0.02em' }}>
                  I came in ready to reinvent the card, but the most important decisions ended up being the conventional ones: media on top, title below, metadata at the bottom. The art of this work is balancing creativity with the patterns that already guide users well, and that&apos;s the muscle I&apos;m still building.
                </p>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </article>
  )
}
