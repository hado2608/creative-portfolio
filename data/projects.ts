export interface Project {
  id: number
  title: string
  description: string
  category: string
  year: string
  href?: string
  external?: boolean
  thumbnail?: string
  video?: string
  row: number
  column: 'left' | 'right'
  colFlex: number
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Collaborative DAW / Bounce',
    description: 'Envisioned and designed a new interaction model for canvas-based real-time music collaboration. Currently under development.',
    category: 'Fall 2025 / End-to-end web app design',
    year: '2025',
    href: '/ha-do-portfolio/bounce',
    thumbnail: '/assets/thumbnails/daw-thumbnail.png',
    row: 1,
    column: 'left',
    colFlex: 602,
  },
  {
    id: 2,
    title: 'GameSense AI / Conduit Gaming',
    description: 'Designed and shipped swiping feature for AI game discovery. Currently in beta.',
    category: 'Fall 2025 / Cross-platform feature design',
    year: '2025',
    href: '/ha-do-portfolio/gamesense',
    thumbnail: '/assets/thumbnails/gamesense-thumbnail.png',
    row: 1,
    column: 'right',
    colFlex: 360,
  },
  {
    id: 3,
    title: 'Serene / Toyota x Pratt',
    description: 'Deep ethnography research and speculative mockups for improving NYC pedestrian experience for people with auditory sensitivity.',
    category: 'Fall 2025 / AR design & qualitative research',
    year: '2025',
    href: '/ha-do-portfolio/toyota',
    thumbnail: '/assets/thumbnails/serene-thumbnail.png',
    row: 2,
    column: 'left',
    colFlex: 363,
  },
  {
    id: 4,
    title: 'SharePoint Portal / City Harvest',
    description: 'Shipped a redesign of the City Harvest Portal on SharePoint for live usage by vibe-coding on Microsoft SPFx UI components. This impacted 200+ employees daily.',
    category: 'Summer 2025 / Web portal design & vibe-coding implementation',
    year: '2025',
    href: '/ha-do-portfolio/cityharvest',
    thumbnail: '/assets/thumbnails/cityharvest-thumbnail.png',
    row: 2,
    column: 'right',
    colFlex: 606,
  },
  {
    id: 5,
    title: 'Brand Identity / Driftbox',
    description: 'Established the brand identity with marketing site for a pre-seed startup shipping AI platform for DevOps workflow governing. This enabled strong GTM strategy for seeding round this summer.',
    category: 'Spring 2026 / Visual design & marketing website',
    year: '2026',
    thumbnail: '/assets/thumbnails/driftbox-thumbnail.png',
    row: 3,
    column: 'left',
    colFlex: 360,
  },
  {
    id: 6,
    title: 'How Music Wandered?',
    description: 'Designed and built a scrollytelling website for my data project researching how music genres have traveled through time and space.',
    category: 'Data visualization & scrollytelling',
    year: '2024',
    thumbnail: '/assets/thumbnails/musicmap-thumbnail.png',
    row: 3,
    column: 'right',
    colFlex: 601,
  },
  {
    id: 7,
    title: 'Figma To-do Plugin / getitdone',
    description: 'A live Figma plugin to keep track of design work. Currently has 142 active users.',
    category: 'Vibe-coding, side project',
    year: '2024',
    href: 'https://www.figma.com/community/widget/1624560624874565096/getitdone',
    external: true,
    thumbnail: '/assets/thumbnails/to-do-thumbnail.png',
    row: 4,
    column: 'right',
    colFlex: 601,
  },
]
