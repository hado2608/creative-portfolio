'use client'

import { useEffect } from 'react'

export function Lightbox({ src, alt, onClose }: { src: string; alt?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(247,247,247,0.5)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40, cursor: 'zoom-out',
      }}
    >
      <img
        src={src}
        alt={alt ?? ''}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '90vh',
          objectFit: 'contain', borderRadius: 4,
          cursor: 'default', display: 'block',
        }}
      />
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: 'none',
          color: 'rgba(80,80,80,0.7)', fontSize: 36,
          cursor: 'pointer', lineHeight: 1, padding: 4,
        }}
      >
        ×
      </button>
    </div>
  )
}
