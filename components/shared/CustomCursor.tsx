'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let x = -100, y = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const tick = () => {
      if (el) el.style.transform = `translate(${x}px, ${y}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 56,
        height: 53,
        marginLeft: -28,
        marginTop: -26,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      <img src="/assets/cursor-wings.png" width={56} height={53} alt="" draggable={false} />
    </div>
  )
}
