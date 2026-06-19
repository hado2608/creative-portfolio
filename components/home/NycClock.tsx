'use client'

import { useState, useEffect } from 'react'

export default function NycClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date())

    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        color: 'rgba(71,62,61,0.6)',
        fontFamily: "'Neue Montreal', sans-serif",
        fontSize: 16,
        fontWeight: 400,
      }}>
        Brooklyn, NY
      </span>
      <span style={{
        color: 'rgba(71,62,61,0.6)',
        fontFamily: "'Neue Montreal', sans-serif",
        fontSize: 16,
        fontWeight: 400,
      }}>
        {time}
      </span>
    </div>
  )
}
