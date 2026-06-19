import Image from 'next/image'

export default function SocialsColumn() {
  const linkStyle: React.CSSProperties = {
    color: 'rgba(71,62,61,0.6)',
    fontFamily: "'Neue Montreal', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    textDecoration: 'none',
    display: 'block',
  }

  return (
    <div style={{
      background: '#F7F7F7',
      borderLeft: '1px solid rgba(71,62,61,0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'space-between',
      padding: '32px 12px',
      position: 'sticky',
      top: 0,
    }}>
      {/* Top: social links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href="mailto:hanguyendo01@gmail.com" style={linkStyle}>
          Email
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          X
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          LinkedIn
        </a>
        <a
          href="https://drive.google.com/file/d/1E9scvqdXUT921qdnXpJRLvfu_gvBml4M/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Resume
        </a>
      </div>

      {/* Bottom: signature */}
      <Image
        src="/assets/signature.png"
        alt="Ha Do signature"
        width={94}
        height={37}
        unoptimized
        style={{ opacity: 0.6 }}
      />
    </div>
  )
}
