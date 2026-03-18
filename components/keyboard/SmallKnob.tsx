'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SmallKnobProps {
  position: [number, number, number]
}

export default function SmallKnob({ position }: SmallKnobProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!ref.current) return
    const target = hovered ? 0.4 : 0
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target, delta * 10)
  })

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[0.22, 0.04, 0.22]} />
        <meshStandardMaterial color="#BBBBBB" roughness={0.85} />
      </mesh>
      {/* Knob */}
      <mesh ref={ref} position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.1, 24]} />
        <meshStandardMaterial
          color={hovered ? '#D0CDC5' : '#C4C0B8'}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      {/* Marker */}
      <mesh position={[0, 0.12, 0.07]}>
        <boxGeometry args={[0.015, 0.02, 0.01]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  )
}
