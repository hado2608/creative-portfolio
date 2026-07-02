'use client'

import { useEffect, useState } from 'react'

// elementId: the element to watch
// exitMode: if true, show sidebar when element's BOTTOM exits above the nav (use for hero header)
//           if false, show when element's TOP enters within threshold (legacy)
export function useSideNavReveal(elementId: string, exitMode = false) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    const check = () => {
      const rect = el.getBoundingClientRect()
      setVisible(exitMode ? rect.bottom <= 96 : rect.top <= 96)
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [elementId, exitMode])

  return visible
}
