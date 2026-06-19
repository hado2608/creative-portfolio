import { projects } from '@/data/projects'
import WorkCard from '@/components/work/WorkCard'

export default function ProjectColumn() {
  const row1 = projects.filter(p => p.row === 1)
  const leftCol = projects.filter(p => p.row > 1 && p.column === 'left')
  const rightCol = projects.filter(p => p.row > 1 && p.column === 'right')

  return (
    <div className="home-projects">
      {/* Row 1: DAW + GameSense — synchronized, different widths */}
      <div className="home-projects-row">
        {row1.map(p => (
          <div key={p.id} style={{ flex: p.colFlex, minWidth: 0 }}>
            <WorkCard project={p} />
          </div>
        ))}
      </div>

      {/* Rows 2+: two independent columns, each flows at its own height */}
      <div className="home-projects-row">
        <div className="home-projects-inner-col" style={{ flex: 363, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {leftCol.map(p => <WorkCard key={p.id} project={p} />)}
        </div>
        <div className="home-projects-inner-col" style={{ flex: 606, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {rightCol.map(p => <WorkCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  )
}
