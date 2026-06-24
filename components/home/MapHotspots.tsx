'use client'

import { useState } from 'react'
import { useLocalTime } from '@/hooks/useLocalTime'

// All coords are in the shared 1440×900 SVG space.
// Maps and pins scale together via xMidYMid slice at any viewport size.

const LEFT_X = 91, LEFT_Y = 203, LEFT_W = 318, LEFT_H = 465
const LEFT_PIN_CX = LEFT_X + LEFT_W / 2   // 250 — rotation centre, stays fixed
const LEFT_PIN_CY = LEFT_Y + LEFT_H / 2   // 435
const LEFT_ROT = -16.34

const RIGHT_X = 1082, RIGHT_Y = 347, RIGHT_W = 242, RIGHT_H = 219
const RIGHT_PIN_CX = RIGHT_X + RIGHT_W / 2  // 1203
const RIGHT_PIN_CY = RIGHT_Y + RIGHT_H / 2  // 457

const TOOLTIP_W = 200
const TOOLTIP_H = 48

function Tooltip({ x, y, label, timeZone }: { x: number; y: number; label: string; timeZone: string }) {
  const time = useLocalTime(timeZone)
  return (
    <foreignObject x={x} y={y} width={TOOLTIP_W} height={TOOLTIP_H} style={{ pointerEvents: 'none' }}>
      <div className="map-tooltip">
        <span className="map-tooltip-label">{label}</span>
        <span className="map-tooltip-time">{time}</span>
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

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Left map (Vietnam outline) ─────────────────────────────────────────
            Hover the entire shape — transform on the <g> so the hit area
            matches the visible rotated image exactly. */}
        <g
          transform={`rotate(${LEFT_ROT} ${LEFT_PIN_CX} ${LEFT_PIN_CY})`}
          onMouseEnter={() => setHovered('vietnam')}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        >
          <image
            href="/assets/home-left-shape.svg"
            x={LEFT_X} y={LEFT_Y}
            width={LEFT_W} height={LEFT_H}
          />
          <Pin cx={LEFT_PIN_CX} cy={LEFT_PIN_CY} active={hovered === 'vietnam'} />
        </g>

        {/* Vietnam tooltip — rendered OUTSIDE the rotated group so it stays upright, adjacent to pin */}
        {hovered === 'vietnam' && (
          <Tooltip
            x={LEFT_PIN_CX + 16}
            y={LEFT_PIN_CY - TOOLTIP_H / 2}
            label="buôn ma thuột, vietnam"
            timeZone="Asia/Ho_Chi_Minh"
          />
        )}

        {/* ── Right map ──────────────────────────────────────────────────────── */}
        <g
          onMouseEnter={() => setHovered('brooklyn')}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        >
          <image
            href="/assets/home-right-map.svg"
            x={RIGHT_X} y={RIGHT_Y}
            width={RIGHT_W} height={RIGHT_H}
          />
          <Pin cx={RIGHT_PIN_CX} cy={RIGHT_PIN_CY} active={hovered === 'brooklyn'} />
        </g>

        {/* Brooklyn tooltip — to the left of the pin, adjacent */}
        {hovered === 'brooklyn' && (
          <Tooltip
            x={RIGHT_PIN_CX - TOOLTIP_W - 16}
            y={RIGHT_PIN_CY - TOOLTIP_H / 2}
            label="brooklyn, ny"
            timeZone="America/New_York"
          />
        )}
      </svg>
    </div>
  )
}
