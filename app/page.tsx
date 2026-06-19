import InfoColumn from '@/components/home/InfoColumn'
import ProjectColumn from '@/components/home/ProjectColumn'
import SocialsColumn from '@/components/home/SocialsColumn'

export default function Home() {
  return (
    <main>
      <section className="home-grid">
        <InfoColumn />
        <ProjectColumn />
        <SocialsColumn />
      </section>
    </main>
  )
}
