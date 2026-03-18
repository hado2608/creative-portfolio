'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// Creates a ribbed/knurled texture like the Worklouder macroset knob
function createKnobTexture(hovered: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  // Base color — off-white
  ctx.fillStyle = hovered ? '#F0E8D8' : '#E8E4DC'
  ctx.fillRect(0, 0, 256, 128)

  // Vertical ridges (knurling)
  const ridgeCount = 40
  for (let i = 0; i < ridgeCount; i++) {
    const x = (i / ridgeCount) * 256
    const width = 256 / ridgeCount
    // Light ridge
    const grad = ctx.createLinearGradient(x, 0, x + width, 0)
    grad.addColorStop(0, 'rgba(255,255,255,0.6)')
    grad.addColorStop(0.3, 'rgba(220,216,208,0.2)')
    grad.addColorStop(0.7, 'rgba(180,175,165,0.4)')
    grad.addColorStop(1, 'rgba(255,255,255,0.1)')
    ctx.fillStyle = grad
    ctx.fillRect(x, 0, width, 128)

    // Ridge shadow line
    ctx.fillStyle = 'rgba(100,95,85,0.18)'
    ctx.fillRect(x + width - 1, 8, 1, 112)
  }

  // Top and bottom edge fade (to simulate cylinder curvature)
  const topFade = ctx.createLinearGradient(0, 0, 0, 28)
  topFade.addColorStop(0, 'rgba(180,175,165,0.5)')
  topFade.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = topFade
  ctx.fillRect(0, 0, 256, 28)

  const botFade = ctx.createLinearGradient(0, 100, 0, 128)
  botFade.addColorStop(0, 'rgba(0,0,0,0)')
  botFade.addColorStop(1, 'rgba(120,115,105,0.4)')
  ctx.fillStyle = botFade
  ctx.fillRect(0, 100, 256, 28)

  return new THREE.CanvasTexture(canvas)
}

interface KnobProps {
  position: [number, number, number]
  label: string
  onClick?: () => void
}

export default function Knob({ position, label, onClick }: KnobProps) {
  const knobRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const [hovered, setHovered] = useState(false)
  const rotY = useRef(-0.5)

  const texture = useMemo(() => createKnobTexture(false), [])
  const textureHovered = useMemo(() => createKnobTexture(true), [])

  useFrame((_, delta) => {
    if (!knobRef.current || !matRef.current) return
    const targetRot = hovered ? rotY.current + 0.25 : -0.5
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetRot, delta * 8)
    knobRef.current.rotation.y = rotY.current
    matRef.current.map = hovered ? textureHovered : texture
    matRef.current.needsUpdate = true
  })

  return (
    <group
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={onClick}
    >
      {/* Gunmetal recessed socket */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Inner socket ring */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.21, 0.015, 8, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Knob body — ribbed cylinder */}
      <mesh ref={knobRef} position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.21, 0.2, 48, 1, false]} />
        <meshStandardMaterial
          ref={matRef}
          map={texture}
          roughness={0.7}
          metalness={0.05}
          emissive={new THREE.Color('#E8A838')}
          emissiveIntensity={hovered ? 0.12 : 0}
        />
      </mesh>

      {/* Flat top cap */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.02, 32]} />
        <meshStandardMaterial
          color={hovered ? '#F5F0E8' : '#EDEAE2'}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Position dot on top */}
      <mesh position={[0, 0.23, 0.13]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color={hovered ? '#E8A838' : '#555550'}
          emissive={hovered ? new THREE.Color('#E8A838') : new THREE.Color('#000')}
          emissiveIntensity={hovered ? 0.8 : 0}
        />
      </mesh>

      {/* Label tooltip on hover */}
      {hovered && (
        <Html center position={[0, 0.6, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", "Courier New", monospace',
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#E8A838',
            whiteSpace: 'nowrap',
            background: 'rgba(10,10,10,0.9)',
            padding: '4px 10px',
            borderRadius: '2px',
            border: '1px solid rgba(232,168,56,0.3)',
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}
