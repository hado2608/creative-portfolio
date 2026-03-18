'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import SynthScene from './SynthScene'

// Moves camera based on scroll progress (0 = top-down front, 1 = skewed inward)
function ScrollCamera() {
  const { camera } = useThree()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight * 0.6
      const t = Math.min(scrollY / maxScroll, 1)

      // Lerp from front-facing top-down → skewed inward angle
      camera.position.set(
        0,
        5.5 - t * 1.5,   // come down a bit
        2.5 + t * 2.5    // pull back and tilt
      )
      camera.lookAt(0, 0, 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [camera])

  return null
}

export default function MidiKeyboard() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 5.5, 2.5], fov: 38 }}
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} color="#F5F0E8" />
          <directionalLight
            position={[-4, 6, 3]}
            intensity={1.4}
            color="#FFF8F0"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={20}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />
          <directionalLight position={[4, 3, -2]} intensity={0.4} color="#E8F0FF" />
          <pointLight position={[0, 2, 4]} intensity={0.2} color="#FFF5E0" />

          <SynthScene />

          <ContactShadows
            position={[0, -0.22, 0]}
            opacity={0.3}
            scale={10}
            blur={2.5}
            far={1}
          />

          <Environment preset="studio" />
          <ScrollCamera />
        </Suspense>
      </Canvas>
    </div>
  )
}
