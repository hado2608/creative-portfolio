'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AboutSection from '@/components/about/AboutSection'

export default function AboutPage() {
  const router = useRouter()
  const navigating = useRef(false)

  useEffect(() => {
    const go = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'up'
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/work') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else nav()
    }

    const mountedAt = Date.now()
    const settled = () => Date.now() - mountedAt > 500

    const onWheel = (e: WheelEvent) => { if (settled() && e.deltaY < -30 && window.scrollY <= 5) go() }
    const touch = { y: 0, atTop: false }
    const onTouchStart = (e: TouchEvent) => {
      touch.y = e.touches[0].clientY
      touch.atTop = window.scrollY <= 5
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (settled() && e.changedTouches[0].clientY - touch.y > 40 && touch.atTop) go()
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

  return <AboutSection />
}
