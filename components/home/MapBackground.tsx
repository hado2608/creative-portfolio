'use client'

// Simplified line-art map connecting Buôn Ma Thuột, Vietnam ↔ Brooklyn, NY.
// All paths use pathLength="1" + CSS stroke-dashoffset animation.
// Location markers expose data-location attributes for Phase 3 hover interactions.

const STROKE = 'rgba(80, 90, 100, 0.2)'
const ARC_STROKE = 'rgba(80, 90, 100, 0.13)'
const DOT_FILL = 'rgba(80, 100, 130, 0.5)'

const PATHS = [
  // Vietnam coastline — simplified S-curve from north to south
  {
    d: 'M 1050,285 C 1068,310 1078,340 1068,372 C 1058,404 1040,420 1045,452 C 1050,482 1070,495 1060,520 C 1050,545 1032,555 1038,572',
    stroke: STROKE,
    width: 1.5,
    delay: '0.1s',
    duration: '1.4s',
  },
  // Surrounding SE Asia coastline hints (gives geographic context)
  {
    d: 'M 980,310 C 1000,295 1030,282 1050,285',
    stroke: STROKE,
    width: 1.2,
    delay: '0.3s',
    duration: '0.8s',
  },
  {
    d: 'M 1040,572 C 1020,590 995,600 970,598',
    stroke: STROKE,
    width: 1.2,
    delay: '0.5s',
    duration: '0.7s',
  },
  // NYC / Brooklyn area — simplified harbor + coastline
  {
    d: 'M 258,155 C 275,148 298,152 318,158 C 335,164 348,172 342,184 C 336,196 318,200 302,195 C 286,190 272,195 266,206 C 260,216 258,226 264,238',
    stroke: STROKE,
    width: 1.5,
    delay: '0.4s',
    duration: '1.2s',
  },
  // Long Island hint
  {
    d: 'M 305,162 C 325,156 355,155 382,162 C 405,168 422,175 430,183',
    stroke: STROKE,
    width: 1.2,
    delay: '0.6s',
    duration: '0.9s',
  },
]

// Connecting flight-path arc — drawn last
const ARC = {
  d: 'M 1055,435 C 890,50 470,30 285,198',
  stroke: ARC_STROKE,
  width: 1,
  delay: '1.1s',
  duration: '1.6s',
}

// Location marker positions
const MARKERS = [
  { cx: 1055, cy: 435, location: 'vietnam', delay: '1.6s' },
  { cx: 285, cy: 198, location: 'brooklyn', delay: '1.7s' },
]

export default function MapBackground({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        aria-hidden
      >
        {/* Coastline paths */}
        {PATHS.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            className={visible ? 'map-path map-path--animate' : 'map-path'}
            style={{
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        {/* Connecting arc — drawn last */}
        <path
          d={ARC.d}
          stroke={ARC.stroke}
          strokeWidth={ARC.width}
          strokeLinecap="round"
          pathLength="1"
          className={visible ? 'map-path map-path--animate' : 'map-path'}
          style={{
            animationDelay: ARC.delay,
            animationDuration: ARC.duration,
          }}
        />

        {/* Location dot markers — exposed for Phase 3 hover logic */}
        {MARKERS.map(({ cx, cy, location, delay }) => (
          <circle
            key={location}
            cx={cx}
            cy={cy}
            r="5"
            fill={DOT_FILL}
            data-location={location}
            className={visible ? 'map-dot map-dot--visible' : 'map-dot'}
            style={{ animationDelay: delay }}
          />
        ))}

        {/* Tiny inner dot for each marker (visual detail) */}
        {MARKERS.map(({ cx, cy, location, delay }) => (
          <circle
            key={`${location}-inner`}
            cx={cx}
            cy={cy}
            r="2"
            fill="rgba(80, 100, 130, 0.7)"
            className={visible ? 'map-dot map-dot--visible' : 'map-dot'}
            style={{ animationDelay: delay }}
          />
        ))}
      </svg>
    </div>
  )
}
