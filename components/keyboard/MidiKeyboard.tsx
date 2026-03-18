'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import SynthScene from './SynthScene'

export default function MidiKeyboard() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 5.5, 5], fov: 38 }}
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting — soft studio 3-point */}
          <ambientLight intensity={0.6} color="#F5F0E8" />
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

          {/* Soft ground shadow */}
          <ContactShadows
            position={[0, -0.2, 0]}
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={1}
          />

          <Environment preset="studio" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 3}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
