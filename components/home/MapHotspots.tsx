'use client'

import { useState } from 'react'
import { useLocalTime } from '@/hooks/useLocalTime'

const HOTSPOTS = [
  {
    cx: 1055,
    cy: 435,
    location: 'vietnam',
    label: 'buôn ma thuột, vietnam',
    timeZone: 'Asia/Ho_Chi_Minh',
    tooltipAnchor: 'left' as const,  // near right edge — tooltip goes left
  },
  {
    cx: 285,
    cy: 198,
    location: 'brooklyn',
    label: 'brooklyn, ny',
    timeZone: 'America/New_York',
    tooltipAnchor: 'right' as const,
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
      {/* Invisible hit area — generous 28px radius so it's easy to hover */}
      <circle
        cx={cx}
        cy={cy}
        r="28"
        fill="transparent"
        style={{ cursor: 'default', pointerEvents: 'all' }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />

      {active && (
        <foreignObject x={tx} y={ty} width={TOOLTIP_W} height={TOOLTIP_H}>
          <div className="map-tooltip">
            <span className="map-tooltip-label">{label}</span>
            <span className="map-tooltip-time">{time}</span>
          </div>
        </foreignObject>
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
      >
        {HOTSPOTS.map((h) => (
          <Hotspot key={h.location} {...h} />
        ))}
      </svg>
    </div>
  )
}
