export interface Project {
  id: number
  title: string
  tags: string[]
  year: string
  href?: string
}

export const projects: Project[] = [
  { id: 1, title: 'Project One',   tags: ['design', 'motion'],  year: '2025' },
  { id: 2, title: 'Project Two',   tags: ['code', 'design'],    year: '2025' },
  { id: 3, title: 'Matcha Doing?',  tags: ['conversational ux'],  year: '2025', href: '/ha-do-portfolio/matcha-bot' },
  { id: 4, title: 'GameSense',     tags: ['design'],             year: '2024', href: '/ha-do-portfolio/gamesense' },
  { id: 5, title: 'Hercules',      tags: ['design system'],     year: '2024', href: '/ha-do-portfolio/hercules' },
  { id: 6, title: 'Project Six',   tags: ['design', 'code'],    year: '2024' },
  { id: 7, title: 'Project Seven', tags: ['design'],             year: '2023' },
]
