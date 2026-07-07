'use client'

import { useEffect, useRef } from 'react'

const IDLE  = '/assets/cursor-wings.png'
const HOVER = '/assets/cursor-wings-hover.png'

export default function CustomCursor() {
  const ref      = useRef<HTMLDivElement>(null)
  const leftRef  = useRef<HTMLImageElement>(null)
  const rightRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    const leftImg  = leftRef.current
    const rightImg = rightRef.current
    if (!el || !leftImg || !rightImg) return

    let x = -100, y = -100
    let rafId: number
    let idleTimer: ReturnType<typeof setTimeout>

    const hide = () => { el.style.opacity = '0' }
    const show = () => { el.style.opacity = '1' }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      show()
      clearTimeout(idleTimer)
      idleTimer = setTimeout(hide, 1000)
    }

    const onLeave = () => { hide() }

    const tick = () => {
      el.style.transform = `translate(${x}px, ${y}px)`
      rafId = requestAnimationFrame(tick)
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a, button, [role="button"], [data-cursor-hover]')
      const isHover = target !== null
      el.classList.toggle('cursor--hover', isHover)
      leftImg.src  = isHover ? HOVER : IDLE
      rightImg.src = isHover ? HOVER : IDLE
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
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
      <img ref={leftRef}  src={IDLE} width={56} height={53} alt="" draggable={false} className="cursor-wing cursor-wing-left"  />
      <img ref={rightRef} src={IDLE} width={56} height={53} alt="" draggable={false} className="cursor-wing cursor-wing-right" />
    </div>
  )
}
