'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import type { Project } from '@/data/projects'

function CardTitle({ title }: { title: string }) {
  const slashIdx = title.indexOf(' / ')
  if (slashIdx === -1) {
    return <span style={{ fontStyle: 'italic' }}>{title}</span>
  }
  const before = title.slice(0, slashIdx + 1)
  const after = title.slice(slashIdx + 1)
  return (
    <>
      <span style={{ fontStyle: 'italic' }}>{before}</span>
      <span style={{ fontStyle: 'normal' }}>{after}</span>
    </>
  )
}

export function Thumbnail({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    })
  }, [])

  const onEnter = useCallback(() => {
    setHovered(true)
    if (project.video && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [project.video])

  const onLeave = useCallback(() => {
    setHovered(false)
    setPos({ x: 0.5, y: 0.5 })
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  const tiltX = (pos.y - 0.5) * -14
  const tiltY = (pos.x - 0.5) * 14

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transform: hovered
          ? `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
          : 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: hovered
          ? 'transform 80ms linear'
          : 'transform 550ms cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {/* Static thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.title}
        style={{
          display: 'block',
          height: 'auto',
          width: '100%',
          opacity: hovered && project.video ? 0 : 1,
          transition: 'opacity 250ms ease',
        }}
      />

      {/* Video — only mounted when a path is provided */}
      {project.video && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          src={project.video}
          style={{
            height: '100%',
            inset: 0,
            objectFit: 'cover',
            opacity: hovered ? 1 : 0,
            position: 'absolute',
            transition: 'opacity 250ms ease',
            width: '100%',
          }}
        />
      )}

      {/* Metallic shine overlay — two-layer: radial specular + sweeping band */}
      <div
        style={{
          borderRadius: 4,
          inset: 0,
          mixBlendMode: 'overlay',
          opacity: hovered ? 1 : 0,
          pointerEvents: 'none',
          position: 'absolute',
          transition: 'opacity 150ms ease',
          background: `
            radial-gradient(
              ellipse 60% 50% at ${pos.x * 100}% ${pos.y * 100}%,
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.07) 45%,
              transparent 70%
            ),
            linear-gradient(
              ${pos.x * 80 + 70}deg,
              transparent 25%,
              rgba(255,255,255,0.09) 50%,
              transparent 75%
            )
          `,
        }}
      />
    </div>
  )
}

export default function WorkCard({ project }: { project: Project }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      style={{
        cursor: project.href ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {project.thumbnail && <Thumbnail project={project} />}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{
          color: '#473E3D',
          fontFamily: "'Recoleta', Georgia, serif",
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.1,
          margin: 0,
        }}>
          <CardTitle title={project.title} />
        </p>
        <p style={{
          color: '#6b6b6b',
          fontFamily: "'Neue Montreal', sans-serif",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.5,
          margin: 0,
        }}>
          {project.description}
        </p>
        <p style={{
          color: 'rgba(107,107,107,0.7)',
          fontFamily: "'Neue Montreal', sans-serif",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.4,
          margin: 0,
        }}>
          {project.category}
        </p>
      </div>
    </motion.div>
  )

  if (project.href) {
    if (project.external) {
      return (
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          {card}
        </a>
      )
    }
    return (
      <Link href={project.href} style={{ textDecoration: 'none' }}>
        {card}
      </Link>
    )
  }

  return card
}
