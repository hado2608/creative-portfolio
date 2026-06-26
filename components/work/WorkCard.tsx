'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
  return (
    <div style={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
      {/* Image sets the natural aspect ratio of the slot */}
      <img
        src={project.thumbnail}
        alt={project.title}
        style={{ display: 'block', width: '100%', height: 'auto', visibility: project.video ? 'hidden' : 'visible' }}
      />
      {project.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={project.video}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
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
