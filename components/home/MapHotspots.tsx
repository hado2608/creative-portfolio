'use client'

import { useState, useEffect } from 'react'

const LEFT_X = 91, LEFT_Y = 203, LEFT_W = 318, LEFT_H = 465
const LEFT_PIN_CX = LEFT_X + LEFT_W / 2   // 250
const LEFT_PIN_CY = LEFT_Y + LEFT_H / 2   // 435
const LEFT_ROT = -16.34

const RIGHT_X = 1082, RIGHT_Y = 347, RIGHT_W = 242, RIGHT_H = 219
const RIGHT_PIN_CX = RIGHT_X + RIGHT_W / 2  // 1203
const RIGHT_PIN_CY = RIGHT_Y + RIGHT_H / 2  // 457

const VIEWBOX_W = 1440, VIEWBOX_H = 900

// Convert SVG viewBox coords → screen px, accounting for xMidYMid slice scaling
function svgToScreen(svgX: number, svgY: number, vw: number, vh: number) {
  const scale = Math.max(vw / VIEWBOX_W, vh / VIEWBOX_H)
  const offsetX = (vw - VIEWBOX_W * scale) / 2
  const offsetY = (vh - VIEWBOX_H * scale) / 2
  return { x: svgX * scale + offsetX, y: svgY * scale + offsetY }
}

function Pin({ cx, cy, active }: { cx: number; cy: number; active: boolean }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={3} fill="#4A7AB5" opacity={0.3} style={{ pointerEvents: 'none' }} />
      {active && (
        <>
          <circle cx={cx} cy={cy} r={12} fill="none" stroke="#4A7AB5" strokeWidth={1.5} opacity={0.35} style={{ pointerEvents: 'none' }} />
          <circle cx={cx} cy={cy} r={5} fill="#4A7AB5" style={{ pointerEvents: 'none' }} />
        </>
      )}
    </>
  )
}

export default function MapHotspots({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState<'brooklyn' | 'vietnam' | null>(null)
  const [viewport, setViewport] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!visible) return null

  const svgProps = {
    viewBox: '0 0 1440 900',
    preserveAspectRatio: 'xMidYMid slice' as const,
    style: { width: '100%', height: '100%', position: 'absolute' as const, inset: 0 },
    fill: 'none',
  }

  const { w, h } = viewport
  const brooklynScreen = w ? svgToScreen(RIGHT_PIN_CX, RIGHT_PIN_CY, w, h) : null
  const vietnamScreen  = w ? svgToScreen(LEFT_PIN_CX,  LEFT_PIN_CY,  w, h) : null

  return (
    <>
      {/* ── Layer 1: map shapes — below ID card ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
        <svg {...svgProps}>
          <g
            transform={`rotate(${LEFT_ROT} ${LEFT_PIN_CX} ${LEFT_PIN_CY})`}
            onMouseEnter={() => setHovered('vietnam')}
            onMouseLeave={() => setHovered(null)}
            style={{ pointerEvents: 'all' }}
          >
            <image href="/assets/home-left-shape.svg" x={LEFT_X} y={LEFT_Y} width={LEFT_W} height={LEFT_H} />
          </g>
          <g
            onMouseEnter={() => setHovered('brooklyn')}
            onMouseLeave={() => setHovered(null)}
            style={{ pointerEvents: 'all' }}
          >
            <image href="/assets/home-right-map.svg" x={RIGHT_X} y={RIGHT_Y} width={RIGHT_W} height={RIGHT_H} />
          </g>
        </svg>
      </div>

      {/* ── Layer 2: pins — above ID card ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
        <svg {...svgProps}>
          <Pin cx={LEFT_PIN_CX}  cy={LEFT_PIN_CY}  active={hovered === 'vietnam'} />
          <Pin cx={RIGHT_PIN_CX} cy={RIGHT_PIN_CY} active={hovered === 'brooklyn'} />
        </svg>
      </div>

      {/* ── Layer 3: HTML tooltips — fixed 16px, immune to SVG scaling ── */}
      {hovered === 'vietnam' && vietnamScreen && (
        <div style={{
          position: 'fixed',
          left: vietnamScreen.x + 14,
          top: vietnamScreen.y - 20,
          zIndex: 15,
          pointerEvents: 'none',
        }}>
          <div className="map-tooltip">Buôn Ma Thuột, Việt Nam</div>
        </div>
      )}
      {hovered === 'brooklyn' && brooklynScreen && (
        <div style={{
          position: 'fixed',
          left: brooklynScreen.x - 14,
          top: brooklynScreen.y - 20,
          transform: 'translateX(-100%)',
          zIndex: 15,
          pointerEvents: 'none',
        }}>
          <div className="map-tooltip">Brooklyn, NY</div>
        </div>
      )}
    </>
  )
}
