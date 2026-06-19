'use client'

import { useState, useEffect, useRef } from 'react'
import NycClock from './NycClock'

// ── Avatar / Vinyl flip card ──────────────────────────────────────────────────

function AvatarVinyl() {
  const [flipped, setFlipped] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/assets/chameleon.mp3')
    audioRef.current = audio
    const onEnd = () => { setPlaying(false); setFlipped(false) }
    audio.addEventListener('ended', onEnd)
    return () => { audio.removeEventListener('ended', onEnd); audio.pause() }
  }, [])

  const handleMouseEnter = () => setFlipped(true)
  const handleMouseLeave = () => { if (!playing) setFlipped(false) }
  const handleClick = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      setFlipped(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const face: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ alignSelf: 'flex-start', cursor: 'pointer', height: 130, perspective: 700, width: 130 }}
    >
      <div style={{
        height: '100%',
        position: 'relative',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
        width: '100%',
      }}>
        {/* Front — avatar */}
        <div style={face}>
          <img src="/assets/avatar.png" alt="Ha Do" style={{ height: '100%', objectFit: 'cover', width: '100%' }} />
        </div>

        {/* Back — vinyl */}
        <div style={{ ...face, transform: 'rotateY(180deg)' }}>
          <img
            src="/assets/vinyl.png"
            alt="Vinyl record"
            style={{
              animation: playing ? 'vinyl-spin 3s linear infinite' : 'none',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.18)',
              transformOrigin: 'center',
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Scramble text ─────────────────────────────────────────────────────────────

const TITLES = [
  'product designer',
  'design technologist',
  'jazz musician',
  'sense maker',
]

const CHARS = 'abcdefghijklmnopqrstuvwxyz'
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)]
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

function firstTwoConsonants(text: string): Set<number> {
  const anchors = new Set<number>()
  let offset = 0
  for (const word of text.split(' ')) {
    let count = 0
    for (let i = 0; i < word.length && count < 2; i++) {
      const ch = word[i].toLowerCase()
      if (ch >= 'a' && ch <= 'z' && !VOWELS.has(ch)) {
        anchors.add(offset + i)
        count++
      }
    }
    offset += word.length + 1
  }
  return anchors
}

function useScramble(target: string) {
  const [display, setDisplay] = useState(target)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const prevRef = useRef(target)

  useEffect(() => {
    if (prevRef.current === target) return
    const source = prevRef.current
    prevRef.current = target

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    // Anchor = first 2 consonants of the SOURCE phrase
    // They stay as their source char at start and change last
    const anchorSet = firstTwoConsonants(source)

    setDisplay(target.split('').map((c, i) => {
      if (c === ' ') return ' '
      // Keep source char if it's an anchor position within both strings
      if (anchorSet.has(i) && i < source.length && source[i] !== ' ') return source[i]
      return rand()
    }).join(''))

    // Non-anchors resolve first (random order), anchors last
    const allNonSpace = target.split('').reduce<number[]>((acc, c, i) => {
      if (c !== ' ') acc.push(i)
      return acc
    }, [])
    const nonAnchors = allNonSpace.filter(i => !anchorSet.has(i)).sort(() => Math.random() - 0.5)
    const anchors = [...anchorSet].filter(i => i < target.length).sort(() => Math.random() - 0.5)
    const shuffled = [...nonAnchors, ...anchors]

    const BATCH = 3, GAP = 330, TICK = 65

    for (let b = 0; b < shuffled.length; b += BATCH) {
      const batch = shuffled.slice(b, b + BATCH)
      const t0 = 180 + (b / BATCH) * GAP
      timersRef.current.push(
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = rand() }); return c.join('') }), t0),
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = rand() }); return c.join('') }), t0 + TICK),
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = target[i] }); return c.join('') }), t0 + TICK * 2),
      )
    }

    return () => { timersRef.current.forEach(clearTimeout) }
  }, [target])

  return display
}

function CyclingTitle() {
  const [index, setIndex] = useState(0)
  const display = useScramble(TITLES[index])

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % TITLES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <p style={{
      color: 'rgba(71,62,61,0.72)',
      fontFamily: "'Neue Montreal', sans-serif",
      fontSize: 16,
      fontStyle: 'italic',
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.4,
      margin: '0 0 8px',
    }}>
      {display}
    </p>
  )
}

// ── Email pill ────────────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M2.66667 2.66667H13.3333C14.0667 2.66667 14.6667 3.26667 14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3333 13.3333H2.66667C1.93333 13.3333 1.33333 12.7333 1.33333 12V4C1.33333 3.26667 1.93333 2.66667 2.66667 2.66667Z" stroke="#E18F7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.6667 4L8 8.66667L1.33333 4" stroke="#E18F7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function EmailPill() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText('hanguyendo01@gmail.com')
    } catch {
      const el = document.createElement('textarea')
      el.value = 'hanguyendo01@gmail.com'
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        alignItems: 'center',
        alignSelf: 'flex-start',
        background: copied ? 'linear-gradient(to right, #c6c6be, #ededeb)' : '#ededeb',
        border: '1px solid #e8e8e8',
        borderRadius: 32,
        boxShadow: '1px 1px 0.5px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        display: 'inline-flex',
        gap: 4,
        padding: '4px 12px',
        transform: 'rotate(-4deg)',
        transformOrigin: 'left center',
      }}
    >
      <span style={{ display: 'grid', alignItems: 'center' }}>
        <span style={{ gridArea: '1/1', visibility: 'hidden', fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, fontWeight: 500, lineHeight: 1, whiteSpace: 'nowrap' }}>
          hanguyendo01@gmail.com
        </span>
        <span style={{ gridArea: '1/1', color: '#353535', fontFamily: "'Neue Montreal', sans-serif", fontSize: 16, fontStyle: copied ? 'italic' : 'normal', fontWeight: 500, lineHeight: 1, textAlign: 'center' }}>
          {copied ? 'copied!' : 'hanguyendo01@gmail.com'}
        </span>
      </span>
      <MailIcon />
    </button>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────

export default function InfoColumn() {
  const baseText: React.CSSProperties = {
    fontFamily: "'Neue Montreal', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.4,
    margin: 0,
  }

  return (
    <div style={{
      background: '#F7F7F7',
      borderRight: '1px solid rgba(71,62,61,0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'space-between',
      padding: '40px 32px',
      position: 'sticky',
      top: 0,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <AvatarVinyl />

        <p style={{
          color: '#473E3D',
          fontFamily: "'Recoleta', Georgia, serif",
          fontSize: 42,
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.05,
          margin: '16px 0 0',
        }}>
          Ha Do
        </p>

        <CyclingTitle />

        <p style={{ ...baseText, color: 'rgba(71,62,61,0.55)' }}>
          3 years of experience{' '}
          <span style={{ fontWeight: 500 }}>visually</span>
          {' '}making sense of complex/data-heavy products.
        </p>
        <p style={{ ...baseText, color: 'rgba(71,62,61,0.55)' }}>
          Exploring the AI wave and imprinting human delights in my arts.
        </p>

        <div style={{ marginTop: 8 }}>
          <EmailPill />
        </div>
      </div>

      <NycClock />
    </div>
  )
}
