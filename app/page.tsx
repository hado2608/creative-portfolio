'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FingerprintLoader from '@/components/home/FingerprintLoader'
import HomeBackground from '@/components/home/HomeBackground'
import IDCard from '@/components/home/IDCard'
import MapHotspots from '@/components/home/MapHotspots'

// Resets on hard reload (module re-evaluates). Persists across SPA nav (module stays cached).
let loaderShown = false

export default function Home() {
  const [ready, setReady] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    return () => { delete document.documentElement.dataset.theme }
  }, [])

  useEffect(() => {
    if (loaderShown) {
      setMapVisible(true)
    } else {
      loaderShown = true  // mark before loader plays so SPA return never re-shows it
    }
    setReady(true)
  }, [])

  const router = useRouter()
  const navigating = useRef(false)

  useEffect(() => {
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

    const onWheel = (e: WheelEvent) => { if (e.deltaY > 30 && (!isMobile() || atBottom())) go() }
    const touchStart = { y: 0 }
    const onTouchStart = (e: TouchEvent) => { touchStart.y = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => { if (touchStart.y - e.changedTouches[0].clientY > 40 && (!isMobile() || atBottom())) go() }

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
    <div className="hero-page">
      {/* Static background — grid + country silhouette shapes */}
      <HomeBackground />

      {/* Nothing renders until after hydration — prevents SSR/client mismatch */}
      {ready && !mapVisible && (
        <FingerprintLoader onComplete={() => {
          setMapVisible(true)
        }} />
      )}

      {/* ID card — mounts after loader, drop-in animation plays on mount */}
      {ready && mapVisible && <IDCard />}

      {/* Phase 3: map hotspot tooltips */}
      <MapHotspots visible={mapVisible} />

      {/* Mobile only: in-flow spacer that makes the page tall enough to scroll through the full card */}
      <div className="mobile-card-spacer" aria-hidden />
    </div>
  )
}
