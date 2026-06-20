'use client'

export default function HomeBackground() {
  return (
    <div className="home-bg" aria-hidden>
      <div className="home-bg-grid" />
      <img
        src="/assets/home-left-shape.svg"
        className="home-bg-left"
        alt=""
      />
      <img
        src="/assets/home-right-map.svg"
        className="home-bg-right"
        alt=""
      />
    </div>
  )
}
