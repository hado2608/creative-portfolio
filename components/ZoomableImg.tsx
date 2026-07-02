'use client'

import { useState } from 'react'
import { Lightbox } from './Lightbox'

export function ZoomableImg({ src, alt, style }: { src: string; alt?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <img
        src={src}
        alt={alt ?? ''}
        onClick={() => setOpen(true)}
        style={{ ...style, cursor: 'zoom-in' }}
      />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
