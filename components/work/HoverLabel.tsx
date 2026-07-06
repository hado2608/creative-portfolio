'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const CARD_W = 323

interface Props {
  title: string
  desc: React.ReactNode
  label: string
  anchorRef: React.RefObject<HTMLElement | null>
  visible: boolean
}

export default function HoverLabel({ title, desc, label, anchorRef, visible }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const anchor = anchorRef.current
    if (!el || !anchor) return

    let cy = -999
    let rafId: number

    const onMove = (e: MouseEvent) => { cy = e.clientY }

    const tick = () => {
      const rect = anchor.getBoundingClientRect()
      el.style.left = `${rect.left + rect.width / 2}px`
      el.style.top  = `${cy}px`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [anchorRef])

  const el = (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        width: CARD_W,
        transform: 'translate(-50%, calc(-100% - 6px))',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease',
        background: 'rgba(247,247,247,0.98)',
        border: '1px solid #eaeaea',
        borderRadius: 4,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxSizing: 'border-box' as const,
      }}
    >
      <p style={{
        margin: 0,
        fontFamily: "'Neue Montreal', sans-serif",
        fontWeight: 500,
        fontSize: 24,
        lineHeight: 1.2,
        color: '#4e4e4e',
        letterSpacing: '0.48px',
        whiteSpace: 'nowrap',
      }}>
        {title}
      </p>
      <p style={{
        margin: 0,
        fontFamily: "'Neue Montreal', sans-serif",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        color: '#6b6b6b',
      }}>
        {desc}
      </p>
      <p style={{
        margin: 0,
        fontFamily: "'Neue Montreal', sans-serif",
        fontWeight: 400,
        fontSize: 16,
        color: '#a4a3a3',
      }}>
        {label}
      </p>
    </div>
  )

  return createPortal(el, document.body)
}
