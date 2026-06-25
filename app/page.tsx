'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FingerprintLoader from '@/components/home/FingerprintLoader'
import HomeBackground from '@/components/home/HomeBackground'
import IDCard from '@/components/home/IDCard'
import MapHotspots from '@/components/home/MapHotspots'

export default function Home() {
  const [mapVisible, setMapVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('loaderDone') === 'true') setMapVisible(true)
  }, [])

  const router = useRouter()
  const navigating = useRef(false)

  useEffect(() => {
    const go = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'down'
      const nav = () => router.push('/work')
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        nav()
      }
    }

    const onWheel = (e: WheelEvent) => { if (e.deltaY > 30) go() }
    const touchStart = { y: 0 }
    const onTouchStart = (e: TouchEvent) => { touchStart.y = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => { if (touchStart.y - e.changedTouches[0].clientY > 40) go() }

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

      {/* Fingerprint loading overlay — unmounts once onComplete fires */}
      {!mapVisible && (
        <FingerprintLoader onComplete={() => {
          sessionStorage.setItem('loaderDone', 'true')
          setMapVisible(true)
        }} />
      )}

      {/* ID card — mounts after loader, drop-in animation plays on mount */}
      {mapVisible && <IDCard />}

      {/* Phase 3: map hotspot tooltips */}
      <MapHotspots visible={mapVisible} />
    </div>
  )
}
