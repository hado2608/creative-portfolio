'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkGrid from '@/components/work/WorkGrid'

gsap.registerPlugin(ScrollTrigger)

const MidiKeyboard = dynamic(() => import('@/components/keyboard/MidiKeyboard'), {
  ssr: false,
  loading: () => null,
})

const FIGMA_KB_W = 591
const FIGMA_KB_H = 390

export default function Home() {
  const posRef  = useRef<HTMLDivElement>(null)  // handles Y translation
  const tiltRef = useRef<HTMLDivElement>(null)  // handles rotateX
  const heroRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pos  = posRef.current
    const tilt = tiltRef.current
    const hero = heroRef.current
    const work = workRef.current
    if (!pos || !tilt || !hero) return

    // Center the position wrapper via GSAP (avoids transform conflicts with CSS)
    gsap.set(pos, { xPercent: -50, yPercent: -50 })
    gsap.set(tilt, { rotateX: 0, transformOrigin: 'center center' })

    const setup = () => {
      ScrollTrigger.getAll().forEach(t => t.kill())

      const vh  = window.innerHeight
      const vw  = window.innerWidth
      const kbW = Math.min(FIGMA_KB_W, vw - 48)
      const kbH = (kbW / FIGMA_KB_W) * FIGMA_KB_H

      // Move keyboard so its bottom sits 24px above the viewport edge
      const endY = vh * 0.5 - 24 - kbH / 2

      gsap.to(pos, {
        y:    endY,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start:   'top top',
          end:     'bottom top',
          scrub:   0.4,
        },
      })

      gsap.to(tilt, {
        rotateX: 28,
        ease:    'none',
        scrollTrigger: {
          trigger: hero,
          start:   'top top',
          end:     'bottom top',
          scrub:   0.4,
        },
      })

      if (work) {
        gsap.fromTo(
          work,
          { opacity: 0, y: 48 },
          {
            opacity:       1,
            y:             0,
            duration:      0.7,
            ease:          'power2.out',
            scrollTrigger: {
              trigger:       hero,
              start:         '80% top',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }

    setup()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 100)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main style={{ background: 'transparent', minHeight: '100vh', position: 'relative' }}>

      {/* Grid background — fixed, sits behind everything */}
      <div style={{
        backgroundImage: [
          'linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '40px 40px',
        backgroundColor: '#F7F7F7',
        inset: 0,
        position: 'fixed',
        zIndex: 0,
      }} />

      <div ref={heroRef} style={{ height: '100vh' }} />

      <div ref={workRef} style={{ opacity: 0, position: 'relative', zIndex: 1 }}>
        <WorkGrid />
      </div>

      {/* posRef: fixed position — GSAP moves this vertically */}
      <div
        ref={posRef}
        style={{
          left:     '50%',
          position: 'fixed',
          top:      '50%',
          width:    `min(${FIGMA_KB_W}px, calc(100vw - 48px))`,
          zIndex:   50,
        }}
      >
        {/*
          Perspective lives on a CSS parent (not on the rotating element).
          perspectiveOrigin: 50% 50% ensures the vanishing point is dead-center
          of the keyboard, giving a symmetric birds-eye view with no side tilt.
        */}
        <div style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
          {/* tiltRef: GSAP only animates rotateX here */}
          <div ref={tiltRef}>
            <MidiKeyboard />
          </div>
        </div>
      </div>

    </main>
  )
}
