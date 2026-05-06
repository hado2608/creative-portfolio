export interface Project {
  id: number
  title: string
  tags: string[]
  year: string
}

export const projects: Project[] = [
  { id: 1, title: 'Project One',   tags: ['design', 'motion'],  year: '2025' },
  { id: 2, title: 'Project Two',   tags: ['code', 'design'],    year: '2025' },
  { id: 3, title: 'Project Three', tags: ['design'],             year: '2024' },
  { id: 4, title: 'Project Four',  tags: ['motion', 'code'],    year: '2024' },
  { id: 5, title: 'Project Five',  tags: ['design', 'code'],    year: '2024' },
  { id: 6, title: 'Project Six',   tags: ['design'],             year: '2023' },
]
