'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Thumbnail } from '@/components/work/WorkCard'
import HoverLabel from '@/components/work/HoverLabel'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

interface WorkEntry {
  projectId: number
  desc: React.ReactNode
  label: string
  thumbnailAspect?: string
}

const LEFT_COL: WorkEntry[] = [
  {
    projectId: 1,
    thumbnailAspect: '7/5',
    desc: <>Envisioned a new interaction model for <strong>real-time music production collaboration</strong>.</>,
    label: 'Bounce / Fall 2025',
  },
  {
    projectId: 4,
    desc: <>Shipped a redesign of the <strong>City Harvest Portal</strong> on SharePoint, impacting <strong>200+ employees daily</strong>.</>,
    label: 'City Harvest / Summer 2025',
  },
]

const RIGHT_TOP: WorkEntry[] = [
  {
    projectId: 2,
    thumbnailAspect: '9/14',
    desc: <>Shipped swiping interaction for <strong>AI-powered game discovery</strong>. Currently in beta.</>,
    label: 'Conduit Gaming / Fall 2025',
  },
  {
    projectId: 3,
    thumbnailAspect: '9/14',
    desc: <><strong>Improving NYC pedestrian experience</strong> for people with auditory sensitivity.</>,
    label: 'Toyota @ Pratt / Fall 2025',
  },
]

const RIGHT_BOTTOM: WorkEntry = {
  projectId: 6,
  desc: <>Designed and built a <strong>scrollytelling website</strong> researching how music genres traveled through time and space.</>,
  label: 'Data viz / Fall 2024',
}

// Plain card — just thumbnail, no text
function WorkPageCard({ entry, project, index }: { entry: WorkEntry; project: Project; index: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      style={{ cursor: project.href ? 'pointer' : 'default' }}
    >
      <Thumbnail project={project} aspectRatio={entry.thumbnailAspect} />
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

// Music Map card — hover label follows cursor
function MusicMapCard({ entry, project }: { entry: WorkEntry; project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
      style={{ cursor: 'pointer' }}
    >
      <Thumbnail project={project} aspectRatio={entry.thumbnailAspect} />
    </motion.div>
  )

  return (
    <div
      ref={wrapRef}
      data-cursor-hover
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ display: 'block' }}
    >
      {project.external ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          {card}
        </a>
      ) : (
        <Link href={project.href!} style={{ textDecoration: 'none' }}>
          {card}
        </Link>
      )}
      {mounted && (
        <HoverLabel
          title="How Music Wandered?"
          desc={entry.desc}
          label={entry.label}
          anchorRef={wrapRef}
          visible={hovering}
        />
      )}
    </div>
  )
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
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        const el = scrollRef.current
        if (el) { el.classList.add('page-slide-out-down'); setTimeout(nav, 340) }
        else nav()
      }
    }

    const goDown = () => {
      if (navigating.current) return
      navigating.current = true
      document.documentElement.dataset.navDir = 'down'
      document.documentElement.dataset.navType = 'scroll'
      const nav = () => { window.scrollTo(0, 0); router.push('/about') }
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(nav)
      } else {
        const el = scrollRef.current
        if (el) { el.classList.add('page-slide-out-up'); setTimeout(nav, 340) }
        else nav()
      }
    }

    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60
    const mountedAt = Date.now()
    const settled = () => Date.now() - mountedAt > 500

    const onWheel = (e: WheelEvent) => {
      if (!settled()) return
      if (e.deltaY < -30 && window.scrollY <= 5) go()
      if (e.deltaY > 30 && atBottom()) goDown()
    }
    const touch = { y: 0, atTop: false, atBottom: false }
    const onTouchStart = (e: TouchEvent) => {
      touch.y = e.touches[0].clientY
      touch.atTop = window.scrollY <= 5
      touch.atBottom = atBottom()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!settled()) return
      const dy = e.changedTouches[0].clientY - touch.y
      if (dy > 40 && touch.atTop) go()
      if (dy < -40 && touch.atBottom) goDown()
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

  const musicMap = projectsById[RIGHT_BOTTOM.projectId]

  return (
    <div className="work-page" ref={scrollRef}>
      <main className="work-grid">

        <div className="work-col-left">
          {LEFT_COL.map((entry, i) => {
            const project = projectsById[entry.projectId]
            if (!project) return null
            return <WorkPageCard key={entry.projectId} entry={entry} project={project} index={i} />
          })}
        </div>

        <div className="work-col-right">
          <div className="work-col-right-top">
            {RIGHT_TOP.map((entry, i) => {
              const project = projectsById[entry.projectId]
              if (!project) return null
              return <WorkPageCard key={entry.projectId} entry={entry} project={project} index={i + 2} />
            })}
          </div>
          {musicMap && <MusicMapCard entry={RIGHT_BOTTOM} project={musicMap} />}
        </div>

      </main>
    </div>
  )
}
