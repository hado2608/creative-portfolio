'use client'

import { useEffect, useState } from 'react'
import CaseStudyNav from '@/components/CaseStudyNav'

const NAV_ITEMS = [
  { id: 'overview',             label: 'Overview' },
  { id: 'ethnography-research', label: 'Ethnography Research' },
  { id: 'design-iterations',    label: 'Design Iterations' },
  { id: 'final-designs',        label: 'Final Designs' },
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
  const isVideo = src.endsWith('.mp4') || src.includes('.mp4')
  if (isVideo) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', borderRadius: 8, display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
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
        margin: '24px 0',
        fontFamily: 'var(--font-serif)',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'var(--color-warm-text)',
      }}
    >
      {children}
    </blockquote>
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
    <p
      style={{
        marginBottom: 16,
        letterSpacing: '0.1em',
        fontSize: 11,
        textTransform: 'uppercase',
        fontFamily: "'Neue Montreal', sans-serif",
        fontWeight: 500,
        color: 'var(--color-warm-muted)',
      }}
    >
      {text}
    </p>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 56 }}>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 20,
          color: 'var(--color-warm-text)',
          marginBottom: 16,
          lineHeight: 1.4,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function SideNavItem({ item, active }: { item: typeof NAV_ITEMS[0]; active: string }) {
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
        <svg
          width="26"
          height="4"
          viewBox="0 0 26 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, transition: 'opacity 150ms' }}
        >
          <path
            d="M0 0H25.9151L24 4H0V0Z"
            fill={isActive ? 'var(--color-warm-accent)' : 'transparent'}
          />
        </svg>
        {item.label}
      </button>
    </li>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ToyotaPage() {
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

      <CaseStudyNav nextHref="/ha-do-portfolio/gamesense" nextLabel="Next: GameSense" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, paddingTop: 80 }}>

        {/* Hero image */}
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          <img
            src="https://framerusercontent.com/images/Hc2itY26MgQiFrWL6SO74FNN7g.png"
            alt="Serene — AR app for pedestrians with auditory sensitivity"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            paddingBottom: 56,
            borderBottom: '1px solid var(--color-warm-border)',
          }}
        >
          {/* Left: title + description */}
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 80,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--color-warm-text)',
                marginBottom: 20,
              }}
            >
              Serene
            </h1>
            <p style={{ color: 'var(--color-warm-body)', fontSize: 18, lineHeight: 1.75, letterSpacing: '0.02em' }}>
              AR navigation app helping pedestrians with auditory sensitivity move safely through NYC — designed for Toyota&apos;s Woven City initiative.
            </p>
          </div>

          {/* Right: stacked metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Timeline</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>4 months (Feb – May 2025)</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Role</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>Solo Product Designer</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-text)', marginBottom: 2 }}>Outcome</p>
              <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontSize: 18, letterSpacing: '0.02em', lineHeight: 1.75, color: 'var(--color-warm-body)' }}>
                Detailed research report, hi-fi prototypes delivered to the Woven City team at Toyota
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

          {/* ── OVERVIEW ── */}
          <section id="overview" style={{ marginBottom: 128 }}>
            <SectionLabel text="Overview" />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                lineHeight: 1.2,
                color: 'var(--color-warm-text)',
                marginBottom: 24,
              }}
            >
              About Toyota Woven City
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
              Woven City is a project currently being built by Toyota at Mt. Fuji, aiming to create a mobility-friendly community. I joined as a co-creator to contribute to the on-going research for urban pedestrians.
            </p>

            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <Media src="https://framerusercontent.com/assets/C4uH7Ws0wqEmhYHCaEvhOl4teY.mp4" />
            </div>

            <SubSection title="Why pedestrians with auditory sensitivity? — A silent struggle in a chaotic city">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                To live in a big city like New York is to live in an invisible yet visible soundscape. While noise sensitivity is a public health issue, it is not often discussed as one of the main public concerns.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 32,
                  marginBottom: 32,
                }}
              >
                <Media
                  src="https://framerusercontent.com/images/EIy6T2IjQ6IAEtLIcQcU4fKvF9g.png"
                  alt="Urban noise environment"
                />
                <Media
                  src="https://framerusercontent.com/images/VMmnY3eJzFG0fdX5JYjbMjiTWKc.png"
                  alt="Pedestrians navigating a busy street"
                />
              </div>

              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                These factors can lead to sensory overload, disorientation, or even anxiety, affecting their ability to make safe decisions on the streets and making everyday travel stressful or unsafe. This is a more common issue than perceived.
              </p>

              <PullQuote>
                How might I help reduce anxiety and ensure safety for pedestrians with auditory sensitivity navigating an urban setting like NYC?
              </PullQuote>
            </SubSection>

            <SubSection title="Solution highlights">
              <div style={{ marginBottom: 24 }}>
                <Media
                  src="https://framerusercontent.com/images/ewJ83AhC5BL6S2wKhycOrEfP0n8.png"
                  alt="Serene solution overview"
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 16,
                }}
              >
                <Media src="https://framerusercontent.com/assets/qu6WjL2yWdi2W91LhhJQlReHLrM.mp4" />
                <Media src="https://framerusercontent.com/assets/ZaxZfU6p1B6vgjCnUyQzLqIRaHw.mp4" />
              </div>
            </SubSection>
          </section>

          {/* ── ETHNOGRAPHY RESEARCH ── */}
          <section id="ethnography-research" style={{ marginBottom: 128 }}>
            <SectionLabel text="Ethnography Research" />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                lineHeight: 1.2,
                color: 'var(--color-warm-text)',
                marginBottom: 24,
              }}
            >
              Ethnography Research
            </h2>

            <SubSection title="Getting to know my audience in real life">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Approaching this large problem, I wanted to find a specific angle and common issues that pedestrians with auditory sensitivity face.
              </p>

              {/* Research methods table */}
              <div style={{ marginTop: 32, overflowX: 'auto' }}>
                <table
                  style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                    fontFamily: "'Neue Montreal', sans-serif",
                  }}
                >
                  <thead>
                    <tr style={{ background: 'rgba(71,62,61,0.06)' }}>
                      <th
                        style={{
                          padding: '12px 16px',
                          fontSize: 16,
                          fontWeight: 600,
                          borderBottom: '1px solid var(--color-warm-border)',
                          textAlign: 'left',
                          color: 'var(--color-warm-text)',
                        }}
                      >
                        Method
                      </th>
                      <th
                        style={{
                          padding: '12px 16px',
                          fontSize: 16,
                          fontWeight: 600,
                          borderBottom: '1px solid var(--color-warm-border)',
                          textAlign: 'left',
                          color: 'var(--color-warm-text)',
                        }}
                      >
                        Details
                      </th>
                      <th
                        style={{
                          padding: '12px 16px',
                          fontSize: 16,
                          fontWeight: 600,
                          borderBottom: '1px solid var(--color-warm-border)',
                          textAlign: 'left',
                          color: 'var(--color-warm-text)',
                        }}
                      >
                        Key finding
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        method: 'Observational study',
                        details: '2 locations, 1 hour each',
                        finding:
                          'Loud noise from a construction site on Canal St caused people to jolt and a halt for all pedestrian traffic.',
                      },
                      {
                        method: 'In-depth interviews',
                        details: '5 individuals',
                        finding:
                          '"Even if I run late, I\'d still make sure to bring my headphones."',
                      },
                      {
                        method: 'Secondary research',
                        details: '6 articles',
                        finding: '5.9% of US adults had sensitivity to everyday sounds.',
                      },
                      {
                        method: 'Diary studies',
                        details: '5 individuals, 5 days',
                        finding:
                          '"If I hear someone trying to get my attention, it distracts me."',
                      },
                    ].map((row, i) => (
                      <tr
                        key={row.method}
                        style={{ background: i % 2 === 1 ? 'rgba(71,62,61,0.03)' : 'transparent' }}
                      >
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 16,
                            borderBottom: '1px solid var(--color-warm-border)',
                            color: 'var(--color-warm-text)',
                            fontWeight: 500,
                            verticalAlign: 'top',
                          }}
                        >
                          {row.method}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 16,
                            borderBottom: '1px solid var(--color-warm-border)',
                            color: 'var(--color-warm-body)',
                            verticalAlign: 'top',
                          }}
                        >
                          {row.details}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 16,
                            borderBottom: '1px solid var(--color-warm-border)',
                            color: 'var(--color-warm-body)',
                            verticalAlign: 'top',
                          }}
                        >
                          {row.finding}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SubSection>

            <SubSection title="Portrait of typical New Yorkers sensitive to noise">
              <ul
                style={{
                  paddingLeft: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  marginTop: 16,
                }}
              >
                <li
                  style={{
                    lineHeight: 1.75,
                    fontSize: 18,
                    letterSpacing: '0.02em',
                    paddingLeft: 20,
                    borderLeft: '2px solid var(--color-warm-border)',
                    color: 'var(--color-warm-body)',
                  }}
                >
                  <strong style={{ color: 'var(--color-warm-text)' }}>They are daily headphones and earbuds users.</strong>{' '}
                  Current solutions for pedestrians with auditory sensitivity are limited, with noise-cancelling headphones and earbuds being the only method for mitigating urban noise exposure.
                </li>
                <li
                  style={{
                    lineHeight: 1.75,
                    fontSize: 18,
                    letterSpacing: '0.02em',
                    paddingLeft: 20,
                    borderLeft: '2px solid var(--color-warm-border)',
                    color: 'var(--color-warm-body)',
                  }}
                >
                  <strong style={{ color: 'var(--color-warm-text)' }}>Physical and mental reactions from spiky noises that cannot be blocked out.</strong>{' '}
                  Even though pedestrians rely mostly on noise-cancelling headphones, they still experience physical and emotional discomfort from abnormally loud or spiky noises that headphones cannot block out.
                </li>
                <li
                  style={{
                    lineHeight: 1.75,
                    fontSize: 18,
                    letterSpacing: '0.02em',
                    paddingLeft: 20,
                    borderLeft: '2px solid var(--color-warm-border)',
                    color: 'var(--color-warm-body)',
                  }}
                >
                  <strong style={{ color: 'var(--color-warm-text)' }}>They get anxious and lose focus without headphones.</strong>{' '}
                  In situations that pedestrians have to take off headphones (e.g. commuting with friends), they lose control of their focus, getting distracted and anxious from the surrounding urban noises.
                </li>
              </ul>

              <PullQuote>
                How might I help pedestrians with auditory sensitivity feel less anxious and distracted by helping them anticipate the sounds?
              </PullQuote>
            </SubSection>
          </section>

          {/* ── DESIGN ITERATIONS ── */}
          <section id="design-iterations" style={{ marginBottom: 128 }}>
            <SectionLabel text="Design Iterations" />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                lineHeight: 1.2,
                color: 'var(--color-warm-text)',
                marginBottom: 24,
              }}
            >
              Design Iterations
            </h2>

            <SubSection title="1. Decibels information on dynamic island">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                Even though my final version has more information, testers still wanted the full context to skim through instead of decibels information being abstracted.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 32,
                }}
              >
                <div>
                  <Media
                    src="https://framerusercontent.com/images/wpNSXLoozxVwkygk2RN3KSqfc.png"
                    alt="Version 1: relied purely on color"
                  />
                  <Caption text="Version 1: relied purely on color" />
                </div>
                <div>
                  <Media
                    src="https://framerusercontent.com/images/aMfZx4XjjIoodVpRQ8EKhTR1bxU.png"
                    alt="Version 2: color + decibel details"
                  />
                  <Caption text="Version 2: color + decibel details" />
                </div>
                <div>
                  <Media
                    src="https://framerusercontent.com/images/xhdWkvCr4v4mUpgOpbRGG6LeSuw.png"
                    alt="Final v1"
                  />
                  <Caption text="Final v1" />
                </div>
                <div>
                  <Media
                    src="https://framerusercontent.com/images/G9s0nFpvYQMTLPbKeFfuRrtk.png"
                    alt="Final v2"
                  />
                  <Caption text="Final v2" />
                </div>
              </div>
            </SubSection>

            <SubSection title="2. Prioritize location in header area">
              <p style={{ lineHeight: 1.75, fontSize: 18, letterSpacing: '0.02em' }}>
                After 2 rounds of testing, I reduced the logo to make space for both the location and the AR view, as users were getting distracted by its glass treatment.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 16,
                  marginTop: 32,
                }}
              >
                <div>
                  <Media
                    src="https://framerusercontent.com/images/NcEu4RAFLRpiabiCKXzuQ2J8.png"
                    alt="Version 1: left-aligned, unfocused"
                  />
                  <Caption text="Version 1: left-aligned, unfocused" />
                </div>
                <div>
                  <Media
                    src="https://framerusercontent.com/images/hYYXg38vAk2Eu1ftyxjFTGVPAM.png"
                    alt="Version 2: centered, logo still taking focus"
                  />
                  <Caption text="Version 2: centered, logo still taking focus" />
                </div>
                <div>
                  <Media
                    src="https://framerusercontent.com/images/RDvK2YE0xhd52ax21CFvC1iBJq0.png"
                    alt="Final: only display location"
                  />
                  <Caption text="Final: only display location" />
                </div>
              </div>
            </SubSection>
          </section>

          {/* ── FINAL DESIGNS ── */}
          <section id="final-designs" style={{ marginBottom: 128 }}>
            <SectionLabel text="Final Designs" />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                lineHeight: 1.2,
                color: 'var(--color-warm-text)',
                marginBottom: 24,
              }}
            >
              Final Designs
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

              <div>
                <Media src="https://framerusercontent.com/assets/w68x9YfFJnKh1Zrkz6d2rgZU0w.mp4" />
                <Caption text="Gentle onboarding with introduction to the concepts of soundscape and constant haptics" />
              </div>

              <div>
                <Media src="https://framerusercontent.com/assets/DnQRRHnVfT4LqjXTdz6OI5C7IYQ.mp4" />
                <Caption text="Scoping the soundscape with proper location permission" />
              </div>

              <div>
                <Media src="https://framerusercontent.com/assets/v61xOpcjCufrIcqE78gZLeGFK0.mp4" />
                <Caption text="AR mode to live review the sounds with context" />
              </div>

            </div>
          </section>

        </div>
      </div>
    </article>
  )
}
