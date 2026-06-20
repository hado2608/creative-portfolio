'use client'

import { useState } from 'react'
import FingerprintLoader from '@/components/home/FingerprintLoader'
import HomeBackground from '@/components/home/HomeBackground'
import IDCard from '@/components/home/IDCard'
import MapHotspots from '@/components/home/MapHotspots'

export default function Home() {
  const [mapVisible, setMapVisible] = useState(false)

  return (
    <div className="hero-page">
      {/* Static background — grid + country silhouette shapes */}
      <HomeBackground />

      {/* Fingerprint loading overlay — unmounts once onComplete fires */}
      {!mapVisible && (
        <FingerprintLoader onComplete={() => setMapVisible(true)} />
      )}

      {/* ID card — mounts after loader, drop-in animation plays on mount */}
      {mapVisible && <IDCard />}

      {/* Phase 3: map hotspot tooltips */}
      <MapHotspots visible={mapVisible} />
    </div>
  )
}
