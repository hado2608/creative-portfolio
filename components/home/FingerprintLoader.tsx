'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Stamp: 1 000ms linear scale-down from 3× to 1×, centered
// Float: 1 000ms window (1 000ms–2 000ms) — texts fade in/out
// Counter: 1 500ms ease-in-cubic rAF, Geist Mono
// Exit: 400ms fade-out

const STAMP_MS   = 300
const FLOAT_END  = 2000
const COUNT_MS   = 1500
const EXIT_MS    = 400

type Phase = 'stamp' | 'float' | 'counter' | 'exit'

export default function FingerprintLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('stamp')
  const [count, setCount] = useState(1)
  const rafRef   = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const doneRef  = useRef(false)

  // ── Phase sequencer ──────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('float'),   STAMP_MS)
    const t2 = setTimeout(() => setPhase('counter'), FLOAT_END)
    const t3 = setTimeout(() => setPhase('exit'),    FLOAT_END + COUNT_MS)
    const t4 = setTimeout(() => {
      if (!doneRef.current) { doneRef.current = true; onComplete() }
    }, FLOAT_END + COUNT_MS + EXIT_MS)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  // ── Counter — ease-in cubic so it rushes toward 100% ─────────────────────
  useEffect(() => {
    if (phase !== 'counter') return
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const t = Math.min((now - startRef.current) / COUNT_MS, 1)
      setCount(Math.min(Math.round(t * t * t * 99) + 1, 100))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  const showTexts   = phase === 'float'
  const showCounter = phase === 'counter' || phase === 'exit'
  const isExiting   = phase === 'exit'

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: '#0183c6', overflow: 'hidden',
        pointerEvents: isExiting ? 'none' : 'all',
        opacity:    isExiting ? 0 : 1,
        transition: isExiting ? `opacity ${EXIT_MS}ms ease-out` : 'none',
      }}
      aria-hidden
    >
      {/* ── Grid (40px, rgba 5%) ─────────────────────────────────────────── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="fp-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(189,198,207,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fp-grid)" />
      </svg>

      {/* ── Fingerprint — centered, scales 3× → 1×, then floats left/right ─ */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}>
        {/* Sway layer — starts after stamp settles */}
        <motion.div
          animate={phase !== 'stamp' ? { x: [-5, 5], y: [-3, 3] } : { x: 0, y: 0 }}
          transition={phase !== 'stamp' ? {
            x: { repeat: Infinity, repeatType: 'mirror', duration: 2, ease: 'easeInOut' },
            y: { repeat: Infinity, repeatType: 'mirror', duration: 2, ease: 'easeInOut', delay: 0.5 },
          } : { duration: 0 }}
        >
          <motion.img
            src="/assets/fingerprint.png"
            alt=""
            draggable={false}
            initial={{ scale: 3 }}
            animate={{ scale: 1 }}
            transition={{ duration: STAMP_MS / 1000, ease: 'linear' }}
            style={{
              display: 'block',
              width: 'min(373px, 62vw)',
              height: 'min(539px, 89.6vw)', // preserves 373:539 ratio
              objectFit: 'cover',
              userSelect: 'none',
            }}
          />
        </motion.div>
      </div>

      {/* ── [ identifying ] ───────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showTexts ? 1 : 0 }}
        transition={{
          opacity: showTexts
            ? { duration: 0.5, delay: 0.1, ease: [0.5, 0, 0.5, 1] }
            : { duration: 0.3, ease: [0.5, 0, 0.5, 1] },
        }}
        style={{
          position: 'absolute',
          left: 'calc(37.5% - 40.74px)', top: 'calc(50% - 97.84px)',
          margin: 0,
          fontFamily: "'Neue Montreal', sans-serif",
          fontWeight: 400, fontSize: 'clamp(14px, 3.8vw, 24px)', lineHeight: 'normal',
          color: '#f7f7f7', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}
      >
        [ identifying ]
      </motion.p>

      {/* ── [ a product designer ] ────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showTexts ? 1 : 0 }}
        transition={{
          opacity: showTexts
            ? { duration: 0.5, delay: 0.3, ease: [0.5, 0, 0.5, 1] }
            : { duration: 0.3, ease: [0.5, 0, 0.5, 1] },
        }}
        style={{
          position: 'absolute',
          left: 'calc(62.5% - 113.6px)', top: 'calc(50% + 65.05px)',
          margin: 0,
          fontFamily: "'Neue Montreal', sans-serif",
          fontWeight: 400, fontSize: 'clamp(14px, 3.8vw, 24px)', lineHeight: 'normal',
          color: '#f7f7f7', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}
      >
        [ a product designer ]
      </motion.p>

      {/* ── Counter ───────────────────────────────────────────────────────── */}
      {showCounter && (
        <div style={{
          position: 'absolute', left: '50%', top: 'calc(50% - clamp(33px, 9vw, 90px))',
          transform: 'translateX(-50%)', pointerEvents: 'none',
        }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="fp-counter"
            style={{
              margin: 0,
              fontWeight: 400, fontSize: 'clamp(56px, 18vw, 150px)', lineHeight: 1,
              color: '#ffffff', whiteSpace: 'nowrap',
            }}
          >
            {count}%
          </motion.p>
        </div>
      )}
    </div>
  )
}
