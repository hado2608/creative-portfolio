'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ASCII_NAME = [
  '██╗  ██╗ █████╗      ██████╗  ██████╗',
  '██║  ██║██╔══██╗     ██╔══██╗██╔═══██╗',
  '███████║███████║     ██║  ██║██║   ██║',
  '██╔══██║██╔══██║     ██║  ██║██║   ██║',
  '██║  ██║██║  ██║     ██████╔╝╚██████╔╝',
  '╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝',
]

function createLCDTexture(scanlineOffset: number = 0): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Black background
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, 512, 256)

  // ASCII text — white glow
  ctx.font = 'bold 18px "Courier New", monospace'
  ctx.textBaseline = 'top'

  // Glow
  ctx.shadowColor = '#ffffff'
  ctx.shadowBlur = 6
  ctx.fillStyle = '#e0e0e0'

  ASCII_NAME.forEach((line, i) => {
    ctx.fillText(line, 14, 26 + i * 32)
  })

  // Scanlines overlay
  ctx.shadowBlur = 0
  for (let y = scanlineOffset; y < 256; y += 4) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    ctx.fillRect(0, y, 512, 2)
  }

  // Vignette
  const grad = ctx.createRadialGradient(256, 128, 60, 256, 128, 200)
  grad.addColorStop(0, 'rgba(0,0,0,0)')
  grad.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)

  return new THREE.CanvasTexture(canvas)
}

export default function LCDScreen({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  const texture = useMemo(() => createLCDTexture(), [])

  // Subtle flicker / scanline crawl
  let tick = 0
  useFrame((_, delta) => {
    tick += delta
    if (tick > 0.08 && matRef.current) {
      tick = 0
      const newTex = createLCDTexture(Math.floor(Math.random() * 4))
      matRef.current.map?.dispose()
      matRef.current.map = newTex
      matRef.current.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} position={position} receiveShadow>
      <planeGeometry args={[1.9, 0.95]} />
      <meshStandardMaterial
        ref={matRef}
        map={texture}
        emissive={new THREE.Color('#1a1a1a')}
        emissiveIntensity={0.3}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  )
}
