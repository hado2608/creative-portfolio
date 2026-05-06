'use client'

import { useRef, useEffect, useState } from 'react'

// Figma MCP asset URLs (valid for 7 days from generation)
const IMG_ILLUSTRATION = 'https://www.figma.com/api/mcp/asset/cde83a1b-1311-4aae-aee0-5a0ac7e33ad4'
const IMG_ABOUT_DOT    = 'https://www.figma.com/api/mcp/asset/1b20eabf-8a47-4297-ba8e-a7d280995aa6'
const IMG_EMAIL_ICON   = 'https://www.figma.com/api/mcp/asset/3b31d72f-cc55-4eeb-b179-de1830381fcb'
const IMG_SOCIAL_ICON  = 'https://www.figma.com/api/mcp/asset/e5d3ba9e-2cf5-4818-84d4-50b4ab23115e'
const IMG_BLACK_KEY    = 'https://www.figma.com/api/mcp/asset/f21ed72a-c6ab-4b64-97ac-169e83a21a46'

// Base Figma canvas size — all pixel values are from this coordinate space
const FIGMA_W = 591
const FIGMA_H = 390

// Black key dot positions (left offset in px from piano area left edge)
const BLACK_KEY_X = [47, 91, 176, 220, 264, 347, 393]

function WhiteKey() {
  return (
    <div style={{
      background: '#ededeb',
      border: '1px solid #e1e1e1',
      borderRadius: 6,
      boxShadow: '2px 2px 4px 0 rgba(137,137,137,0.25)',
      flexShrink: 0,
      height: 89,
      position: 'relative',
      width: 43,
    }}>
      <div style={{
        background: '#ededeb',
        border: '1.5px solid #e8e8e8',
        borderRadius: 10,
        boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.35)',
        height: 77,
        left: 6,
        position: 'absolute',
        top: 5,
        width: 29,
      }} />
    </div>
  )
}

function ActionButton({ label, showDot }: { label: string; showDot?: boolean }) {
  return (
    <div style={{
      background: '#ededeb',
      border: '1px solid #e1e1e1',
      borderRadius: 6,
      boxShadow: '2px 2px 4px 0 rgba(137,137,137,0.25)',
      cursor: 'pointer',
      flexShrink: 0,
      height: 59,
      position: 'relative',
      width: 121,
    }}>
      <div style={{
        background: '#ededeb',
        border: '1.5px solid #e8e8e8',
        borderRadius: 10,
        boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.35)',
        height: 46,
        left: 6,
        position: 'absolute',
        top: 5,
        width: 106,
      }} />
      {showDot && (
        <div style={{ height: 7, left: 15, position: 'absolute', top: 10, width: 7 }}>
          <img alt="" src={IMG_ABOUT_DOT} style={{ display: 'block', height: '100%', width: '100%' }} />
        </div>
      )}
      <p style={{
        color: '#575757',
        fontFamily: "'Neue Montreal', 'DM Sans', sans-serif",
        fontSize: 12,
        left: '50%',
        lineHeight: 'normal',
        position: 'absolute',
        top: 'calc(50% - 6.5px)',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </p>
    </div>
  )
}

function IconButton({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 6, width: 64 }}>
      <div style={{
        background: '#ededeb',
        border: '1px solid #e1e1e1',
        borderRadius: 6,
        boxShadow: '2px 2px 4px 0 rgba(137,137,137,0.25)',
        cursor: 'pointer',
        height: 59,
        position: 'relative',
        width: '100%',
      }}>
        <div style={{ height: 48, left: 7, overflow: 'hidden', position: 'absolute', top: 4, width: 48 }}>
          <img
            alt={label}
            src={icon}
            style={{ display: 'block', height: '104.17%', maxWidth: 'none', width: '104.17%' }}
          />
        </div>
      </div>
      <p style={{
        color: '#9f9f9f',
        fontFamily: "'Neue Montreal', 'DM Sans', sans-serif",
        fontSize: 12,
        lineHeight: 'normal',
        textAlign: 'center',
        width: '100%',
      }}>
        {label}
      </p>
    </div>
  )
}

export default function MidiKeyboard() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.offsetWidth / FIGMA_W)
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    // Outer wrapper: maintains aspect ratio, clips overflow
    <div
      ref={wrapperRef}
      style={{
        aspectRatio: `${FIGMA_W} / ${FIGMA_H}`,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Inner canvas: fixed pixel size, scaled to fit */}
      <div style={{
        height: FIGMA_H,
        position: 'absolute',
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        width: FIGMA_W,
      }}>
        {/* ── KEYBOARD BODY ── */}
        <div style={{
          background: '#e5e5e3',
          borderBottom: '6px solid #c3c3c3',
          borderRight: '6px solid #c3c3c3',
          borderRadius: 20,
          boxShadow: '0px 4px 10px 0px rgba(123, 123, 123, 0.25)',
          height: FIGMA_H,
          position: 'relative',
          width: FIGMA_W,
        }}>

          {/* ── INFO CARD (top-left) ── */}
          <div style={{
            background: 'linear-gradient(-80.71deg, #2a2a2a 5.94%, #383838 94.06%)',
            borderRadius: 7,
            height: 167,
            left: 18,
            overflow: 'hidden',
            position: 'absolute',
            top: 20,
            width: 263,
          }}>
            {/* Illustration */}
            <div style={{ height: 88, left: 137, overflow: 'hidden', position: 'absolute', top: 13, width: 130.977 }}>
              <img
                alt="Ha Do illustration"
                src={IMG_ILLUSTRATION}
                style={{ height: '140.94%', left: 0, maxWidth: 'none', position: 'absolute', top: '-0.7%', width: '100%' }}
              />
            </div>
            {/* Name */}
            <p style={{
              color: '#e98b74',
              fontFamily: "'Recoleta', Georgia, serif",
              fontSize: 52,
              left: 19,
              letterSpacing: '-2.08px',
              lineHeight: 'normal',
              position: 'absolute',
              top: 27,
              whiteSpace: 'nowrap',
            }}>
              Ha Do
            </p>
            {/* Bio */}
            <div style={{
              color: '#909090',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Neue Montreal', 'DM Sans', sans-serif",
              fontSize: 12,
              gap: 5,
              left: 20,
              lineHeight: 'normal',
              position: 'absolute',
              top: 100,
              width: 200,
            }}>
              <p>Product Designer | Brooklyn, NY</p>
              <p>I remind myself to feel, play, and put intentions in my craft everyday.</p>
            </div>
          </div>

          {/* ── ABOUT + RESUME BUTTONS (top-right) ── */}
          <div style={{
            alignItems: 'center',
            display: 'flex',
            gap: 10,
            left: 306,
            position: 'absolute',
            top: 18,
          }}>
            <ActionButton label="about" showDot />
            <ActionButton label="resume" />
          </div>

          {/* ── SOCIAL ICON BUTTONS ── */}
          <div style={{
            alignItems: 'center',
            display: 'flex',
            gap: 27,
            left: 312,
            position: 'absolute',
            top: 109,
          }}>
            <IconButton icon={IMG_EMAIL_ICON} label="email" />
            <IconButton icon={IMG_SOCIAL_ICON} label="X" />
            <IconButton icon={IMG_SOCIAL_ICON} label="in" />
          </div>

          {/* ── PIANO KEYS AREA ── */}
          <div style={{
            border: '2px solid #e1e1e1',
            borderRadius: 8,
            boxShadow: '1px 2px 2px 0 rgba(189,189,189,0.25)',
            height: 143,
            left: 19,
            overflow: 'hidden',
            position: 'absolute',
            top: 235,
            width: 554,
          }}>
            {/* Black key dots */}
            {BLACK_KEY_X.map((x, i) => (
              <div key={i} style={{ height: 30, left: x, position: 'absolute', top: 6, width: 30 }}>
                <div style={{ bottom: '-4.17%', left: 0, position: 'absolute', right: '-4.17%', top: 0 }}>
                  <img alt="" src={IMG_BLACK_KEY} style={{ display: 'block', height: '100%', maxWidth: 'none', width: '100%' }} />
                </div>
              </div>
            ))}

            {/* White keys */}
            <div style={{
              alignItems: 'center',
              display: 'flex',
              left: 19,
              position: 'absolute',
              top: 41,
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <WhiteKey key={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
