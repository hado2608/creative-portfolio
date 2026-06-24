'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

function NavItem({
  children,
  href,
  active,
}: {
  children: string
  href: string
  active?: boolean
}) {
  return (
    <Link href={href} className={`nav-item${active ? ' active' : ''}`}>
      <div className="nav-item-inner">
        <span className="nav-bracket">[</span>
        <span className="nav-label">{children}</span>
        <span className="nav-bracket">]</span>
      </div>
    </Link>
  )
}

export default function PortfolioFooter() {
  const pathname = usePathname()
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()).toLowerCase()
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])

  // Hide on case study pages — they use CaseStudyNav instead
  if (pathname.startsWith('/ha-do-portfolio/')) return null

  return (
    <footer key={pathname} className="about-footer">
      <div className="about-footer-left">
        <Link href="/">
          <img src="/assets/signature-figma.svg" alt="Ha Do" className="about-signature" />
        </Link>
        <div className="about-location">
          <span>brooklyn, ny</span>
          <span>{time}</span>
        </div>
      </div>

      <nav className="about-nav-box">
        <NavItem href="/" active={pathname === '/'}>chào!</NavItem>
        <div className="nav-pair">
          <NavItem href="/work" active={pathname === '/work'}>work</NavItem>
          <span className="nav-pair-sep">/</span>
          <NavItem href="/vibe" active={pathname === '/vibe'}>vibe</NavItem>
        </div>
        <NavItem href="/about" active={pathname === '/about'}>about</NavItem>
      </nav>

      <div className="about-footer-right">
        <div className="about-contact-row">
          <a href="mailto:hanguyendo01@gmail.com">hanguyendo01@gmail.com</a>
          <span>/</span>
          <a href="https://drive.google.com/file/d/1OajC3F4kzyqCz-QaGbuAEUiWJGHFOwtU/view" target="_blank" rel="noopener noreferrer">resume</a>
        </div>
        <div className="about-contact-row">
          <a href="https://www.linkedin.com/in/hadodesign/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span>/</span>
          <a href="https://x.com/hado_tn" target="_blank" rel="noopener noreferrer">X</a>
          <span>/</span>
          <a href="https://instagram.com/hado.fig" target="_blank" rel="noopener noreferrer">instagram</a>
        </div>
      </div>
    </footer>
  )
}
