'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
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

// Thumbnail card — cursor-following hover label with the project blurb.
// Rise + fade are scrubbed by scroll position (scroll-linked, reversible),
// matching the home page artifact reveal.
function WorkPageCard({ entry, project }: { entry: WorkEntry; project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // 0 when the card's top touches the viewport bottom, 1 once it reaches 72% height
    offset: ['start end', 'start 0.72'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [64, 0])

  const card = (
    <motion.div
      style={{ y, opacity: scrollYProgress, cursor: project.href ? 'pointer' : 'default' }}
    >
      <Thumbnail project={project} aspectRatio={entry.thumbnailAspect} />
    </motion.div>
  )

  const linked = project.href
    ? project.external
      ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          {card}
        </a>
      )
      : (
        <Link href={project.href} style={{ textDecoration: 'none' }}>
          {card}
        </Link>
      )
    : card

  return (
    <div
      ref={wrapRef}
      data-cursor-hover
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ display: 'block' }}
    >
      {linked}
      {mounted && (
        <HoverLabel
          title={project.title}
          desc={entry.desc}
          label={entry.label}
          anchorRef={wrapRef}
          visible={hovering}
        />
      )}
    </div>
  )
}

// The full case-study grid (desktop) + single column (mobile), shared by the
// standalone /work route and the inline work section on the home page.
export default function WorkGridSection() {
  const projectsById = Object.fromEntries(projects.map(p => [p.id, p]))
  const musicMap = projectsById[RIGHT_BOTTOM.projectId]

  // Mobile: single column in case-study chain order
  const MOBILE_ORDER = [
    LEFT_COL[0],   // bounce (1)
    RIGHT_TOP[0],  // gamesense (2)
    RIGHT_TOP[1],  // toyota (3)
    LEFT_COL[1],   // cityharvest (4)
    RIGHT_BOTTOM,  // music-map (6)
  ]

  return (
    <>
      {/* Desktop grid */}
      <main className="work-grid">
        <div className="work-col-left">
          {LEFT_COL.map(entry => {
            const project = projectsById[entry.projectId]
            if (!project) return null
            return <WorkPageCard key={entry.projectId} entry={entry} project={project} />
          })}
        </div>
        <div className="work-col-right">
          <div className="work-col-right-top">
            {RIGHT_TOP.map(entry => {
              const project = projectsById[entry.projectId]
              if (!project) return null
              return <WorkPageCard key={entry.projectId} entry={entry} project={project} />
            })}
          </div>
          {musicMap && <WorkPageCard entry={RIGHT_BOTTOM} project={musicMap} />}
        </div>
      </main>

      {/* Mobile single column */}
      <div className="work-mobile-list">
        {MOBILE_ORDER.map(entry => {
          const project = projectsById[entry.projectId]
          if (!project) return null
          return <WorkPageCard key={entry.projectId} entry={entry} project={project} />
        })}
      </div>
    </>
  )
}
