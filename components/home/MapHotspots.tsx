'use client'

import { useState } from 'react'

// All coords are in the shared 1440×900 SVG space.
const LEFT_X = 91, LEFT_Y = 203, LEFT_W = 318, LEFT_H = 465
const LEFT_PIN_CX = LEFT_X + LEFT_W / 2   // 250
const LEFT_PIN_CY = LEFT_Y + LEFT_H / 2   // 435
const LEFT_ROT = -16.34

const RIGHT_X = 1082, RIGHT_Y = 347, RIGHT_W = 242, RIGHT_H = 219
const RIGHT_PIN_CX = RIGHT_X + RIGHT_W / 2  // 1203
const RIGHT_PIN_CY = RIGHT_Y + RIGHT_H / 2  // 457

const TOOLTIP_H = 40
const TOOLTIP_W = 220

function Tooltip({ x, y, label, alignRight }: { x: number; y: number; label: string; alignRight?: boolean }) {
  return (
    <foreignObject x={x} y={y} width={400} height={TOOLTIP_H} style={{ pointerEvents: 'none', overflow: 'visible' }}>
      <div style={alignRight ? { display: 'flex', justifyContent: 'flex-end' } : undefined}>
        <div className="map-tooltip">{label}</div>
      </div>
    </foreignObject>
  )
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

  if (!visible) return null

  const svgProps = {
    viewBox: '0 0 1440 900',
    preserveAspectRatio: 'xMidYMid slice' as const,
    style: { width: '100%', height: '100%', position: 'absolute' as const, inset: 0 },
    fill: 'none',
  }

  return (
    <>
      {/* ── Layer 1: map shapes — below ID card (root z-index 5) ── */}
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

      {/* ── Layer 2: pins + tooltips — above ID card (root z-index 15) ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
        <svg {...svgProps}>
          <Pin cx={LEFT_PIN_CX} cy={LEFT_PIN_CY} active={hovered === 'vietnam'} />
          {hovered === 'vietnam' && (
            <Tooltip x={LEFT_PIN_CX + 12} y={LEFT_PIN_CY - TOOLTIP_H / 2} label="Buôn Ma Thuột, Việt Nam" />
          )}
          <Pin cx={RIGHT_PIN_CX} cy={RIGHT_PIN_CY} active={hovered === 'brooklyn'} />
          {hovered === 'brooklyn' && (
            <Tooltip x={RIGHT_PIN_CX - 400 - 12} y={RIGHT_PIN_CY - TOOLTIP_H / 2} label="Brooklyn, NY" alignRight />
          )}
        </svg>
      </div>
    </>
  )
}
