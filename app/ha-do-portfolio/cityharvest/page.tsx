'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'
import { Lightbox } from '@/components/Lightbox'
import { useSideNavReveal } from '@/hooks/useSideNavReveal'
import { H2, H3, BODY, CAPTION, SECTION_LABEL, GAP, CENTERED } from '@/lib/case-study-tokens'

const NAV_ITEMS = [
  { id: 'overview',               label: 'Overview' },
  { id: 'final-designs',          label: 'Final Designs & Impacts' },
  { id: 'research',               label: 'Research' },
  { id: 'solution-explorations',  label: 'Solution Explorations' },
  { id: 'design-decisions',       label: 'Design Decisions' },
  { id: 'retrospective',          label: 'Retrospective' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function Caption({ text }: { text: string }) {
  return (
    <p style={CAPTION}>{text}</p>
  )
}

function Media({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
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
          style={{ width: '100%', borderRadius: 2, display: 'block' }}
        />
      ) : (
        <img
          src={src}
          alt={alt ?? ''}
          onClick={() => setLightboxOpen(true)}
          style={{ width: '100%', borderRadius: 2, display: 'block', cursor: 'zoom-in' }}
        />
      )}
      {caption && <Caption text={caption} />}
      {lightboxOpen && <Lightbox src={src} alt={alt} onClose={() => setLightboxOpen(false)} />}
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
    <p style={SECTION_LABEL}>{text}</p>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: GAP.subsection }}>
      <h3 style={H3}>{title}</h3>
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

export default function CityHarvestPage() {
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

      <CaseStudyNav nextHref="/ha-do-portfolio/music-map" />

      {/* ── HERO ── */}
      <header id="cs-hero" style={{ ...CENTERED, paddingTop: 80 }}>

        {/* Hero image */}
        <div style={{ borderRadius: 2, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="https://framerusercontent.com/images/KuVBUVu6oHz2ii0cYvCm6JhjLCc.png"
            alt="City Harvest portal hero"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56}}>
          {/* Left: title + description */}
          <div>
            <h1 style={{ fontFamily: "'The Seasons', Georgia, serif", fontWeight: 400, fontSize: 128, letterSpacing: '-0.03em', lineHeight: 'normal', color: 'var(--color-warm-text)', marginBottom: 20 }}>
              City Harvest
            </h1>
            <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>
              Redesigned the SharePoint intranet portal for City Harvest, one of NYC&apos;s largest food rescue nonprofits.
            </p>
          </div>
          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Timeline</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>3 months (Jun – Aug 2025)</p>
            </div>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Role</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>Product Designer</p>
            </div>
            <div>
              <p style={{ ...BODY, fontWeight: 700, color: 'var(--color-warm-text)', marginBottom: 2 }}>Outcome</p>
              <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>
                Redesigned portal for immediate usage, hi-fi prototype and detailed research deck.
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
            <SideNavItem key={item.id} item={item} active={activeSection} accentColor="#64A70B" />
          ))}
        </ul>
      </nav>

      <div className="cs-body" style={{ marginTop: 80 }}>

        {/* Content */}
        <div style={{ paddingBottom: 160 }}>

          {/* OVERVIEW */}
          <section id="overview" style={{ marginBottom: 128 }}>
            <SectionLabel text="Overview" />
            <h2 style={H2}>
              About City Harvest
            </h2>
            <p style={BODY}>
              City Harvest is one of the largest New York nonprofit organizations, rescuing and delivering food for New Yorkers experiencing food insecurity.
            </p>

            <Media
              src="https://framerusercontent.com/images/FCYdb9PkxpmGi9CC348NUVcmD4.png"
              alt="City Harvest truck in Bedstuy"
              caption="The very truck that visits my neighborhood in Bedstuy every Tuesday :D"
            />

            <SubSection title="Why a redesign? — Fragmented communications & resource sharing pipeline">
              <p style={BODY}>
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
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Improve navigation</strong> — Refine navigation so employees can locate essential information regardless of portal familiarity.
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Streamline communication</strong> — Improve internal content management experience to reduce inaccurate information.
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  <strong>Increase adoption</strong> — Improve content and layout design to increase engagement and confidence in portal exploration.
                </li>
              </ul>

              <PullQuote>
                How might I reorganize information on the portal to increase communication efficiency for Harvesters?
              </PullQuote>
            </SubSection>

            <SubSection title="Solution highlights">
              <p style={BODY}>
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
            <h2 style={H2}>
              Final Designs &amp; Impacts
            </h2>
            <p style={BODY}>
              Shipped a redesigned portal for immediate usage by 200+ Harvesters daily. The project included a hi-fi prototype and a detailed research deck handed off to City Harvest&apos;s IT &amp; BI team.
            </p>
          </section>

          {/* RESEARCH */}
          <section id="research" style={{ marginBottom: 128 }}>
            <SectionLabel text="Research" />
            <h2 style={H2}>
              Research
            </h2>

            <SubSection title="Stakeholder interviews & portal audit — Gauging company culture and working habits">
              <p style={BODY}>
                My main research goal was to understand what common experiences employees had across the organization to maximize the impact of the design recommendations.
              </p>
              <Media
                src="https://framerusercontent.com/images/3t3ZE4uavSFgHlWgYOHkMobQg.png"
                alt="Stakeholder interviews and portal audit"
              />
            </SubSection>

            <SubSection title="Key Insights">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Inconsistent information architecture frustrates employees for non-regular tasks.
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Employees feel disoriented due to lack of standardized departmental pages.
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Outdated and inaccurate documents across the portal lead to employees completing tasks incorrectly.
                </li>
              </ul>

              <PullQuote>
                33% of user interviewees noticed outdated documents as they were showing us the SharePoint.
              </PullQuote>
            </SubSection>

            <SubSection title="Refined HMW opportunities">
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I rethink information architecture to better accommodate seeking unknown items?
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I adapt a standardized template for different department needs?
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  How might I use design to help clean up the portal efficiently?
                </li>
              </ul>
            </SubSection>
          </section>

          {/* SOLUTION EXPLORATIONS */}
          <section id="solution-explorations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Solution Explorations" />
            <h2 style={H2}>
              Solution Explorations
            </h2>

            <SubSection title="IA Explorations — Regrouping different types of documents">
              <p style={BODY}>
                The portal had little intentional organization or information hierarchy. After testing with Harvesters, categories such as &lsquo;Personal Access&rsquo; and &lsquo;Forms &amp; Services&rsquo; emerged as guidance for better skimming experience.
              </p>
            </SubSection>

            <SubSection title="Primary screen space reconsideration">
              <p style={BODY}>
                Harvesters access information divergently instead of convergently — they search for documents directly instead of finding them through departments. Having departments as a dropdown saves more primary screen space for direct access to key resources.
              </p>
            </SubSection>
          </section>

          {/* DESIGN DECISIONS */}
          <section id="design-decisions" style={{ marginBottom: 128 }}>
            <SectionLabel text="Design Decisions" />
            <h2 style={H2}>
              Design Decisions
            </h2>

            <SubSection title="Rebranded buttons with more interactivity">
              <p style={BODY}>
                Since buttons/folders were the main functionalities of the site, I developed a new set of buttons that adheres to the City Harvest marketing brand guidelines to bring consistency and interactivity to the portal.
              </p>
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Original buttons (plain, no brand alignment)
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 1 — simplified typography and darker color for accessibility
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 2 — added shadow and hover interaction
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Iteration 3 — changed button labels to be less ambiguous
                </li>
                <li style={{ ...BODY, paddingLeft: 20, borderLeft: '2px solid var(--color-warm-border)' }}>
                  Final version — used function colors (not brand color) and added icons for skimmability
                </li>
              </ul>
              <Media
                src="https://framerusercontent.com/images/ohGfrmWcDhQCx58F1HuaRagcb4.png"
                alt="Final button designs"
              />
            </SubSection>

            <SubSection title="Explorations for carousel design">
              <p style={BODY}>
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
              <p style={BODY}>
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
            <h2 style={H2}>
              Retrospective
            </h2>
            <ul style={{ marginTop: 24, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 40 }}>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  Taking initiatives pays off
                </p>
                <p style={BODY}>
                  Since I worked mainly with non-designers, I developed the skills to really sell my ideas and designs, and invite everyone into learning the design process. The result was that no one was surprised when the final design came out (in a good way).
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  A chance to practice my component muscle
                </p>
                <p style={BODY}>
                  As there were many different types of files needed from different departments, adapting one component to serve multiple purposes was a fun challenge. With Figma Slots having just come out, it truly felt like I was designing slots customized to the City Harvest Portal.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, color: 'var(--color-warm-text)', marginBottom: 8, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.02em' }}>
                  Thank you to the IT &amp; BI Team 💖
                </p>
                <p style={BODY}>
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
