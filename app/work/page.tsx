'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import WorkGridSection from '@/components/work/WorkGridSection'

export default function WorkPage() {
  const router = useRouter()
  const navigating = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const go = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'up'
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        const el = scrollRef.current
        if (el) { el.classList.add('page-slide-out-down'); setTimeout(nav, 340) }
        else nav()
      }
    }

    const goDown = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'down'
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/about') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        const el = scrollRef.current
        if (el) { el.classList.add('page-slide-out-up'); setTimeout(nav, 340) }
        else nav()
      }
    }

    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60
    const mountedAt = Date.now()
    // Must outlast the 950ms dissolve transition so momentum scroll from the
    // previous page can't chain-navigate straight through this one
    const settled = () => Date.now() - mountedAt > 1200

    const onWheel = (e: WheelEvent) => {
      if (!settled()) return
      if (e.deltaY < -30 && window.scrollY <= 5) go()
      if (e.deltaY > 30 && atBottom()) goDown()
    }
    const touch = { y: 0, atTop: false, atBottom: false }
    const onTouchStart = (e: TouchEvent) => {
      touch.y = e.touches[0].clientY
      touch.atTop = window.scrollY <= 5
      touch.atBottom = atBottom()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!settled()) return
      const dy = e.changedTouches[0].clientY - touch.y
      if (dy > 40 && touch.atTop) go()
      if (dy < -40 && touch.atBottom) goDown()
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
    <div className="work-page" ref={scrollRef}>
      <WorkGridSection />
    </div>
  )
}
