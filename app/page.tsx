'use client'

import dynamic from 'next/dynamic'

const MidiKeyboard = dynamic(() => import('@/components/keyboard/MidiKeyboard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-zinc-600 text-sm font-mono tracking-widest">LOADING</p>
    </div>
  ),
})

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Name + Tagline */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h1 className="text-sm font-mono tracking-[0.2em] uppercase text-zinc-500">
          Ha Do — Designer & Builder
        </h1>
      </div>

      {/* 3D Keyboard Canvas */}
      <div className="w-full max-w-4xl h-[70vh]">
        <MidiKeyboard />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-700 animate-pulse">
          Scroll
        </p>
      </div>
    </main>
  )
}
