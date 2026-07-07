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

const RESUME_URL = 'https://drive.google.com/file/d/14k5bgO3Yaa7wlHyNqWlnKgE8TqduFiyH/view?usp=sharing'

// Animate footer only on first hard load — stays static during SPA nav
let footerAnimated = false

function activeLabel(pathname: string) {
  if (pathname === '/work') return 'work'
  if (pathname === '/about') return 'about'
  return 'chào!'
}

export default function PortfolioFooter() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [navOpen, setNavOpen] = useState(false)
  const [animClass, setAnimClass] = useState('')

  useEffect(() => {
    if (pathname === '/' && !footerAnimated) {
      footerAnimated = true
      setAnimClass(' about-footer--animated')
    }
  }, [])

  // Close nav on route change
  useEffect(() => { setNavOpen(false) }, [pathname])

  // Hide on case study pages — they use CaseStudyNav instead
  if (pathname.startsWith('/ha-do-portfolio/')) return null

  return (
    <>
      {/* Transparent overlay — closes mobile nav on outside tap */}
      {navOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setNavOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile nav pill — appears above footer when open */}
      {navOpen && (
        <div className="mobile-nav-pill">
          <Link href="/" className={`mobile-nav-link${pathname === '/' ? ' mobile-nav-link--active' : ''}`} onClick={() => setNavOpen(false)}>chào!</Link>
          <Link href="/work" className={`mobile-nav-link${pathname === '/work' ? ' mobile-nav-link--active' : ''}`} onClick={() => setNavOpen(false)}>work</Link>
          <Link href="/about" className={`mobile-nav-link${pathname === '/about' ? ' mobile-nav-link--active' : ''}`} onClick={() => setNavOpen(false)}>about</Link>
          <a href={RESUME_URL} className="mobile-nav-link" target="_blank" rel="noopener noreferrer" onClick={() => setNavOpen(false)}>resume</a>
        </div>
      )}

      <footer className={`about-footer${animClass}`}>
        {/* Noise texture overlay — dark on home, light everywhere else */}
        <img src={isHome ? '/assets/nav-bg-dark.png' : '/assets/nav-bg.png'} aria-hidden alt="" className="about-footer-noise" />

        {/* ── Desktop layout ─────────────────────────────── */}
        <div className="about-footer-left">
          <Link href="/">
            <img src={isHome ? '/assets/signature-dark.svg' : '/assets/signature-figma.svg'} alt="Ha Do" className="about-signature" />
          </Link>
          <span className="about-copyright">@2026 Ha Do</span>
        </div>

        <nav className="about-nav-box">
          <NavItem href="/" active={pathname === '/'}>chào!</NavItem>
          <NavItem href="/work" active={pathname === '/work'}>work</NavItem>
          {/* <NavItem href="/vibe" active={pathname === '/vibe'}>vibe</NavItem> */}
          <NavItem href="/about" active={pathname === '/about'}>about</NavItem>
        </nav>

        <div className="about-footer-right">
          <div className="about-contact-row">
            <a href="mailto:hanguyendo01@gmail.com">hanguyendo01@gmail.com</a>
            <span>/</span>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">resume</a>
          </div>
          <div className="about-contact-row">
            <a href="https://www.linkedin.com/in/hadodesign/" target="_blank" rel="noopener noreferrer">linkedin</a>
            <span>/</span>
            <a href="https://x.com/hado_tn" target="_blank" rel="noopener noreferrer">X</a>
            <span>/</span>
            <a href="https://instagram.com/hado.fig" target="_blank" rel="noopener noreferrer">instagram</a>
          </div>
        </div>

        {/* ── Mobile layout ──────────────────────────────── */}
        <div className="mobile-footer-inner">
          <Link href="/" className="mobile-footer-sig">
            <img src={isHome ? '/assets/signature-dark.svg' : '/assets/signature-figma.svg'} alt="Ha Do" className="mobile-sig-img" width={70} height={34} />
            <span className="mobile-sig-label">@2026 Ha Do</span>
          </Link>

          <button
            className={`mobile-chao-btn${navOpen ? ' mobile-chao-btn--open' : ''}`}
            onClick={() => setNavOpen(v => !v)}
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
          >
            <span className="mobile-chao-bracket">[</span>
            <em className="mobile-chao-text">{activeLabel(pathname)}</em>
            <span className="mobile-chao-bracket">]</span>
          </button>

          <div className="mobile-social-icons">
            <a href="mailto:hanguyendo01@gmail.com" aria-label="Email">
              <img src="/assets/mail-icon-mobile.svg" alt="" width={16} height={16} />
            </a>
            <a href="https://www.linkedin.com/in/hadodesign/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/assets/linkedin-icon.svg" alt="" width={16} height={16} />
            </a>
            <a href="https://x.com/hado_tn" target="_blank" rel="noopener noreferrer" aria-label="X">
              <img src="/assets/x-icon.svg" alt="" width={16} height={16} />
            </a>
          </div>
        </div>

      </footer>
    </>
  )
}
