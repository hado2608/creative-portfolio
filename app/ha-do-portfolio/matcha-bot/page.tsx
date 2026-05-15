/*
 * CASE STUDY TEMPLATE — reuse this structure for new case studies.
 *
 * Sections: Hero → Overview → Design Challenge → Bot Design & Modality →
 *   Personality → Conversation Flow → Interface Design → Script Revision →
 *   Challenges + Takeaways
 *
 * Gray VisualBlock placeholders carry Figma annotations so you know exactly
 * what to make before swapping in real assets.
 */

'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import CaseStudyNav from '@/components/CaseStudyNav'

const ImageSlider = dynamic(() => import('@/components/ImageSlider'), { ssr: false })

const NAV_ITEMS = [
  { id: 'overview',          label: 'Overview' },
  { id: 'design-challenge',  label: 'The Design Challenge' },
  { id: 'bot-modality',      label: 'Bot Design & Modality' },
  { id: 'personality',       label: "Uzi's Personality" },
  { id: 'conversation-flow', label: 'Conversation Flow' },
  { id: 'interface-design',  label: 'Interface Design' },
  { id: 'takeaways',         label: 'Challenges + Takeaways' },
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

const BODY: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  fontFamily: SANS,
  letterSpacing: '0.02em',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      marginBottom: 16,
      letterSpacing: '0.1em',
      fontSize: 11,
      textTransform: 'uppercase',
      fontFamily: SANS,
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
        fontFamily: SERIF,
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

function VisualBlock({ label, caption, aspect = '16/9' }: { label: string; caption?: string; aspect?: string }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 8 }}>
      <div style={{
        background: '#e2e5ea',
        borderRadius: 8,
        aspectRatio: aspect,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontSize: 13,
          color: '#9ba3af',
          textAlign: 'center',
          padding: '0 32px',
          lineHeight: 1.6,
        }}>
          {label}
        </span>
      </div>
      {caption && (
        <p style={{
          fontSize: 13,
          color: 'var(--color-warm-muted)',
          marginTop: 10,
          marginBottom: 32,
          fontFamily: SANS,
          lineHeight: 1.5,
        }}>
          {caption}
        </p>
      )}
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

function CalloutCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: '16px 20px',
      border: '1px solid var(--color-warm-border)',
      margin: '32px 0',
      fontSize: 15,
      lineHeight: 1.75,
      color: 'var(--color-warm-body)',
      fontFamily: SANS,
    }}>
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

export default function MatchaBotPage() {
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

      <CaseStudyNav nextHref="/ha-do-portfolio/gamesense" nextLabel="Next case study" />

      {/* ── HERO ── */}
      <header style={{ ...CENTERED, height: '100vh', paddingTop: 80, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Hero video */}
        <div style={{ flex: 1, minHeight: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          <video
            src="/assets/matcha-bot-hero.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 2-col: title + description left / metadata right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          paddingBottom: 56,
          borderBottom: '1px solid var(--color-warm-border)',
        }}>
          <div>
            <h1 style={{
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 72px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--color-warm-text)',
              marginBottom: 20,
            }}>
              Matcha Doing?
            </h1>
            <p style={{ ...BODY, color: 'var(--color-warm-body)' }}>
              A multimodal self-service kiosk for a fictional specialty matcha shop. Order drinks, browse
              the menu, buy wholesale products (voice, touch, or both) without needing to flag anyone down.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'flex-end' }}>
            {[
              { label: 'Course',      value: 'Conversational UX' },
              { label: 'My Role',     value: 'Interface Design, Final Prototype' },
              { label: 'Team',        value: 'Chelsea, Maanya, Shriya, Ha' },
              { label: 'Deliverable', value: 'Figma prototype + slide deck' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-warm-text)',
                  marginBottom: 6,
                }}>
                  {label}
                </p>
                <p style={{ fontSize: 14, color: 'var(--color-warm-body)', fontFamily: SANS, letterSpacing: '0.02em' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="cs-mobile-nav" aria-hidden="true" />

      <div className="cs-body" style={{ ...CENTERED, marginTop: 80 }}>

        {/* Sticky side nav */}
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
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Self-service that actually talks back.
            </h2>
            <p style={{ ...BODY }}>
              Matcha Doing? is a self-service kiosk at the entrance of a specialty matcha and Japanese
              tea shop. You can order a drink, pay, and manage your membership using voice, touch,
              or both, without waiting for anyone.
            </p>
            <p style={{ ...BODY, marginTop: 20 }}>
              For this class project, our team added a wholesale purchasing feature: buy matcha products,
              set up delivery, check your membership perks, all from the same kiosk you just ordered
              your drink from.
            </p>
          </section>

          {/* ── THE DESIGN CHALLENGE ── */}
          <section id="design-challenge" style={{ marginBottom: 128 }}>
            <SectionLabel text="The Design Challenge" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.3, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              One interface. Multiple tasks. No staff to bridge the gap.
            </h2>
            <p style={{ ...BODY }}>
              Specialty tea shops can be a lot. Terms like &ldquo;ceremonial grade&rdquo; or &ldquo;chasen&rdquo; are
              things you kind of have to know before you can even order. Stack a wholesale purchase and
              a membership check on top of that and the friction adds up fast. A kiosk should make
              all of that easier, not just hand it to you on a screen and wish you luck.
            </p>
            <p style={{ ...BODY, marginTop: 20 }}>
              The hard part wasn&apos;t any one task. It was all of them on the same screen. More tasks
              means more options, more options means a busier screen, and a busy screen stops being
              a conversation. People just scan and tap. We needed something that could handle a lot
              without feeling like it does.
            </p>

            <CalloutCard>
              <strong>Is conversation even the right call here?</strong>
              <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.75, fontFamily: SANS }}>
                We ran Google&apos;s &ldquo;Is Conversation the Right Approach&rdquo; exercise to sanity-check. Small,
                predictable menu + users who might have trouble with precise tapping = yes. Talking
                through a menu is faster and more forgiving than hunting for the right button.
              </p>
              <img
                src="/assets/conversation-fit-check.png"
                alt="Google's Is Conversation the Right Approach quiz, with relevant boxes checked"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6, marginTop: 16 }}
              />
            </CalloutCard>

            <p style={{ ...BODY }}>
              Accessibility was never a separate box to check. Everything we built for users with
              disabilities (the transcript, the talking states, the 2-option limit) ended up
              making things better for everyone else too.
            </p>
          </section>

          {/* ── BOT DESIGN & MODALITY ── */}
          <section id="bot-modality" style={{ marginBottom: 128 }}>
            <SectionLabel text="Bot Design & Modality" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Voice, text, and touch. All at once.
            </h2>
            <p style={{ ...BODY }}>
              We called it Multimodal Layering: voice, text, and touch running simultaneously, not
              as modes you switch between. Use all three at once, or just one. None of them break
              if another one&apos;s missing.
            </p>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  label: 'Voice',
                  body: 'The kiosk listens through a built-in mic. Uzi asks a question, you answer out loud. That\'s the primary flow.',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="1" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M3 9a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="6" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Text',
                  body: 'Everything said by you or Uzi shows up on screen as text. Useful if you missed a word, essential if you\'re hard of hearing.',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="2" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Touch',
                  body: 'Product visuals and tap targets show up on screen as a backup. If you\'d rather tap than speak, that works too.',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8V3.5a1.5 1.5 0 0 1 3 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M10 6.5a1.5 1.5 0 0 1 3 0V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M4 8.5a1.5 1.5 0 0 1 3 0V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M13 9a1.5 1.5 0 0 1 1.5 1.5v1A4.5 4.5 0 0 1 10 16H8.5A4.5 4.5 0 0 1 4 11.5v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map(({ label, body, icon }) => (
                <div key={label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: '#f5f4f2',
                  borderRadius: 8,
                  padding: '16px 20px',
                  border: '1px solid var(--color-warm-border)',
                  borderLeft: '3px solid var(--color-warm-accent)',
                }}>
                  <span style={{ color: 'var(--color-warm-muted)', marginTop: 2, flexShrink: 0 }}>{icon}</span>
                  <span style={{ ...BODY, fontSize: 15 }}>
                    <strong style={{ color: 'var(--color-warm-text)' }}>{label}:</strong>{' '}{body}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── UZI'S PERSONALITY ── */}
          <section id="personality" style={{ marginBottom: 128 }}>
            <SectionLabel text="Personality Design" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Meet Uzi.
            </h2>
            <p style={{ ...BODY }}>
              The bot is named Uzi, after Uji, the Japanese region where a lot of the best matcha
              comes from. Ties the character to the product without turning it into a mascot.
            </p>
            <p style={{ ...BODY, marginTop: 20 }}>
              The tension was this: the shop has a whole vibe. Calm, considered, a little elevated.
              But nobody wants a kiosk that&apos;s doing a whole thing. Too expressive and it slows you
              down. Too flat and it doesn&apos;t feel like the shop at all. We landed on: Uzi knows the
              product and respects your time. Knowledgeable, not chatty.
            </p>

            <VisualBlock
              label="Figma: personality chart — Uzi's tone sliders (formal ↔ casual, brief ↔ expressive) and character do's and don'ts"
              caption="Uzi's personality chart: the axes that shaped every script decision."
              aspect="4/3"
            />

            <VisualBlock
              label="Figma: Uzi voice samples — 2–3 example utterances showing personality in action (e.g. greeting, out-of-stock, confirmation)"
              caption="Personality expressed through script: how the same information sounds in Uzi's voice versus a generic bot."
              aspect="16/5"
            />
          </section>

          {/* ── CONVERSATION FLOW ── */}
          <section id="conversation-flow" style={{ marginBottom: 128 }}>
            <SectionLabel text="Conversation Flow" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Mapping the paths, including the ones that break.
            </h2>
            <p style={{ ...BODY }}>
              We mapped five scenarios: in-stock purchase, out-of-stock with nearby pickup, delivery
              order, combined drink and wholesale, and a membership perk applied to wholesale. Each
              one tracks the happy path and what Uzi does when something goes sideways.
            </p>
            <p style={{ ...BODY, marginTop: 20 }}>
              With no staff to step in, error recovery had to be part of the conversation itself.
              Every time something went wrong, Uzi needed to bring people back without making them
              feel like they broke it.
            </p>

            <div style={{ marginTop: 32, marginBottom: 8 }}>
              <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                <video
                  src="/assets/flowchart.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 10, marginBottom: 32, fontFamily: SANS, lineHeight: 1.5 }}>
                Full conversation flowchart. Gray branches are error and recovery paths.
              </p>
            </div>

            <ImageSlider
              caption="Sample scripts across five scenarios"
              slides={[
                '/assets/script-1.png',
                '/assets/script-2.png',
                '/assets/script-3.png',
                '/assets/script-4.png',
              ]}
            />
          </section>

          {/* ── INTERFACE DESIGN ── */}
          <section id="interface-design" style={{ marginBottom: 128 }}>
            <SectionLabel text="Interface Design" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 24 }}>
              Designing so the screen supports the voice, not the other way around.
            </h2>
            <p style={{ ...BODY }}>
              I handled the interface. The thing I kept coming back to: the screen should support Uzi,
              not compete with it. The moment it looks like a menu, people treat it like one. I wanted
              it to feel like a running transcript, something that confirms what&apos;s happening, not
              something you have to operate.
            </p>

            <SubSection title="Choosing wholesale as the MVP flow">
              <p style={{ ...BODY }}>
                We prototyped wholesale instead of the simpler drink order flow. Wholesale touched more
                of Uzi&apos;s range: product browsing, delivery address, membership check, multi-step
                confirmation. If the screen held up under that, it would hold up anywhere.
              </p>
              <p style={{ ...BODY, marginTop: 16 }}>
                Drink ordering is a shorter path with fewer branches. Useful to build, not enough to
                test everything.
              </p>

              <div style={{ marginTop: 32, marginBottom: 8 }}>
                <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <video
                    src="/assets/wholesale-flow.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 10, marginBottom: 32, fontFamily: SANS, lineHeight: 1.5 }}>
                  The MVP flow: wholesale ordering end-to-end, chosen because it exercises every layer of the system.
                </p>
              </div>
            </SubSection>

            <SubSection title="The 2-option rule: keeping the kiosk voice-first">
              <p style={{ ...BODY }}>
                The biggest call I made was never showing more than two options at once. When a screen
                has four or five choices, people stop listening and start reading. They scan, they tap.
                The kiosk stops being a conversation and becomes a touchscreen.
              </p>
              <p style={{ ...BODY, marginTop: 16 }}>
                Two options keeps people listening. Uzi asks, screen echoes it, you answer. The screen
                just confirms. It doesn&apos;t run the show. It also helped with accessibility: shorter
                utterances from Uzi, less to keep track of, and less room for error if you were using
                voice instead of touch.
              </p>

              <div style={{ marginTop: 32, marginBottom: 8 }}>
                <img
                  src="/assets/2-option-rule.png"
                  alt="Comparison: 4+ options cluttered and tab-focused vs. 2 options clean and voice-first"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
                />
                <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 10, marginBottom: 32, fontFamily: SANS, lineHeight: 1.5 }}>
                  The difference a single structural rule makes: voice-first vs. tap-first interface feel.
                </p>
              </div>
            </SubSection>

            <SubSection title="Talking states: making the invisible visible">
              <p style={{ ...BODY }}>
                A voice interface has four states that a regular screen doesn&apos;t need to show: idle,
                listening, responding, error. If the screen doesn&apos;t communicate which one Uzi is in,
                you&apos;re just waiting and guessing.
              </p>
              <p style={{ ...BODY, marginTop: 16 }}>
                For accessibility this was critical. Someone hard of hearing needs the screen to tell
                them when to talk and when to wait. Someone with low vision needs audio that carries
                everything the screen shows. The talking states sync those two channels, and they had to
                be legible in both, not just one.
              </p>

              <div style={{ marginTop: 32, marginBottom: 8, borderRadius: 8, overflow: 'hidden', lineHeight: 0 }}>
                <img
                  src="/assets/voice-states.png"
                  alt="Four talking states: idle, listening, processing, speaking"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 10, marginBottom: 32, fontFamily: SANS, lineHeight: 1.5 }}>
                Four distinct states, each with a visual and audio signal. Designed so neither channel depends on the other.
              </p>
            </SubSection>

            <SubSection title="Iterating the results display">
              <p style={{ ...BODY }}>
                When Uzi brings up products (say, two sizes of matcha in stock), how do you show them?
                Early on we used a list: name, price, description, stacked. It looked like a form.
                People would read the whole thing before Uzi even finished talking.
              </p>
              <p style={{ ...BODY, marginTop: 16 }}>
                The revised version uses two cards with just enough information to tell them apart.
                Cards paired with the 2-option rule make the choice feel like a decision, not a
                search through a list.
              </p>

              <div style={{ marginTop: 32, marginBottom: 8 }}>
                <img
                  src="/assets/results-iterations.png"
                  alt="Four iterations of the results display, from list to final 2-card layout"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
                />
                <p style={{ fontSize: 13, color: 'var(--color-warm-muted)', marginTop: 10, marginBottom: 32, fontFamily: SANS, lineHeight: 1.5 }}>
                  Results display: from list (form-like, scan-first) to cards (decision-like, voice-compatible).
                </p>
              </div>
            </SubSection>
          </section>

          {/* ── SCRIPT REVISION ── */}
          {/* ── CHALLENGES + TAKEAWAYS ── */}
          <section id="takeaways">
            <SectionLabel text="Challenges + Takeaways" />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.2, color: 'var(--color-warm-text)', marginBottom: 40 }}>
              What I&apos;m taking out of this.
            </h2>

            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 48 }}>
              <li>
                <p style={{ fontFamily: SERIF, fontSize: 20, color: 'var(--color-warm-text)', marginBottom: 10, fontWeight: 500, lineHeight: 1.4 }}>
                  Voice-first is a constraint, not a feature.
                </p>
                <p style={{ ...BODY }}>
                  The 2-option rule felt arbitrary until I watched someone scan a 4-option screen and
                  reach for the touchscreen before Uzi even finished. That was it. The kiosk had stopped
                  being a bot. The constraint wasn&apos;t a preference, it was what kept the whole thing
                  working. For voice design, every instinct toward &ldquo;more on screen&rdquo; is the wrong one.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: SERIF, fontSize: 20, color: 'var(--color-warm-text)', marginBottom: 10, fontWeight: 500, lineHeight: 1.4 }}>
                  What we built for access worked for everyone.
                </p>
                <p style={{ ...BODY }}>
                  The visual transcript was designed for users who are Deaf or hard of hearing. The
                  talking states were designed for users with low vision. Both ended up improving the
                  experience for everyone. The transcript caught misheard commands, the talking states
                  kept things readable even in a noisy space. I went in thinking accessibility was a
                  constraint. It kept turning into a solution.
                </p>
              </li>
              <li>
                <p style={{ fontFamily: SERIF, fontSize: 20, color: 'var(--color-warm-text)', marginBottom: 10, fontWeight: 500, lineHeight: 1.4 }}>
                  Structure is what makes a conversation feel human.
                </p>
                <p style={{ ...BODY }}>
                  I went in thinking the frameworks would make everything feel scripted. They didn&apos;t.
                  The personality chart and the flow structure gave every word choice somewhere to land.
                  When a line felt off, I could say why: doesn&apos;t sound like Uzi, or it&apos;s asking too
                  much too early. Without that, you&apos;re guessing every time. The bigger thing this class
                  gave me was the idea that a conversational experience isn&apos;t a fixed format. How much
                  you give, how much you hold back, depends on who you&apos;re designing for. I already knew
                  that from visual design. Turns out it applies here too.
                </p>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </article>
  )
}
