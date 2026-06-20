'use client'

import { useEffect, useState } from 'react'

function format(timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())
}

export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 30_000)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}
