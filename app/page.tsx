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

export default function Home() {
  const [ready, setReady] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
  // Scroll-driven staged reveal: 0 = intro copy only, 1 = + ID card (and hook),
  // 2 = + map shapes. Once the reveal completes, native scrolling unlocks and
  // the page continues seamlessly into the work grid below (no navigation).
  const [stage, setStage] = useState(0)
  const stageRef = useRef(0)
  const progressRef = useRef(0)

  const router = useRouter()
  const navigating = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    return () => { delete document.documentElement.dataset.theme }
  }, [])

  // Footer flips to its light styling once the scroll is past the gradient
  // bridge into the work section (hero visuals are hardcoded dark, so only
  // theme-dependent chrome like the footer changes)
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth <= 760) return
      if (window.scrollY > window.innerHeight * 0.7) {
        delete document.documentElement.dataset.theme
      } else {
        document.documentElement.dataset.theme = 'dark'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    } else {
      // Desktop: hold the page still while the artifacts reveal
      document.documentElement.style.overflow = 'hidden'
    }
    setReady(true)
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  useEffect(() => {
    const bump = (s: number) => {
      if (s <= stageRef.current) return
      stageRef.current = s
      setStage(s)
    }

    // Mobile only: swipe up at the bottom of the card navigates to /work
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

    const isMobile = () => window.innerWidth <= 760
    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60

    // Scroll-linked reveal: map accumulated scroll to 0→1 values that CSS uses
    // to slide the artifacts up from below (card first, maps trailing behind)
    const REVEAL_DONE = 420
    const applyReveal = (p: number) => {
      const hero = document.querySelector('.hero-page') as HTMLElement | null
      if (!hero) return
      const card = Math.min(1, Math.max(0, (p - 10) / 250))
      const map = Math.min(1, Math.max(0, (p - 130) / 290))
      hero.style.setProperty('--card-reveal', card.toFixed(3))
      hero.style.setProperty('--map-reveal', map.toFixed(3))
      // Don't leave an invisible-but-hoverable card behind when scrubbed away
      hero.style.setProperty('--card-pe', card > 0.5 ? 'auto' : 'none')
    }

    // Desktop: while the page is pinned at the top, fold scroll into a virtual
    // progress value that scrubs the reveal (both directions). Once the reveal
    // completes, unlock native scrolling so the page flows straight into the
    // work section below — one continuous page, no navigation.
    const advanceDesktop = (delta: number) => {
      if (window.scrollY > 0 || delta === 0) return
      const step = Math.max(-100, Math.min(delta, 100)) // damp fast flicks
      progressRef.current = Math.min(REVEAL_DONE, Math.max(0, progressRef.current + step))
      const p = progressRef.current
      applyReveal(p)
      if (p > 2) bump(1)
      if (p > 130) bump(2)
      document.documentElement.style.overflow = p >= REVEAL_DONE ? '' : 'hidden'
    }

    const onWheel = (e: WheelEvent) => {
      if (isMobile()) { if (e.deltaY > 30 && atBottom()) go(); return }
      advanceDesktop(e.deltaY)
    }
    const onKey = (e: KeyboardEvent) => {
      const down = e.key === 'ArrowDown' || e.key === 'PageDown'
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      if (isMobile()) { if (down && atBottom()) go(); return }
      const step = e.key === 'PageDown' || e.key === 'PageUp' ? window.innerHeight : 130
      advanceDesktop(down ? step : -step)
    }
    const touch = { y: 0 }
    const onTouchStart = (e: TouchEvent) => { touch.y = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (isMobile()) return
      const dy = touch.y - e.touches[0].clientY
      touch.y = e.touches[0].clientY
      advanceDesktop(dy)
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (isMobile() && touch.y - e.changedTouches[0].clientY > 40 && atBottom()) go()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [router])

  return (
    <>
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

        {/* Map shapes — rise in a beat after the card */}
        <MapHotspots visible={mapVisible && stage >= 2} />

        {/* Mobile only: in-flow spacer that makes the page tall enough to scroll through the full card */}
        <div className="mobile-card-spacer" aria-hidden />
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
