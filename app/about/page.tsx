'use client'

import { useState, useEffect, useRef } from 'react'

// ── Scramble engine (same as home page) ───────────────────────────────────────

const ABOUT_TITLES = ['designer', 'engineer', 'artist', 'maker']

const CHARS = 'abcdefghijklmnopqrstuvwxyz'
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)]
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

function firstTwoConsonants(text: string): Set<number> {
  const anchors = new Set<number>()
  let offset = 0
  for (const word of text.split(' ')) {
    let count = 0
    for (let i = 0; i < word.length && count < 2; i++) {
      const ch = word[i].toLowerCase()
      if (ch >= 'a' && ch <= 'z' && !VOWELS.has(ch)) {
        anchors.add(offset + i)
        count++
      }
    }
    offset += word.length + 1
  }
  return anchors
}

function useScramble(target: string) {
  const [display, setDisplay] = useState(target)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const prevRef = useRef(target)

  useEffect(() => {
    if (prevRef.current === target) return
    const source = prevRef.current
    prevRef.current = target

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    const anchorSet = firstTwoConsonants(source)

    setDisplay(target.split('').map((c, i) => {
      if (c === ' ') return ' '
      if (anchorSet.has(i) && i < source.length && source[i] !== ' ') return source[i]
      return rand()
    }).join(''))

    const allNonSpace = target.split('').reduce<number[]>((acc, c, i) => {
      if (c !== ' ') acc.push(i)
      return acc
    }, [])
    const nonAnchors = allNonSpace.filter(i => !anchorSet.has(i)).sort(() => Math.random() - 0.5)
    const anchors = [...anchorSet].filter(i => i < target.length).sort(() => Math.random() - 0.5)
    const shuffled = [...nonAnchors, ...anchors]

    const BATCH = 3, GAP = 330, TICK = 65

    for (let b = 0; b < shuffled.length; b += BATCH) {
      const batch = shuffled.slice(b, b + BATCH)
      const t0 = 180 + (b / BATCH) * GAP
      timersRef.current.push(
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = rand() }); return c.join('') }), t0),
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = rand() }); return c.join('') }), t0 + TICK),
        setTimeout(() => setDisplay(p => { const c = p.split(''); batch.forEach(i => { c[i] = target[i] }); return c.join('') }), t0 + TICK * 2),
      )
    }

    return () => { timersRef.current.forEach(clearTimeout) }
  }, [target])

  return display
}

function CyclingTitle() {
  const [index, setIndex] = useState(0)
  const display = useScramble(ABOUT_TITLES[index])

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ABOUT_TITLES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <p style={{
      fontFamily: "'The Seasons', Georgia, serif",
      fontSize: 96,
      fontWeight: 300,
      fontStyle: 'italic',
      letterSpacing: '-2.88px',
      lineHeight: 'normal',
      color: '#535659',
      margin: 0,
      width: '100%',
    }}>
      {display}
    </p>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pendingPlay = useRef(false)
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null)
  const [showAllAnnotations, setShowAllAnnotations] = useState(false)

  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=samara+joy+you+stepped+out+of+a+dream&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        const url = data.results?.[0]?.previewUrl
        if (url) {
          const audio = new Audio(url)
          audio.volume = 0.6
          audio.addEventListener('ended', () => setIsPlaying(false))
          audioRef.current = audio
          if (pendingPlay.current) {
            pendingPlay.current = false
            audio.play().then(() => setIsPlaying(true)).catch(() => {})
          }
        }
      })
      .catch(() => {})
    return () => { audioRef.current?.pause() }
  }, [])

  const handleMusicEnter = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else if (!audioRef.current) {
      pendingPlay.current = true
    }
    setActiveAnnotation('album')
  }

  const handleMusicLeave = () => {
    pendingPlay.current = false
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
    setActiveAnnotation(null)
  }

  return (
    <div className="about-page">
      <main className="about-scroll">

        {/* Left — description column */}
        <div className="about-desc">
          <div className="about-desc-content">

            {/* Cycling title */}
            <CyclingTitle />

            {/* Body copy */}
            <div className="about-body">

              <p className="about-para">
                <span>Started in computer science, I strive to </span>
                <span className="about-em-blue-bold">be creative within the system/technical constraints</span>
                <span>. I grew from being curious about the "how it works" to gravitating towards the "how it says" after I finished my masters in Information Experience Design at Pratt. With this background, my journey combines of 3+ years working with startups to help bring their visions to life.</span>
              </p>

              <p className="about-para">
                <span>All this is to say, </span>
                <span className="about-em-blue-bold">I use all the tools I have to make communications easier</span>
                <span className="about-em-blue">. </span>
                <span>To me, design are the stories we weave into products to bridge art and technology and everything in between.</span>
              </p>

              <div className="about-values">
                <p className="about-italic">What I care about?</p>
                <ul className="about-list">
                  <li><span className="about-em-blue-bold">Craft.</span> I care deeply about the shift one detail can make, and I believe design is a cumulative result of (a bazillion) thoughtful details.</li>
                  <li><span className="about-em-blue-bold">Taste.</span> I know it is an overused term nowadays, but I cannot emphasize enough the importance of having your own voice in the era of saturated art.</li>
                  <li><span className="about-em-blue-bold">Meaning. </span>The work I do should have a positive impact on the people that I design, and meet where they're at.</li>
                </ul>
              </div>

              <div className="about-cta">
                <p className="about-italic">Like my work so far?</p>
                <p className="about-para">
                  <span>Check out my resume / reach out to me at </span>
                  <a href="mailto:hanguyendo01@gmail.com" className="about-em-blue-bold">hanguyendo01@gmail.com</a>
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Annotate button — always visible, top-right of content area */}
        <button
          className={`annotate-btn${showAllAnnotations ? ' active' : ''}`}
          onClick={() => setShowAllAnnotations(v => !v)}
        >
          {showAllAnnotations ? '🪄' : 'annotate'}
        </button>

        {/* Right — pin-board (desktop) */}
        <div className="about-pinboard">

          {/* Sky / NYC skyline — 250×333, rotate -2.26° */}
          <div
            className="about-photo"
            style={{ left: 24, top: 42, transform: 'rotate(-2.26deg)', animationDelay: '0.05s' }}
            onMouseEnter={() => setActiveAnnotation('sky')}
            onMouseLeave={() => setActiveAnnotation(null)}
          >
            <div className="about-photo-hover">
              <div style={{ width: 250, height: 333, overflow: 'hidden', borderRadius: 8 }}>
                <img src="/assets/about-sky.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Jazz performance — 200×267, rotate +4.6° */}
          <div
            className="about-photo"
            style={{ left: 320, top: 155, transform: 'rotate(4.6deg)', animationDelay: '0.15s' }}
            onMouseEnter={() => setActiveAnnotation('jazz')}
            onMouseLeave={() => setActiveAnnotation(null)}
          >
            <div className="about-photo-hover">
              <div style={{ width: 200, height: 267, overflow: 'hidden', borderRadius: 8 }}>
                <img src="/assets/about-jazz.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Nail art — circle-masked, rotate -8.23° */}
          <div
            className="about-photo"
            style={{ left: 111, top: 413, transform: 'rotate(-8.23deg)', animationDelay: '0.25s' }}
            onMouseEnter={() => setActiveAnnotation('nails')}
            onMouseLeave={() => setActiveAnnotation(null)}
          >
            <div className="about-photo-hover">
              <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden' }}>
                <img src="/assets/about-nails.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Sunset / city — 147×196, rotate +0.99° */}
          <div
            className="about-photo"
            style={{ left: 346, top: 503, transform: 'rotate(0.99deg)', animationDelay: '0.32s' }}
            onMouseEnter={() => setActiveAnnotation('sunset')}
            onMouseLeave={() => setActiveAnnotation(null)}
          >
            <div className="about-photo-hover">
              <div style={{ width: 147, height: 196, overflow: 'hidden', borderRadius: 4 }}>
                <img src="/assets/about-sunset.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* ── Annotations — fade in on photo hover ── */}

          {/* Sky: arrow top-left, text right of arrow */}
          <div className="about-annotation" style={{ left: 285, top: 69, width: 305, height: 41, opacity: showAllAnnotations || activeAnnotation === 'sky' ? 1 : 0 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 32.93, height: 19.75, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'scaleX(-1) rotate(25.99deg)', flexShrink: 0 }}>
                <img src="/assets/annotations/arrow-sky.svg" alt="" style={{ display: 'block', width: 34, height: 16 }} />
              </div>
            </div>
            <p className="about-annotation-text" style={{ marginTop: 22, marginLeft: 14, whiteSpace: 'nowrap' }}>the sky is full of inspirations</p>
          </div>

          {/* Jazz: text top, arrow bottom-left */}
          <div className="about-annotation" style={{ left: 539, top: 292, width: 179, height: 91, opacity: showAllAnnotations || activeAnnotation === 'jazz' ? 1 : 0 }}>
            <p className="about-annotation-text" style={{ marginTop: 4, marginLeft: 10, width: 163, whiteSpace: 'normal' }}>i&apos;m a jazz singer by night!</p>
            <div style={{ position: 'absolute', left: 0, top: 62, width: 27.08, height: 28.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flexShrink: 0 }}>
                <img src="/assets/annotations/arrow-jazz.svg" alt="" style={{ display: 'block', width: 24, height: 26 }} />
              </div>
            </div>
          </div>

          {/* Nails: arrow top-right, text below */}
          <div className="about-annotation" style={{ left: 1, top: 442, width: 107, height: 119, opacity: showAllAnnotations || activeAnnotation === 'nails' ? 1 : 0 }}>
            <div style={{ position: 'absolute', left: 63.48, top: 15.93, width: 44.08, height: 16.4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'rotate(165.04deg) scaleY(-1)', flexShrink: 0 }}>
                <img src="/assets/annotations/arrow-nails.svg" alt="" style={{ display: 'block', width: 44, height: 13 }} />
              </div>
            </div>
            <p className="about-annotation-text" style={{ marginTop: 32, marginLeft: 10, width: 86, whiteSpace: 'normal' }}>obsessed with doing my nail arts</p>
          </div>

          {/* Sunset: arrow top-left, text below */}
          <div className="about-annotation" style={{ left: 509, top: 566, width: 135, height: 126, opacity: showAllAnnotations || activeAnnotation === 'sunset' ? 1 : 0 }}>
            <div style={{ position: 'absolute', left: 7, top: 5, width: 33.19, height: 23.49, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'rotate(-150deg) scaleY(-1)', flexShrink: 0 }}>
                <img src="/assets/annotations/arrow-sunset.svg" alt="" style={{ display: 'block', width: 30, height: 19 }} />
              </div>
            </div>
            <p className="about-annotation-text" style={{ marginTop: 32, marginLeft: 15, width: 113, whiteSpace: 'normal' }}>another sky pic cause why not!</p>
          </div>

          {/* Album: arrow points left toward music widget */}
          <div className="about-annotation" style={{ left: 228, top: 647, width: 106, height: 81, opacity: showAllAnnotations || activeAnnotation === 'album' ? 1 : 0 }}>
            <div style={{ position: 'absolute', left: 7, top: 5, width: 33.19, height: 23.49, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'rotate(-150deg) scaleY(-1)', flexShrink: 0 }}>
                <img src="/assets/annotations/arrow-album.svg" alt="" style={{ display: 'block', width: 30, height: 19 }} />
              </div>
            </div>
            <p className="about-annotation-text" style={{ marginTop: 32, marginLeft: 15, width: 91, whiteSpace: 'normal' }}>my fav album currently</p>
          </div>

          {/* Music widget — circular vinyl disk, spins on play */}
          <div
            className="about-music"
            style={{ animationDelay: '0.4s' }}
            onMouseEnter={handleMusicEnter}
            onMouseLeave={handleMusicLeave}
          >
            {/* Circular album art with center dot */}
            <div style={{ position: 'relative', flexShrink: 0, width: 106, height: 106 }}>
              <div style={{
                width: 106, height: 106, borderRadius: '50%', overflow: 'hidden',
                animation: isPlaying ? 'vinyl-spin 3s linear infinite' : 'none',
              }}>
                <img
                  src="/assets/about-album.jpg"
                  alt="Portrait — Samara Joy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* Vinyl center hole */}
              <div style={{
                position: 'absolute', left: '50%', top: 'calc(50% + 1px)',
                width: 6, height: 6, borderRadius: '50%',
                background: '#f7f7f7', border: '0.5px solid rgba(71,62,61,0.15)',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>

            {/* Right column: bars top-right, text bottom-right */}
            <div style={{ display: 'flex', alignSelf: 'stretch', alignItems: 'center' }}>
              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', alignItems: 'flex-end',
                height: '100%',
              }}>
                {/* Equalizer bars — top right */}
                <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: 13 }}>
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                </div>
                {/* Title + artist — bottom */}
                <div>
                  <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 16, color: '#535659', margin: 0, lineHeight: 'normal' }}>Portrait</p>
                  <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontStyle: 'italic', fontSize: 16, color: '#535659', margin: 0, lineHeight: 'normal' }}>Samara Joy</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile pinboard — annotations always visible, stacked vertically */}
        <div className="about-pinboard-mobile">
          <div className="mobile-pin-row">
            <div className="mobile-pin-photo">
              <div style={{ width: 170, height: 227, overflow: 'hidden', borderRadius: 8, transform: 'rotate(-2.26deg)' }}>
                <img src="/assets/about-sky.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <p className="mobile-pin-note">the sky is full of inspirations</p>
          </div>

          <div className="mobile-pin-row mobile-pin-row--reverse">
            <div className="mobile-pin-photo">
              <div style={{ width: 150, height: 200, overflow: 'hidden', borderRadius: 8, transform: 'rotate(4.6deg)' }}>
                <img src="/assets/about-jazz.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
              </div>
            </div>
            <p className="mobile-pin-note">i&apos;m a jazz singer by night!</p>
          </div>

          <div className="mobile-pin-row">
            <div className="mobile-pin-photo">
              <div style={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden' }}>
                <img src="/assets/about-nails.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <p className="mobile-pin-note">obsessed with doing my nail arts</p>
          </div>

          <div className="mobile-pin-row mobile-pin-row--reverse">
            <div className="mobile-pin-photo">
              <div style={{ width: 130, height: 173, overflow: 'hidden', borderRadius: 4, transform: 'rotate(0.99deg)' }}>
                <img src="/assets/about-sunset.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <p className="mobile-pin-note">another sky pic cause why not!</p>
          </div>

          <div
            className="about-music"
            style={{ position: 'static', animation: 'none' }}
            onMouseEnter={handleMusicEnter}
            onMouseLeave={handleMusicLeave}
          >
            <div style={{ position: 'relative', flexShrink: 0, width: 80, height: 80 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', overflow: 'hidden',
                animation: isPlaying ? 'vinyl-spin 3s linear infinite' : 'none',
              }}>
                <img src="/assets/about-album.jpg" alt="Portrait — Samara Joy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{
                position: 'absolute', left: '50%', top: 'calc(50% + 1px)',
                width: 5, height: 5, borderRadius: '50%',
                background: '#f7f7f7', border: '0.5px solid rgba(71,62,61,0.15)',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>
            <div style={{ display: 'flex', alignSelf: 'stretch', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: 13 }}>
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                  <div className={`eq-bar${isPlaying ? ' eq-bar--playing' : ''}`} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontWeight: 500, fontSize: 14, color: '#535659', margin: 0, lineHeight: 'normal' }}>Portrait</p>
                  <p style={{ fontFamily: "'Neue Montreal', sans-serif", fontStyle: 'italic', fontSize: 14, color: '#535659', margin: 0, lineHeight: 'normal' }}>Samara Joy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
