'use client'

import { useState } from 'react'
import { RoundedBox } from '@react-three/drei'
import LCDScreen from './LCDScreen'
import Knob from './Knob'
import SmallKnob from './SmallKnob'

function JackPort({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.055, 0.055, 0.06, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[0.055, 0.012, 8, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
  )
}

function SmallButton({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.28, 0.06, 0.12]} />
      <meshStandardMaterial color={hovered ? '#CCCCCC' : '#B8B4AC'} roughness={0.85} />
    </mesh>
  )
}

export default function SynthScene() {
  return (
    <group rotation={[0, 0, 0]}>

      {/* === MAIN BODY — off-white matte === */}
      <RoundedBox args={[5.6, 0.32, 3.2]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#E2DDD6" roughness={0.88} metalness={0.03} />
      </RoundedBox>

      {/* Body top face slight recess panel */}
      <mesh position={[0, 0.165, 0]} receiveShadow>
        <boxGeometry args={[5.4, 0.01, 3.0]} />
        <meshStandardMaterial color="#DEDAD3" roughness={0.9} />
      </mesh>

      {/* === LCD SCREEN BEZEL === */}
      <RoundedBox args={[2.1, 0.02, 1.15]} radius={0.04} smoothness={3} position={[-1.05, 0.175, 0.18]}>
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      {/* === LCD SCREEN === */}
      <LCDScreen position={[-1.05, 0.187, 0.18]} />

      {/* === 4 LARGE ENCODER KNOBS (CTAs) === */}
      <Knob position={[1.2,  0.17, -0.22]} label="ABOUT"    onClick={() => console.log('about')} />
      <Knob position={[2.1,  0.17, -0.22]} label="LINKEDIN" onClick={() => console.log('linkedin')} />
      <Knob position={[1.2,  0.17,  0.7]}  label="X"        onClick={() => console.log('x')} />
      <Knob position={[2.1,  0.17,  0.7]}  label="RESUME"   onClick={() => console.log('resume')} />

      {/* === 4 SMALL KNOBS — top strip === */}
      <SmallKnob position={[-2.2, 0.17, -1.1]} />
      <SmallKnob position={[-1.5, 0.17, -1.1]} />
      <SmallKnob position={[-0.8, 0.17, -1.1]} />
      <SmallKnob position={[-0.1, 0.17, -1.1]} />

      {/* === JACK PORTS — 2 rows × 4 cols === */}
      {[0, 1, 2, 3].map((col) =>
        [0, 1].map((row) => (
          <JackPort
            key={`jack-${col}-${row}`}
            position={[0.85 + col * 0.36, 0.19, -1.27 + row * 0.36]}
          />
        ))
      )}

      {/* === SQUARE BUTTON (top right) === */}
      <mesh position={[2.35, 0.19, -1.1]}>
        <boxGeometry args={[0.22, 0.07, 0.22]} />
        <meshStandardMaterial color="#B8B4AC" roughness={0.85} />
      </mesh>

      {/* === 4 BOTTOM BUTTONS === */}
      {[-1.65, -0.9, -0.15, 0.6].map((x, i) => (
        <SmallButton key={i} position={[x, 0.19, 1.32]} />
      ))}

      {/* === CABLE/POWER PORT — right edge === */}
      <mesh position={[2.82, 0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Corner screws */}
      {[[-2.55, -1.35], [-2.55, 1.35], [2.55, -1.35], [2.55, 1.35]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.17, z]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 8]} />
          <meshStandardMaterial color="#AAAAAA" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
    </group>
  )
}
