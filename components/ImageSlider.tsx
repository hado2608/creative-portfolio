'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SANS = "'Neue Montreal', sans-serif"

export default function ImageSlider({ slides, caption }: { slides: string[]; caption?: string }) {
  const n = slides.length
  // Virtual track: [clone-of-last, ...slides, clone-of-first]
  // Real slides live at positions 1..n; clones at 0 and n+1 for seamless wrapping
  const [pos, setPos]         = useState(1)
  const [animated, setAnimated] = useState(true)
  const containerRef          = useRef<HTMLDivElement>(null)

  const displayIndex = (pos - 1 + n) % n
  const virtualSlides = [slides[n - 1], ...slides, slides[0]]

  const goTo = useCallback((newPos: number) => {
    setAnimated(true)
    setPos(newPos)
  }, [])

  const prev = useCallback(() => goTo(pos - 1), [goTo, pos])
  const next = useCallback(() => goTo(pos + 1), [goTo, pos])

  // When slide lands on a clone, instantly snap to the real counterpart
  const onTransitionEnd = useCallback(() => {
    if (pos === 0)     { setAnimated(false); setPos(n) }
    if (pos === n + 1) { setAnimated(false); setPos(1) }
  }, [pos, n])

  // Re-enable animation on the frame after a snap so the next move animates
  useEffect(() => {
    if (animated) return
    const id = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [animated])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <div ref={containerRef} tabIndex={0} style={{ marginTop: 32, marginBottom: 8, outline: 'none' }}>
      <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', lineHeight: 0 }}>

        {/* Sliding track */}
        <div
          onTransitionEnd={onTransitionEnd}
          style={{
            display: 'flex',
            transform: `translateX(-${pos * 100}%)`,
            transition: animated ? 'transform 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          }}
        >
          {virtualSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              draggable={false}
              style={{ flex: '0 0 100%', width: '100%', height: 'auto', display: 'block' }}
            />
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: 'absolute', left: 16, top: '50%',
            transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            border: 'none',
            background: 'rgba(247, 247, 247, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="#473E3D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: 'absolute', right: 16, top: '50%',
            transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            border: 'none',
            background: 'rgba(247, 247, 247, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="#473E3D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Caption left · dots + counter right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={{ fontSize: 13, color: 'var(--color-warm-muted)', fontFamily: SANS, lineHeight: 1.5 }}>
          {caption}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i + 1)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === displayIndex ? 16 : 6,
                  height: 6, borderRadius: 3,
                  border: 'none',
                  background: i === displayIndex ? 'var(--color-warm-accent)' : 'var(--color-warm-border)',
                  cursor: 'pointer', padding: 0,
                  transition: 'width 200ms, background 200ms',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-warm-muted)', fontFamily: SANS, letterSpacing: '0.05em' }}>
            {displayIndex + 1} / {n}
          </span>
        </div>
      </div>
    </div>
  )
}
