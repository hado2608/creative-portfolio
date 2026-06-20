'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useSpring2D } from '@/hooks/useSpring2D'

const MAX_TILT = 7

export default function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const glossRef = useRef<HTMLDivElement>(null)
  const hoveringRef = useRef(false)
  const reducedMotion = useRef(false)

  const { value, setTarget } = useSpring2D({ stiffness: 160, damping: 10 })

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Idle sway — subtle 3D breathe when not hovering
  useEffect(() => {
    if (reducedMotion.current) return
    let frame: number
    let start: number | null = null
    const tick = (t: number) => {
      if (start === null) start = t
      if (!hoveringRef.current) {
        const s = (t - start) / 1000
        setTarget(Math.sin(s * 1.1) * 1.8, Math.sin(s * 0.8 + 0.9) * 0.9)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [setTarget])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion.current || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      setTarget(nx * MAX_TILT, ny * MAX_TILT)
      if (glossRef.current) {
        const px = ((e.clientX - rect.left) / rect.width) * 100
        const py = ((e.clientY - rect.top) / rect.height) * 100
        glossRef.current.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.2) 0%, transparent 55%)`
      }
    },
    [setTarget],
  )

  const handleMouseEnter = useCallback(() => {
    hoveringRef.current = true
    if (glossRef.current) glossRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    hoveringRef.current = false
    setTarget(0, 0)
    if (glossRef.current) {
      glossRef.current.style.opacity = '0'
      glossRef.current.style.background = ''
    }
  }, [setTarget])

  // Apply tilt + dynamic shadow via direct DOM mutation (no React re-render per frame)
  useEffect(() => {
    if (reducedMotion.current) return
    const rx = -value.y
    const ry = value.x
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      cardRef.current.style.boxShadow = [
        `${-ry * 2}px ${rx * 1.5 + 14}px 48px rgba(0,0,0,0.12)`,
        `${-ry * 0.5}px ${rx * 0.3 + 3}px 8px rgba(0,0,0,0.06)`,
      ].join(', ')
    }
  }, [value])

  return (
    <div className="id-assembly">
      {/* Dangler loop — comes from off-screen top */}
      <div className="id-dangler-wrap">
        <img src="/assets/dangler.svg" alt="" className="id-dangler-img" aria-hidden />
      </div>

      {/* Thread connecting dangler to card */}
      <div className="id-thread" aria-hidden />

      {/* Perspective wrapper */}
      <div className="id-card-scene">
        {/* Card outer — tilt target */}
        <div
          className="id-card-outer"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gloss highlight follows cursor */}
          <div className="id-card-gloss" ref={glossRef} aria-hidden />

          {/* Card inner — white surface */}
          <div className="id-card-inner">
            {/* "design license" wide spaced header */}
            <p className="id-card-header">design license</p>

            {/* Punch holes */}
            <div className="id-holes-bar">
              <img src="/assets/card-holes.svg" alt="" aria-hidden />
            </div>

            {/* Photo section — left side */}
            <div className="id-photo-section">
              <p className="id-photo-tag">professional viber (vibe-coder)</p>
              <div className="id-photo-img-wrap">
                <img src="/assets/ha-photo.jpg" alt="Ha Do" className="id-photo-img" />
                <div className="id-photo-gradient" aria-hidden />
              </div>
            </div>

            {/* Ha Do name */}
            <p className="id-name">Ha Do</p>

            {/* Handwritten signature overlaid on photo bottom */}
            <div className="id-signature-wrap" aria-hidden>
              <img src="/assets/card-signature.svg" alt="" className="id-signature-img" />
            </div>

            {/* Info boxes — right column */}
            <div className="id-info-boxes">
              <div className="id-info-box">
                <span className="id-info-label">role</span>
                <span className="id-info-value">product designer / design engineer</span>
              </div>
              <div className="id-info-box">
                <span className="id-info-label">experience</span>
                <span className="id-info-value">3+ years shipping startups</span>
              </div>
              <div className="id-info-box id-info-box--last">
                <span className="id-info-label">philosophy</span>
                <span className="id-info-value">
                  to design is to put a&nbsp;
                  <img src="/assets/card-smiley.png" alt="smile" className="id-smiley" />
                  &nbsp;on people
                </span>
              </div>
            </div>
          </div>

          {/* Resume panel — attached to right edge of outer card */}
          <a
            href="/assets/sample-script.pdf"
            className="id-resume-panel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/resume-icon.svg" alt="" className="id-resume-icon" aria-hidden />
            <span className="id-resume-label">my resume</span>
          </a>
        </div>
      </div>
    </div>
  )
}
