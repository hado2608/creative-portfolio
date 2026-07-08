'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FingerprintLoader from '@/components/home/FingerprintLoader'
import HomeBackground from '@/components/home/HomeBackground'
import IDCard from '@/components/home/IDCard'
import MapHotspots from '@/components/home/MapHotspots'
import WorkGridSection from '@/components/work/WorkGridSection'

// Resets on hard reload (module re-evaluates). Persists across SPA nav (module stays cached).
let loaderShown = false

// Smoothstep + segment helpers for choreographing the reveal off scroll progress
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => t * t * (3 - 2 * t)
const seg = (p: number, a: number, b: number) => smooth(clamp01((p - a) / (b - a)))

export default function Home() {
  const [ready, setReady] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
  // Which artifacts are mounted. They mount early (while still invisible at
  // reveal=0) and are then animated purely by scroll progress, so nothing
  // "pops" — the whole sequence reads as one connected scroll.
  const [stage, setStage] = useState(0)
  const stageRef = useRef(0)

  const router = useRouter()
  const navigating = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    return () => { delete document.documentElement.dataset.theme }
  }, [])

  // Hold the page still while the fingerprint loader is on screen so the reveal
  // starts cleanly from the top; release once it finishes (desktop only).
  useEffect(() => {
    if (window.innerWidth <= 760) return
    document.documentElement.style.overflow = mapVisible ? '' : 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [mapVisible])

  useEffect(() => {
    if (loaderShown) {
      setMapVisible(true)
    } else {
      loaderShown = true  // mark before loader plays so SPA return never re-shows it
    }
    // Mobile hides the intro and scrolls the card in-flow — show everything at once
    if (window.innerWidth <= 760) {
      stageRef.current = 2
      setStage(2)
    }
    setReady(true)
  }, [])

  // Desktop: one continuous scroll drives the whole scene. The hero is pinned
  // (sticky) over a tall runway; scroll progress through that runway scrubs the
  // artifacts up with overlapping ranges, then the sticky releases and the page
  // flows through the gradient bridge into the work grid — no lock, no jump.
  useEffect(() => {
    const bump = (s: number) => {
      if (s <= stageRef.current) return
      stageRef.current = s
      setStage(s)
    }

    const isMobile = () => window.innerWidth <= 760

    const onScroll = () => {
      if (isMobile()) return
      const runway = document.querySelector('.hero-runway') as HTMLElement | null
      const hero = document.querySelector('.hero-page') as HTMLElement | null
      if (!runway || !hero) return

      const vh = window.innerHeight
      // Progress through the pinned runway: 0 at the very top, 1 once the hero
      // is about to unstick. Reveal is choreographed to finish a touch early.
      const pinned = Math.max(1, runway.offsetHeight - vh)
      const p = clamp01(window.scrollY / (pinned * 0.82))

      // Overlapping ranges so the card is still settling as the maps begin —
      // the pieces hand off to one another instead of appearing in isolation
      const intro = seg(p, 0.14, 0.55)   // 0 → 1 as intro drifts up + fades
      const card = seg(p, 0.05, 0.52)
      const map = seg(p, 0.30, 0.80)

      hero.style.setProperty('--intro-shift', intro.toFixed(3))
      hero.style.setProperty('--card-reveal', card.toFixed(3))
      hero.style.setProperty('--map-reveal', map.toFixed(3))
      hero.style.setProperty('--card-pe', card > 0.5 ? 'auto' : 'none')
      hero.style.setProperty('--map-pe', map > 0.5 ? 'auto' : 'none')

      // Mount artifacts early but invisible, so they only ever fade UP into view
      if (p > 0.01) bump(1)
      if (p > 0.02) bump(2)

      // Footer flips to light once the scroll crosses into the gradient bridge
      const flipAt = runway.offsetTop + runway.offsetHeight - vh * 0.6
      if (window.scrollY > flipAt) delete document.documentElement.dataset.theme
      else document.documentElement.dataset.theme = 'dark'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [mapVisible])

  // Mobile only: swipe up at the bottom of the card navigates to /work
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 760
    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60

    const go = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'down'
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/work') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        const el = (document as Document).querySelector('.hero-page') as HTMLElement | null
        if (el) { el.classList.add('page-slide-out-up'); setTimeout(nav, 340) }
        else nav()
      }
    }

    const onWheel = (e: WheelEvent) => { if (isMobile() && e.deltaY > 30 && atBottom()) go() }
    const touch = { y: 0 }
    const onTouchStart = (e: TouchEvent) => { touch.y = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (isMobile() && touch.y - e.changedTouches[0].clientY > 40 && atBottom()) go()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [router])

  return (
    <>
      {/* Tall runway: the hero pins (sticky) while the artifacts scrub in */}
      <div className="hero-runway">
        <div className="hero-page">
          {/* Static background — grid + country silhouette shapes */}
          <HomeBackground />

          {/* Intro copy — top left */}
          <div className="hero-intro">
            <p>
              Hey, I&rsquo;m Ha! I&rsquo;m currently a product designer at Conduit Gaming.
              I love bold yet simple ideas that make people flourish.
            </p>
            <p className="hero-intro-hint">Scroll down or use your arrow keys to navigate!</p>
          </div>

          {/* Nothing renders until after hydration — prevents SSR/client mismatch */}
          {ready && !mapVisible && (
            <FingerprintLoader onComplete={() => {
              setMapVisible(true)
            }} />
          )}

          {/* Carabiner hook — enters from the left viewport edge, clips over the card */}
          {ready && mapVisible && stage >= 1 && (
            <div className="hero-hook" aria-hidden>
              <img src="/assets/hook.svg" alt="" className="hero-hook-img" />
            </div>
          )}

          {/* ID card — rises in first as the user scrolls */}
          {ready && mapVisible && stage >= 1 && <IDCard />}

          {/* Map shapes — rise in, overlapping the tail of the card's entrance */}
          <MapHotspots visible={mapVisible && stage >= 2} />

          {/* Mobile only: in-flow spacer that makes the page tall enough to scroll through the full card */}
          <div className="mobile-card-spacer" aria-hidden />
        </div>
      </div>

      {/* Desktop: seamless continuation into the work grid — dark fades to
          light across the bridge, then the case studies rise in as you scroll */}
      <div className="home-work-bridge" aria-hidden />
      <section className="home-work-section">
        <WorkGridSection />
      </section>
    </>
  )
}
