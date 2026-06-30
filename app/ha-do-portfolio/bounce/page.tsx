'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',               label: 'Overview' },
  { id: 'defining-the-problem',   label: 'Defining the Problem' },
  { id: 'notable-iterations',     label: 'Notable Iterations' },
  { id: 'style-guide',            label: 'Style Guide' },
  { id: 'final-designs',          label: 'Final Designs' },
  { id: 'retrospective',          label: 'Retrospective' },
]

const CENTERED: React.CSSProperties = {
  maxWidth: 1400,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 40,
  paddingRight: 40,
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Media({ src, alt }: { src: string; alt?: string }) {
  const isVideo = src.endsWith('.mp4')
  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', borderRadius: 8, display: 'block' }}
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt ?? ''}
      style={{ width: '100%', borderRadius: 8, display: 'block' }}
    />
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid var(--color-warm-accent)',
        paddingLeft: 24,
        fontFamily: "'Neue Montreal', sans-serif",
        fontSize: 20,
        fontStyle: 'italic',
        color: 'var(--color-warm-text)',
        margin: '32px 0',
        lineHeight: 1.6,
      }}
    >
      {children}
    </blockquote>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 8, marginBottom: 32, lineHeight: 1.5 }}>
      {text}
    </p>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      marginBottom: 16,
      letterSpacing: '0.1em',
      fontSize: 11,
      textTransform: 'uppercase',
      fontFamily: "'Neue Montreal', sans-serif",
      fontWeight: 500,
      color: 'var(--color-warm-muted)',
    }}>
      {text}
    </p>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 56 }}>
      <h3 style={{
        fontFamily: "'Neue Montreal', sans-serif",
        fontWeight: 500,
        fontSize: 20,
        color: 'var(--color-warm-text)',
        marginBottom: 16,
        lineHeight: 1.4,
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function SideNavItem({ item, active, accentColor }: { item: typeof NAV_ITEMS[0]; active: string; accentColor: string }) {
  const isActive = active === item.id
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <li>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: "'Neue Montreal', sans-serif",
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: isActive ? 'rgba(40,40,40,0.8)' : 'rgba(40,40,40,0.5)',
          fontWeight: isActive || isHovered ? 700 : 400,
          lineHeight: 1.2,
          textAlign: 'left',
        }}
      >
        <svg width="26" height="4" viewBox="0 0 26 4" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, transition: 'opacity 150ms' }}>
          <path d="M0 0H25.9151L24 4H0V0Z" fill={isActive ? accentColor : 'transparent'} />
        </svg>
        {item.label}
      </button>
    </li>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BouncePage() {
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

      <CaseStudyNav nextHref="/ha-do-portfolio/gamesense" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, paddingTop: 80 }}>

        {/* Hero image */}
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="https://framerusercontent.com/images/xEZgyqvYym7ZRhdUiOjIXcJ1P6E.png"
            alt="Bounce hero"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--color-warm-border)' }}>
          {/* Left: title + description */}
          <div>
            <h1 style={{ fontFamily: "'The Seasons', Georgia, serif", fontWeight: 400, fontSize: 128, letterSpacing: '-0.03em', lineHeight: 'normal', color: 'var(--color-warm-text)', marginBottom: 20 }}>
              Bounce
            </h1>
            <p style={{ color: 'var(--color-warm-body)', fontSize: 18, lineHeight: 1.75, letterSpacing: '0.02em' }}>
              Designed a new take on DAWs to support remote music collaboration.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Timeline</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>4 months (Aug – Dec 2025)</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Role</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>Solo Product Designer</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Outcome</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>
                Designed a new take on DAWs to support remote music collaboration.
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
              <SideNavItem key={item.id} item={item} active={activeSection} accentColor="#A8A24A" />
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div style={{ paddingBottom: 160, minWidth: 0 }}>

          {/* OVERVIEW */}
          <section id="overview" style={{ marginBottom: 128 }}>
            <SectionLabel text="Overview" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              What are Digital Audio Workstations (DAWs)?
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
              DAWs are industry-standard softwares for producing music. Common functionalities for DAWs include but not limited to recording, editing or mixing a piece of music.
            </p>

            {/* 3-image grid: Logic Pro, Ableton, Pro Tools */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 32 }}>
              <Media src="https://framerusercontent.com/images/ilGru8JdemOlcuC2R6l4rWfWzJc.png" alt="Logic Pro" />
              <Media src="https://framerusercontent.com/images/R1maQgW6fXe8bmtzIaVzppIRbY.png" alt="Ableton" />
              <Media src="https://framerusercontent.com/images/KOLZTrp8KQL6lEqX3H4zLv2uy9Q.png" alt="Pro Tools" />
            </div>

            <SubSection title="Why a DAW and why now?">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Being a musician... I notice that music is a collaborative process similar to other art forms and disciplines, but DAWs have been built for solo work since the beginning until these digital days.
              </p>
              <div style={{ marginTop: 24 }}>
                <Media src="https://framerusercontent.com/images/8b5J7QLGuhMaN2nSEG2J52Yx1w.png" alt="Why a DAW and why now" />
              </div>
              <PullQuote>
                How might I visualize a DAW that supports music professionals and hobbyists in remote collaboration while keeping its complex functionalities?
              </PullQuote>
            </SubSection>

            <SubSection title="Solution highlights">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <Media src="https://framerusercontent.com/assets/kpWCD7FniMeYLOCFmGfUighj12Q.mp4" />
                <Media src="https://framerusercontent.com/assets/GJstySqYM8eb8b9NidNiQVAU4DE.mp4" />
              </div>
            </SubSection>
          </section>

          {/* DEFINING THE PROBLEM */}
          <section id="defining-the-problem" style={{ marginBottom: 128 }}>
            <SectionLabel text="Defining the Problem" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Defining the Problem
            </h2>

            <SubSection title="User Survey &amp; Interviews">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                To investigate my hypothesis, I conducted a small survey with 10 musicians/producers with 5-10 years of experience and interviewed 6 of them.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                <Media src="https://framerusercontent.com/images/DyndXsSP762Fs0fYXty3NmV2pc.png" alt="Survey results" />
                <Media src="https://framerusercontent.com/images/691QrM6wfiUNZLC3Elwa8I7FH2M.png" alt="Interview insights" />
              </div>
            </SubSection>

            <SubSection title="Insight #1 — Tedious Collaboration Process">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Sending large files and stems of a single fix is tedious and time-consuming, especially when most of the time the receiver has to realign the new files with their local version manually.
              </p>
              <PullQuote>
                Going back and forth like that, especially in different time zones, is so tedious. I think this is why people still prefer to collaborate in person in this digital age.
              </PullQuote>
            </SubSection>

            <SubSection title="Insight #2 — Lack of support for musical discussion">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Musicians often use onomatopoeia such as &apos;ooh&apos; and &apos;tsk&apos; to convey musical ideas to each other. There are no direct support for this form of communication digitally.
              </p>
              <PullQuote>
                Ideating is a very vocal process, so having a way to call and make conversation in real time will boost collaboration.
              </PullQuote>
            </SubSection>

            <SubSection title="Insight #3 — No true mastery of the tool">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Sound engineering is a hard discipline on its own, but often times these engineers still need to adapt to DAWs custom plugins and troubleshooting system on the side. DAWs are hard to learn for both professionals and beginners, even if they already spend 10,000 hours on it.
              </p>
              <PullQuote>
                After all these years, I still don&apos;t know what I&apos;m doing.
              </PullQuote>
            </SubSection>

            <SubSection title="Refined HMW questions">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I support direct file and version management in DAWs to help alleviate time cost for sound engineers and producers?
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I make remote music collaboration in DAWs feel as natural and expressive as being in the same room?
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I help musicians of all levels adapt to DAWs quickly?
                </li>
              </ul>
            </SubSection>
          </section>

          {/* NOTABLE ITERATIONS */}
          <section id="notable-iterations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Notable Iterations" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Notable Iterations
            </h2>

            <SubSection title="1. Maximizing focus by abstracting workflows">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                In the quest of challenging the traditional DAW interface pattern to replace with a more intuitive one, I separated production apart from post-production. This created the challenge of connecting them together while keeping complex functionalities intact. The final 3 modes proved to be more intuitive for seeing this connection.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                <div>
                  <Media src="https://framerusercontent.com/images/9JsM8x8zV4JhgTXRkBtwC6dlY.png" alt="Before: 4 screens for 4 modes" />
                  <Caption text="Before: 4 screens for 4 modes, too complex" />
                </div>
                <div>
                  <Media src="https://framerusercontent.com/images/9sPbzgdIj9wRX39nkk5KI3Hw0.png" alt="After: 1 screen for 3 modes" />
                  <Caption text="After: 1 screen for 3 modes, simple" />
                </div>
              </div>
            </SubSection>

            <SubSection title="2. Communication channel">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Placing communication in the top right corner instead of left proved to be more discoverable to users through testing. Additionally, improvements in labels (&apos;Jam&apos; to &apos;Teams&apos;) and visual nature of the components (fixed vs. floating) added to discovery and utility success rate.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                <div>
                  <Media src="https://framerusercontent.com/images/xVoGsPr32IsIwkfO8wZnHDWQRSQ.png" alt="Before: fixed comms bar" />
                  <Caption text="Before: fixed comms bar and vague language" />
                </div>
                <div>
                  <Media src="https://framerusercontent.com/images/FpyhyVKxBCjOezwsCRfKnE2C60.png" alt="After: flexible position" />
                  <Caption text="After: flexible position and intuitive language" />
                </div>
              </div>
            </SubSection>

            <SubSection title="3. Toolbar">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                From testing, I refined the information displayed in the toolbar for each mode: recording and mixing, so that only necessary functions remain. Final: essential information only — Recording, Group, ABC/Lyrics, Select (Recording Mode) | Recording, Plugins, Effects, Sync Current Version (Mixing Mode).
              </p>
            </SubSection>
          </section>

          {/* STYLE GUIDE */}
          <section id="style-guide" style={{ marginBottom: 128 }}>
            <SectionLabel text="Style Guide" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Style Guide
            </h2>

            <SubSection title="An indie and nostalgic music technological world">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                I take inspirations from the feeling of the &apos;zone&apos; – how we can get lost in the process of making music. This is why I gravitated towards the indie, ethereal vibe building – to remind users that Bounce is for bouncing human ideas. Additionally, I took the name &apos;Bounce&apos; from the common DAW button label when exporting the final product, and the act of &apos;bouncing&apos; ideas off of each other.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                <Media src="https://framerusercontent.com/images/QbXev4556FpsOwlyxiQGopvDCMU.png" alt="Style guide moodboard" />
                <Media src="https://framerusercontent.com/images/cXOEzmSwVWKHcRRPFWHvV46uIs.png" alt="Style guide colors and type" />
              </div>
            </SubSection>
          </section>

          {/* FINAL DESIGNS */}
          <section id="final-designs" style={{ marginBottom: 128 }}>
            <SectionLabel text="Final Designs" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Final Designs
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', marginBottom: 40 }}>
              Elaborated MVP for music collaboration
            </p>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/R4c5h4K16IDiMTCgyMZG8V9Dbpo.mp4" />
              <Caption text="3 different views allowing focusing on different tasks with flexible panels" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/Y519zeDO6x8xUYRqQgWZLHsOs.mp4" />
              <Caption text="Real-time chat, call and video call while working on production" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/ufpUX2wpTfQEl5Qpm0iBzKPzaY.mp4" />
              <Caption text="Recording and composing a new song" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/3fW6YQ26nrBORJ9T5Eiw4EF3lo.mp4" />
              <Caption text="Quickly put down a musical idea with teammates to canvas with no time restrictions" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/HNi0Dela3BgyX6H4ahUgJnUJRs.mp4" />
              <Caption text="Add effects and plugins as nodes for troubleshooting semantic audio issues (mixing post-production)" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <Media src="https://framerusercontent.com/assets/4X9AMJx6c0HXYAXGczP23b75boI.mp4" />
              <Caption text="Upload local changes to the shared cloud for mutual access to the latest version (version control)" />
            </div>

            <SubSection title="Results">
              <PullQuote>
                &ldquo;Would absolutely use this for my producing work, and excited to see what comes next for Bounce!&rdquo; — a guitarist/producer after testing
              </PullQuote>
              <PullQuote>
                &ldquo;So exciting…this reminds me of a physical mixing board.&rdquo; — a product designer and hobbyist producer
              </PullQuote>
            </SubSection>
          </section>

          {/* RETROSPECTIVE */}
          <section id="retrospective">
            <SectionLabel text="Retrospective" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Retrospective
            </h2>
            <ul style={{ marginTop: 24, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 40 }}>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Designing a tool for creators requires thinking in meta
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  It was such a fresh air to take on a challenge of creating something that others use to create with. I learned to consider the stakeholder&apos;s stakeholders – how producers would consider their audiences&apos; needs when they produce, and what would they need to get those results. These insights have driven my designs in wonderfully surprising ways!
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Abstraction is key to convey complex functionalities
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  This project has humbled me and pushed me to prioritize the most efficient flows to best illustrate my product. Many details such as building the audio library or bypassing custom plugins needed to be abstracted in order to communicate my core ideas, especially to non-target users.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  A solo project, but I was not alone
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  I am lucky to have received supports and feedback from both of my designer and musician communities in this project. Co-creating a DAW with actual producers has opened my eyes in how I&apos;d approach design – more daring, more innovative, and more human. It has been a rewarding sprint, and I am deeply grateful for every help along the way 💛
                </p>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </article>
  )
}
