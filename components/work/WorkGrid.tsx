'use client'

import WorkCard from './WorkCard'
import { projects } from '@/data/projects'

// 3-column masonry-style grid matching Figma layout
// Col 2 is offset 80px down, col 3 is offset 40px down for staggered feel
export default function WorkGrid() {
  const col1 = projects.filter((_, i) => i % 3 === 0)
  const col2 = projects.filter((_, i) => i % 3 === 1)
  const col3 = projects.filter((_, i) => i % 3 === 2)

  return (
    <div style={{
      display: 'grid',
      gap: 16,
      gridTemplateColumns: 'repeat(3, 1fr)',
      padding: '40px 40px 300px',  // 300px bottom: space for docked keyboard
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {col1.map(p => <WorkCard key={p.id} project={p} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 80 }}>
        {col2.map(p => <WorkCard key={p.id} project={p} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 40 }}>
        {col3.map(p => <WorkCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
