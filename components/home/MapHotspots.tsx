'use client'

import { useState } from 'react'
import { useLocalTime } from '@/hooks/useLocalTime'

// All coordinates are in the shared 1440×900 SVG space.
// Maps and pins live in the same coordinate system so they always align.

// Left map: home-left-shape.svg (318×465), placed at (91,203), rotated -16.34° around its center
const LEFT_MAP = { x: 91, y: 203, w: 318, h: 465, rotateDeg: -16.34 }
// Rotation center = geometric center of the placed image
const LEFT_CX = LEFT_MAP.x + LEFT_MAP.w / 2   // 250
const LEFT_CY = LEFT_MAP.y + LEFT_MAP.h / 2   // 435

// Right map: home-right-map.svg (242×219), placed at (1082, 347)
const RIGHT_MAP = { x: 1082, y: 347, w: 242, h: 219 }

const HOTSPOTS = [
  {
    // Pin sits on the left (Vietnam outline) map — upper-centre of the shape
    cx: 240,
    cy: 360,
    location: 'brooklyn',
    label: 'brooklyn, ny',
    timeZone: 'America/New_York',
    tooltipAnchor: 'right' as const,
  },
  {
    // Pin sits on the right map — centre of the shape
    cx: RIGHT_MAP.x + RIGHT_MAP.w / 2,   // 1203
    cy: RIGHT_MAP.y + RIGHT_MAP.h / 2,   // 457
    location: 'vietnam',
    label: 'buôn ma thuột, vietnam',
    timeZone: 'Asia/Ho_Chi_Minh',
    tooltipAnchor: 'left' as const,
  },
]

const TOOLTIP_W = 176
const TOOLTIP_H = 44

function Hotspot({
  cx,
  cy,
  label,
  timeZone,
  tooltipAnchor,
}: (typeof HOTSPOTS)[0]) {
  const [active, setActive] = useState(false)
  const time = useLocalTime(timeZone)

  const tx = tooltipAnchor === 'left' ? cx - TOOLTIP_W - 14 : cx + 14
  const ty = cy - TOOLTIP_H / 2

  return (
    <g>
      {/* Subtle always-visible dot */}
      <circle cx={cx} cy={cy} r="3" fill="#4A7AB5" opacity="0.3" style={{ pointerEvents: 'none' }} />

      {/* Invisible hit area */}
      <circle
        cx={cx}
        cy={cy}
        r="28"
        fill="transparent"
        style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />

      {active && (
        <>
          <circle cx={cx} cy={cy} r="12" fill="none" stroke="#4A7AB5" strokeWidth="1.5" opacity="0.35" style={{ pointerEvents: 'none' }} />
          <circle cx={cx} cy={cy} r="5" fill="#4A7AB5" style={{ pointerEvents: 'none' }} />
          <foreignObject x={tx} y={ty} width={TOOLTIP_W} height={TOOLTIP_H}>
            <div className="map-tooltip">
              <span className="map-tooltip-label">{label}</span>
              <span className="map-tooltip-time">{time}</span>
            </div>
          </foreignObject>
        </>
      )}
    </g>
  )
}

export default function MapHotspots({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {/* Maps live inside the SVG so they share the same coordinate space as the pins */}
        <image
          href="/assets/home-left-shape.svg"
          x={LEFT_MAP.x} y={LEFT_MAP.y}
          width={LEFT_MAP.w} height={LEFT_MAP.h}
          transform={`rotate(${LEFT_MAP.rotateDeg} ${LEFT_CX} ${LEFT_CY})`}
        />
        <image
          href="/assets/home-right-map.svg"
          x={RIGHT_MAP.x} y={RIGHT_MAP.y}
          width={RIGHT_MAP.w} height={RIGHT_MAP.h}
        />

        {HOTSPOTS.map((h) => (
          <Hotspot key={h.location} {...h} />
        ))}
      </svg>
    </div>
  )
}
