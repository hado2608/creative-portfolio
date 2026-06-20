'use client'

import { useEffect, useState } from 'react'

// 12 concentric elliptical ridges forming a fingerprint whorl.
// Each ridge grows outward and rotates slightly for an organic spiral feel.
const RIDGES = Array.from({ length: 12 }, (_, i) => {
  const cx = 100
  const cy = 125
  const rx = +(4 + i * 7.5).toFixed(1)
  const ry = +(5 + i * 9.5).toFixed(1)
  const xrot = i * 5
  // Two-arc trick to draw a full ellipse as a single <path>
  const d = `M ${cx - rx},${cy} a ${rx},${ry} ${xrot} 1 0 ${rx * 2},0 a ${rx},${ry} ${xrot} 1 0 ${-rx * 2},0`
  return { d, delay: i * 55 }
})

export default function FingerprintLoader({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Last ridge finishes at ~955ms (11 × 55ms delay + 350ms draw duration).
    // Hold until 1400ms total, then fade out over 420ms, then fire onComplete.
    const holdTimer = setTimeout(() => {
      setFading(true)
      setTimeout(onComplete, 420)
    }, 1400)

    return () => clearTimeout(holdTimer)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(0.96)' : 'scale(1)',
        transition: fading ? 'opacity 420ms ease-out, transform 420ms ease-out' : 'none',
        pointerEvents: fading ? 'none' : 'all',
      }}
      aria-hidden
    >
      <svg
        width="200"
        height="250"
        viewBox="0 0 200 250"
        fill="none"
      >
        {/* Center core dot — always visible */}
        <circle cx="100" cy="125" r="2.5" fill="#7C6357" opacity="0.65" />

        {/* Ridges draw in sequentially from center outward */}
        {RIDGES.map(({ d, delay }, i) => (
          <path
            key={i}
            d={d}
            stroke="#7C6357"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
            pathLength="1"
            style={{
              strokeDasharray: '1',
              strokeDashoffset: '1',
              animation: `fp-draw 0.35s ease-out ${delay}ms both`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
