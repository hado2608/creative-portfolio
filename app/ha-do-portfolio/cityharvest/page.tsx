'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',               label: 'Overview' },
  { id: 'final-designs',          label: 'Final Designs & Impacts' },
  { id: 'research',               label: 'Research' },
  { id: 'solution-explorations',  label: 'Solution Explorations' },
  { id: 'design-decisions',       label: 'Design Decisions' },
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

function Caption({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginBottom: 32, lineHeight: 1.5 }}>
      {text}
    </p>
  )
}

function Media({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')
  return (
    <div style={{ marginTop: 32, marginBottom: caption ? 0 : 32 }}>
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={src}
          style={{ width: '100%', borderRadius: 8, display: 'block' }}
        />
      ) : (
        <img
          src={src}
          alt={alt ?? ''}
          style={{ width: '100%', borderRadius: 8, display: 'block' }}
        />
      )}
      {caption && <Caption text={caption} />}
    </div>
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
        margin: '40px 0',
        lineHeight: 1.6,
      }}
    >
      {children}
    </blockquote>
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
      <h3 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 20, color: 'var(--color-warm-text)', marginBottom: 16, lineHeight: 1.4 }}>
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

export default function CityHarvestPage() {
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

      <CaseStudyNav nextHref="/ha-do-portfolio/music-map" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, paddingTop: 80 }}>

        {/* Hero image */}
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="https://framerusercontent.com/images/KuVBUVu6oHz2ii0cYvCm6JhjLCc.png"
            alt="City Harvest portal hero"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--color-warm-border)' }}>
          {/* Left: title + description */}
          <div>
            <h1 style={{ fontFamily: "'The Seasons', Georgia, serif", fontWeight: 400, fontSize: 128, letterSpacing: '-0.03em', lineHeight: 'normal', color: 'var(--color-warm-text)', marginBottom: 20 }}>
              City Harvest
            </h1>
            <p style={{ color: 'var(--color-warm-body)', fontSize: 18, lineHeight: 1.75, letterSpacing: '0.02em' }}>
              Redesigned the SharePoint intranet portal for City Harvest, one of NYC&apos;s largest food rescue nonprofits.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Timeline</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>3 months (Jun – Aug 2025)</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Role</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>Product Designer</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Outcome</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>
                Redesigned portal for immediate usage, hi-fi prototype and detailed research deck.
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
              <SideNavItem key={item.id} item={item} active={activeSection} accentColor="#64A70B" />
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div style={{ paddingBottom: 160, minWidth: 0 }}>

          {/* OVERVIEW */}
          <section id="overview" style={{ marginBottom: 128 }}>
            <SectionLabel text="Overview" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              About City Harvest
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
              City Harvest is one of the largest New York nonprofit organizations, rescuing and delivering food for New Yorkers experiencing food insecurity.
            </p>

            <Media
              src="https://framerusercontent.com/images/FCYdb9PkxpmGi9CC348NUVcmD4.png"
              alt="City Harvest truck in Bedstuy"
              caption="The very truck that visits my neighborhood in Bedstuy every Tuesday :D"
            />

            <SubSection title="Why a redesign? — Fragmented communications & resource sharing pipeline">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                In 2021, City Harvest published its organization-wide SharePoint intranet with the hope that resource sharing would be centralized. However, the original design does not support this well.
              </p>
              <Media
                src="https://framerusercontent.com/images/idAGxA1Peye0FzcApmuIsuapxU.png"
                alt="State of the portal in Feb 2025"
                caption="State of the portal in Feb 2025"
              />
            </SubSection>

            <SubSection title="Project goals">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Improve navigation</strong> — Refine navigation so employees can locate essential information regardless of portal familiarity.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Streamline communication</strong> — Improve internal content management experience to reduce inaccurate information.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Increase adoption</strong> — Improve content and layout design to increase engagement and confidence in portal exploration.
                </li>
              </ul>

              <PullQuote>
                How might I reorganize information on the portal to increase communication efficiency for Harvesters?
              </PullQuote>
            </SubSection>

            <SubSection title="Solution highlights">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                An easy-to-skim portal and a scalable mini design system.
              </p>
              <Media
                src="https://framerusercontent.com/images/6Ns4ayfXTxLWywZ9EvXRb4vXDQc.png"
                alt="Home page with reorganized information architecture"
                caption="Home page with reorganized information architecture"
              />
              <Media
                src="https://framerusercontent.com/assets/yZHw3cEcEPywhZhLpi7mJVaD00.mp4"
                caption="New design system with new button/file components"
              />
              <Media
                src="https://framerusercontent.com/images/TEhVvzGZJ6nFbtKkhoPlhWB884.png"
                alt="Department templates"
                caption="Department templates"
              />
            </SubSection>
          </section>

          {/* FINAL DESIGNS */}
          <section id="final-designs" style={{ marginBottom: 128 }}>
            <SectionLabel text="Final Designs & Impacts" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Final Designs &amp; Impacts
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
              Shipped a redesigned portal for immediate usage by 200+ Harvesters daily. The project included a hi-fi prototype and a detailed research deck handed off to City Harvest&apos;s IT &amp; BI team.
            </p>
          </section>

          {/* RESEARCH */}
          <section id="research" style={{ marginBottom: 128 }}>
            <SectionLabel text="Research" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Research
            </h2>

            <SubSection title="Stakeholder interviews & portal audit — Gauging company culture and working habits">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                My main research goal was to understand what common experiences employees had across the organization to maximize the impact of the design recommendations.
              </p>
              <Media
                src="https://framerusercontent.com/images/3t3ZE4uavSFgHlWgYOHkMobQg.png"
                alt="Stakeholder interviews and portal audit"
              />
            </SubSection>

            <SubSection title="Key Insights">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Inconsistent information architecture frustrates employees for non-regular tasks.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Employees feel disoriented due to lack of standardized departmental pages.
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Outdated and inaccurate documents across the portal lead to employees completing tasks incorrectly.
                </li>
              </ul>

              <PullQuote>
                33% of user interviewees noticed outdated documents as they were showing us the SharePoint.
              </PullQuote>
            </SubSection>

            <SubSection title="Refined HMW opportunities">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I rethink information architecture to better accommodate seeking unknown items?
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I adapt a standardized template for different department needs?
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I use design to help clean up the portal efficiently?
                </li>
              </ul>
            </SubSection>
          </section>

          {/* SOLUTION EXPLORATIONS */}
          <section id="solution-explorations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Solution Explorations" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Solution Explorations
            </h2>

            <SubSection title="IA Explorations — Regrouping different types of documents">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                The portal had little intentional organization or information hierarchy. After testing with Harvesters, categories such as &lsquo;Personal Access&rsquo; and &lsquo;Forms &amp; Services&rsquo; emerged as guidance for better skimming experience.
              </p>
            </SubSection>

            <SubSection title="Primary screen space reconsideration">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Harvesters access information divergently instead of convergently — they search for documents directly instead of finding them through departments. Having departments as a dropdown saves more primary screen space for direct access to key resources.
              </p>
            </SubSection>
          </section>

          {/* DESIGN DECISIONS */}
          <section id="design-decisions" style={{ marginBottom: 128 }}>
            <SectionLabel text="Design Decisions" />
            <h2 style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Design Decisions
            </h2>

            <SubSection title="Rebranded buttons with more interactivity">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Since buttons/folders were the main functionalities of the site, I developed a new set of buttons that adheres to the City Harvest marketing brand guidelines to bring consistency and interactivity to the portal.
              </p>
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Original buttons (plain, no brand alignment)
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 1 — simplified typography and darker color for accessibility
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 2 — added shadow and hover interaction
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 3 — changed button labels to be less ambiguous
                </li>
                <li style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em', paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Final version — used function colors (not brand color) and added icons for skimmability
                </li>
              </ul>
              <Media
                src="https://framerusercontent.com/images/ohGfrmWcDhQCx58F1HuaRagcb4.png"
                alt="Final button designs"
              />
            </SubSection>

            <SubSection title="Explorations for carousel design">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Towards the end of the contract, I refined the carousel to be essential but not intrusive to Harvesters. I chose the final option as it looks like a physical calendar and deprioritizes images so it doesn&apos;t take lots of mental space, while still hinting at the social element.
              </p>
              <Media
                src="https://framerusercontent.com/assets/qnMgVrRAEdh1Lw9epFYI8RrXxp0.mp4"
              />
              <Media
                src="https://framerusercontent.com/images/cJ8A0Vb4UrkUm8itxFF00pW3KU.png"
                alt="Final carousel design"
              />
            </SubSection>

            <SubSection title="Finally — emojis for sense of community">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                City Harvest is such a warm and competent community that always pushes and encourages each other to do impactful and meaningful work. As a final touch, I translated that dynamic from real-life into the portal by sprinkling in emojis that can be customized by each employee.
              </p>
              <Media
                src="https://framerusercontent.com/images/ef245PR52iYwWTuddJ8NAlIGk.png"
                alt="Emojis in the portal"
              />
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
                  Taking initiatives pays off
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  Since I worked mainly with non-designers, I developed the skills to really sell my ideas and designs, and invite everyone into learning the design process. The result was that no one was surprised when the final design came out (in a good way).
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  A chance to practice my component muscle
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  As there were many different types of files needed from different departments, adapting one component to serve multiple purposes was a fun challenge. With Figma Slots having just come out, it truly felt like I was designing slots customized to the City Harvest Portal.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 500, lineHeight: 1.4 }}>
                  Thank you to the IT &amp; BI Team 💖
                </p>
                <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                  I was truly blessed to have worked with such smart, kind and amazing people. Thank you to both of my managers, Bronwen Stine and Frances Castro, who taught me so much and were so graceful to me during the project.
                </p>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </article>
  )
}
