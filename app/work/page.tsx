'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Thumbnail } from '@/components/work/WorkCard'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

// ── Work page card — description first, label below ───────────────────────────

interface WorkEntry {
  projectId: number
  desc: React.ReactNode
  label: string
  col: number
  colSpan?: number
}

const WORK_ENTRIES: WorkEntry[] = [
  {
    projectId: 1,
    desc: <>Envisioned a new interaction model for <strong>real-time music production collaboration</strong>.</>,
    label: 'Bounce / Fall 2025',
    col: 1,
  },
  {
    projectId: 2,
    desc: <>Shipped swiping interaction for <strong>AI-powered game discovery</strong>. Currently in beta.</>,
    label: 'Conduit Gaming / Fall 2025',
    col: 2,
  },
  {
    projectId: 3,
    desc: <><strong>Improving NYC pedestrian experience</strong> for people with auditory sensitivity.</>,
    label: 'Toyota @ Pratt / Fall 2025',
    col: 3,
  },
  {
    projectId: 4,
    desc: <>Shipped a redesign of the <strong>City Harvest Portal</strong> on SharePoint, impacting <strong>200+ employees daily</strong>.</>,
    label: 'City Harvest / Summer 2025',
    col: 1,
  },
  {
    projectId: 6,
    desc: <>Designed and built a <strong>scrollytelling website</strong> researching how music genres traveled through time and space.</>,
    label: 'Data viz / Fall 2024',
    col: 2,
    colSpan: 2,
  },
]

function WorkPageCard({ entry, project, index }: { entry: WorkEntry; project: Project; index: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      style={{
        cursor: project.href ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Thumbnail project={project} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p className="work-page-desc" style={{ margin: 0 }}>
          {entry.desc}
        </p>
        <p style={{
          color: 'rgba(107,107,107,0.7)',
          fontFamily: "'Neue Montreal', sans-serif",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.4,
          margin: 0,
        }}>
          {entry.label}
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const projectsById = Object.fromEntries(projects.map(p => [p.id, p]))
  const router = useRouter()
  const navigating = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const go = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'up'
      const nav = () => router.push('/')
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        nav()
      }
    }

    const el = scrollRef.current
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < -30 && (el?.scrollTop ?? 0) === 0) go()
    }
    const touchStart = { y: 0 }
    const onTouchStart = (e: TouchEvent) => { touchStart.y = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientY - touchStart.y > 40 && (el?.scrollTop ?? 0) === 0) go()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [router])

  return (
    <div className="work-page" ref={scrollRef}>
      <main className="work-grid">
        {WORK_ENTRIES.map((entry, i) => {
          const project = projectsById[entry.projectId]
          if (!project) return null
          return (
            <div
              key={entry.projectId}
              style={{
                gridColumn: entry.colSpan
                  ? `${entry.col} / span ${entry.colSpan}`
                  : String(entry.col),
              }}
            >
              <WorkPageCard entry={entry} project={project} index={i} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
