'use client'

import { useEffect, useRef, useState } from 'react'

interface SpringOptions {
  stiffness?: number
  damping?: number
}

export function useSpring2D({ stiffness = 120, damping = 14 }: SpringOptions = {}) {
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const [value, setValue] = useState({ x: 0, y: 0 })
  const stiffnessRef = useRef(stiffness)
  const dampingRef = useRef(damping)

  useEffect(() => {
    stiffnessRef.current = stiffness
    dampingRef.current = damping
  }, [stiffness, damping])

  useEffect(() => {
    const DT = 0.016
    let frame: number

    const tick = () => {
      let dirty = false
      for (const axis of ['x', 'y'] as const) {
        const force =
          (targetRef.current[axis] - currentRef.current[axis]) * stiffnessRef.current -
          velocityRef.current[axis] * dampingRef.current
        velocityRef.current[axis] += force * DT
        currentRef.current[axis] += velocityRef.current[axis] * DT
        if (
          Math.abs(velocityRef.current[axis]) > 0.001 ||
          Math.abs(currentRef.current[axis] - targetRef.current[axis]) > 0.001
        ) {
          dirty = true
        }
      }
      if (dirty) setValue({ x: currentRef.current.x, y: currentRef.current.y })
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return {
    value,
    setTarget: (x: number, y: number) => {
      targetRef.current = { x, y }
    },
  }
}
