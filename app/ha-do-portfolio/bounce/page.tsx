'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'
import { Lightbox } from '@/components/Lightbox'
import { useSideNavReveal } from '@/hooks/useSideNavReveal'
import { H2, H3, BODY, CAPTION, SECTION_LABEL, GAP, CENTERED } from '@/lib/case-study-tokens'

const NAV_ITEMS = [
  { id: 'overview',               label: 'Overview' },
  { id: 'defining-the-problem',   label: 'Defining the Problem' },
  { id: 'notable-iterations',     label: 'Notable Iterations' },
  { id: 'style-guide',            label: 'Style Guide' },
  { id: 'final-designs',          label: 'Final Designs' },
  { id: 'retrospective',          label: 'Retrospective' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function Media({ src, alt }: { src: string; alt?: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const isVideo = src.endsWith('.mp4')

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', borderRadius: 2, display: 'block' }}
      />
    )
  }

  return (
    <>
      <img
        src={src}
        alt={alt ?? ''}
        onClick={() => setLightboxOpen(true)}
        style={{ width: '100%', borderRadius: 2, display: 'block', cursor: 'zoom-in' }}
      />
      {lightboxOpen && <Lightbox src={src} alt={alt} onClose={() => setLightboxOpen(false)} />}
    </>
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
    <p style={CAPTION}>{text}</p>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={SECTION_LABEL}>{text}</p>
  )
}

function SubSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: GAP.subsection }}>
      {title && <h3 style={H3}>{title}</h3>}
      {children}
    </div>
  )
}

function SideNavItem({ item, active, accentColor }: { item: typeof NAV_ITEMS[0]; active: string; accentColor: string }) {
  const isActive = active === item.id
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(item.id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
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
  const sideNavVisible = useSideNavReveal('cs-hero', true)

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
      <header id="cs-hero" style={{ ...CENTERED, paddingTop: 80 }}>

        {/* Hero image */}
        <div style={{ borderRadius: 2, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="https://framerusercontent.com/images/xEZgyqvYym7ZRhdUiOjIXcJ1P6E.png"
            alt="Bounce hero"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56}}>
          {/* Left: title + description */}
          <div>
            <h1 style={{ fontFamily: "'The Seasons', Georgia, serif", fontWeight: 400, fontSize: 128, letterSpacing: '-0.03em', lineHeight: 'normal', color: 'var(--color-warm-text)', marginBottom: 20 }}>
              Bounce
            </h1>
            <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>
              Designed a new take on DAWs to support remote music collaboration.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Timeline</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>4 months (Aug – Dec 2025)</p>
            </div>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Role</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>Solo Product Designer</p>
            </div>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Outcome</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>
                Designed a new take on DAWs to support remote music collaboration.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="cs-mobile-nav" aria-hidden="true" />

      {/* Sidebar — fixed, aligned with "back to work" */}
      <nav className="cs-sidenav" aria-label="Case study sections" style={{ opacity: sideNavVisible ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: sideNavVisible ? 'auto' : 'none' }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {NAV_ITEMS.map(item => (
            <SideNavItem key={item.id} item={item} active={activeSection} accentColor="#A8A24A" />
          ))}
        </ul>
      </nav>

      <div className="cs-body" style={{ marginTop: 80 }}>

        {/* Content */}
        <div style={{ paddingBottom: 160 }}>

          {/* OVERVIEW */}
          <section id="overview" style={{ marginBottom: 128 }}>

            {/* ── Overview case-section ── */}
            <div style={{ marginBottom: 60 }}>
              <div style={{ width: '100%' }}>
                <SectionLabel text="Overview" />
                <h2 style={H2}>
                  What are Digital Audio Workstations (DAWs)?
                </h2>
                <p style={{ ...BODY, color: 'rgba(71,62,61,0.8)' }}>
                  DAWs are industry-standard softwares for producing music. Common functionalities for DAWs include but not limited to recording, editing or mixing a piece of music.
                </p>
              </div>

              <div style={{ width: '100%', marginTop: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 4fr 3fr', gap: 16, alignItems: 'stretch' }}>
                  <img src="https://www.figma.com/api/mcp/asset/aac842b6-981f-45d4-bfca-02a198c3081e" alt="Logic Pro" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 2 }} />
                  <img src="https://www.figma.com/api/mcp/asset/268e0177-2344-463f-8485-f0b2a8c1dff7" alt="Ableton" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 2 }} />
                  <img src="https://www.figma.com/api/mcp/asset/d5d91caa-e1ee-4850-abd2-7f28589a2463" alt="Pro Tools" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 2 }} />
                </div>
                <p style={CAPTION}>Examples of DAWs, from left to right: Logic Pro – Ableton – Pro Tools</p>
              </div>
            </div>

            {/* ── Problem case-section ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60 }}>
              <div style={{ width: '100%' }}>
                <SectionLabel text="Problem" />
                <h2 style={H2}>
                  Built only for solo work
                </h2>
                <p style={{ ...BODY, lineHeight: 1.3, color: 'rgba(71,62,61,0.8)' }}>
                  Being a musician, I notice that music is a greatly collaborative process. However, DAWs have been built for solo work since the day it was being invented til today.
                </p>
              </div>

              {/* Collage */}
              <div style={{ width: '100%', height: 508, background: '#e4e4e4', border: '0.5px solid #a2a2a2', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                <img src="https://www.figma.com/api/mcp/asset/df220565-59a4-4464-bd02-a230ba93001b" alt="" style={{ position: 'absolute', left: -3, top: -6, width: 668, height: 189, borderRadius: 6, objectFit: 'cover', display: 'block' }} />
                <img src="https://www.figma.com/api/mcp/asset/eaace546-a2f2-4325-bfb3-82b1a3c7bb4d" alt="" style={{ position: 'absolute', left: 5, top: 166, width: 423, height: 423, objectFit: 'cover', display: 'block' }} />
                <img src="https://www.figma.com/api/mcp/asset/ba781645-75e2-424e-86cf-ed487fe804ba" alt="" style={{ position: 'absolute', left: 474, top: 239, width: 593, height: 291, borderRadius: 6, objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* ── Standalone paragraph ── */}
            <div style={{ marginBottom: 60 }}>
              <p style={{ ...BODY, lineHeight: 1.3, color: 'rgba(71,62,61,0.8)' }}>
                As designers have Figma, engineers have GitHub and AI workflows, I and my fellow musicians have been longing for a digital solution to this ancient collaboration problem:
              </p>
            </div>

            {/* ── Pull quote ── */}
            <div style={{ width: '100%', background: '#f1f0e7' }}>
              <div style={{ borderLeft: '19px solid #928d3b', paddingLeft: 43, paddingRight: 24, paddingTop: 8, paddingBottom: 8 }}>
                <p style={{ fontFamily: "'The Seasons', serif", fontWeight: 700, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', margin: 0 }}>
                  What if there is a DAW that supports music professionals and hobbyists in{' '}
                  <span style={{ textDecoration: 'underline' }}>remote collaboration</span>
                  {' '}while keeping its{' '}
                  <span style={{ textDecoration: 'underline' }}>complex functionalities</span>?
                </p>
              </div>
            </div>

            {/* ── Solution highlights ── */}
            <SubSection title="Solution highlights">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
                <img
                  src="https://www.figma.com/api/mcp/asset/a4674c8a-5945-4bd2-a702-3bf68d551c94"
                  alt="Bounce collaboration canvas"
                  style={{ width: '100%', display: 'block', borderRadius: 2 }}
                />
                <img
                  src="https://www.figma.com/api/mcp/asset/797f19e6-b6ac-4087-8513-5525372646f7"
                  alt="Bounce team view"
                  style={{ width: '100%', display: 'block', borderRadius: 2 }}
                />
              </div>
            </SubSection>

          </section>

          {/* DEFINING THE PROBLEM */}
          <section id="defining-the-problem" style={{ marginBottom: 128 }}>
            <SectionLabel text="Defining the Problem" />
            <h2 style={H2}>
              Understanding the producing process &amp; current DAW usage behaviors through surveys and interviews
            </h2>

            <p style={BODY}>
              To investigate my hypothesis, I conducted a quantitative survey with 10 professional musicians and producers (5-10 years of experience) with follow-up in-depth interviews.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              <Media src="https://framerusercontent.com/images/DyndXsSP762Fs0fYXty3NmV2pc.png" alt="Survey results" />
              <Media src="https://framerusercontent.com/images/691QrM6wfiUNZLC3Elwa8I7FH2M.png" alt="Interview insights" />
            </div>

            <SubSection title="Insight #1 — Tedious Collaboration Process">
              <p style={BODY}>
                Sending large files and stems of a single fix is tedious and time-consuming, especially when most of the time the receiver has to realign the new files with their local version manually.
              </p>
              <PullQuote>
                Going back and forth like that, especially in different time zones, is so tedious. I think this is why people still prefer to collaborate in person in this digital age.
              </PullQuote>
            </SubSection>

            <SubSection title="Insight #2 — Lack of support for musical discussion">
              <p style={BODY}>
                Musicians often use onomatopoeia such as &apos;ooh&apos; and &apos;tsk&apos; to convey musical ideas to each other. There are no direct support for this form of communication digitally.
              </p>
              <PullQuote>
                Ideating is a very vocal process, so having a way to call and make conversation in real time will boost collaboration.
              </PullQuote>
            </SubSection>

            <SubSection title="Insight #3 — No true mastery of the tool">
              <p style={BODY}>
                Sound engineering is a hard discipline on its own, but often times these engineers still need to adapt to DAWs custom plugins and troubleshooting system on the side. DAWs are hard to learn for both professionals and beginners, even if they already spend 10,000 hours on it.
              </p>
              <PullQuote>
                After all these years, I still don&apos;t know what I&apos;m doing.
              </PullQuote>
            </SubSection>

            <SubSection title="Refined HMW questions">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I support direct file and version management in DAWs to help alleviate time cost for sound engineers and producers?
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I make remote music collaboration in DAWs feel as natural and expressive as being in the same room?
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I help musicians of all levels adapt to DAWs quickly?
                </li>
              </ul>
            </SubSection>
          </section>

          {/* NOTABLE ITERATIONS */}
          <section id="notable-iterations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Notable Iterations" />
            <h2 style={H2}>
              Notable Iterations
            </h2>

            <SubSection title="Maximizing focus by abstracting workflows">
              <p style={BODY}>
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

            <SubSection title="Communication channel">
              <p style={BODY}>
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

            <SubSection title="Toolbar">
              <p style={BODY}>
                From testing, I refined the information displayed in the toolbar for each mode: recording and mixing, so that only necessary functions remain. Final: essential information only — Recording, Group, ABC/Lyrics, Select (Recording Mode) | Recording, Plugins, Effects, Sync Current Version (Mixing Mode).
              </p>
            </SubSection>
          </section>

          {/* STYLE GUIDE */}
          <section id="style-guide" style={{ marginBottom: 128 }}>
            <SectionLabel text="Style Guide" />
            <h2 style={H2}>
              An indie and nostalgic ecosystem
            </h2>

            <div style={{ marginTop: 24 }}>
              <p style={{ ...BODY, marginBottom: 24 }}>
                I take inspirations from the feeling of the &apos;zone&apos; – how we can get lost in the process of making music. I gravitated towards the indie, ethereal vibe to remind users that Bounce is for bouncing human ideas. Additionally, I took the name &apos;Bounce&apos; from the common DAW button label when exporting the final product, and the act of &apos;bouncing&apos; ideas off of each other.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Media src="https://framerusercontent.com/images/QbXev4556FpsOwlyxiQGopvDCMU.png" alt="Style guide moodboard" />
                <Media src="https://framerusercontent.com/images/cXOEzmSwVWKHcRRPFWHvV46uIs.png" alt="Style guide colors and type" />
              </div>
            </div>
          </section>

          {/* FINAL DESIGNS */}
          <section id="final-designs" style={{ marginBottom: 128 }}>
            <SectionLabel text="Final Designs" />
            <h2 style={H2}>
              Final Designs
            </h2>
            <p style={{ ...BODY, marginBottom: 40 }}>
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
            <h2 style={H2}>
              Retrospective
            </h2>
            <ul style={{ marginTop: 24, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 40 }}>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  Designing a tool for creators requires thinking in meta
                </p>
                <p style={BODY}>
                  It was such a fresh air to take on a challenge of creating something that others use to create with. I learned to consider the stakeholder&apos;s stakeholders – how producers would consider their audiences&apos; needs when they produce, and what would they need to get those results. These insights have driven my designs in wonderfully surprising ways!
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  Abstraction is key to convey complex functionalities
                </p>
                <p style={BODY}>
                  This project has humbled me and pushed me to prioritize the most efficient flows to best illustrate my product. Many details such as building the audio library or bypassing custom plugins needed to be abstracted in order to communicate my core ideas, especially to non-target users.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  A solo project, but I was not alone
                </p>
                <p style={BODY}>
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
