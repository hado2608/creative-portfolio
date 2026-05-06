'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

export default function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: '#fff',
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 200ms ease-out',
      }}
    >
      {/* Thumbnail placeholder */}
      <div style={{
        aspectRatio: '4 / 5',
        background: '#f0f0f0',
        width: '100%',
      }} />

      {/* Card info */}
      <div style={{
        padding: '14px 16px 16px',
      }}>
        <p style={{
          color: '#1c1c1e',
          fontFamily: "'Neue Montreal', 'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 8,
        }}>
          {project.title}
        </p>
        <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                color: '#9f9f9f',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
          <span style={{ color: '#c8c8c8', marginLeft: 'auto', fontFamily: "'Neue Montreal', sans-serif", fontSize: 11 }}>
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
