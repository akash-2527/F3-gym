import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

// Dumbbell outline SVG path length ~= 600 (used for stroke animation)
const DUMBBELL_PATH = `
  M 60 80 L 60 120
  M 30 70 L 30 130
  M 10 60 L 10 140
  L 50 140 L 50 60 Z
  M 10 60 L 50 60
  M 10 140 L 50 140
  M 30 70 L 60 70
  M 30 130 L 60 130
  M 60 80 L 60 120
  M 60 70 L 140 70
  M 60 130 L 140 130
  M 140 70 L 140 130
  M 140 80 L 170 80
  M 140 120 L 170 120
  M 150 70 L 150 130
  M 170 60 L 170 140
  M 190 60 L 190 140
  L 150 140 L 150 60 Z
  M 170 60 L 190 60
  M 170 140 L 190 140
`

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    // Robust fallback — always complete within 3.5s
    const fallbackId = setTimeout(() => {
      if (!cancelled) {
        setDone(true)
        setTimeout(() => { if (!cancelled) onComplete() }, 600)
      }
    }, 3500)

    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate() {
        if (!cancelled) setProgress(Math.round(counter.val))
      },
      onComplete() {
        if (!cancelled) {
          clearTimeout(fallbackId)
          setDone(true)
          setTimeout(() => { if (!cancelled) onComplete() }, 600)
        }
      },
    })

    return () => {
      cancelled = true
      clearTimeout(fallbackId)
      tween.kill()
    }
  }, [onComplete])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Dumbbell SVG outline that fills with red stroke as progress grows */}
      <div className="relative mb-10">
        <svg
          width="220"
          height="90"
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C1121F" />
              <stop offset="100%" stopColor="#FF2D2D" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Track (ghost dumbbell) ── */}
          <g stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" fill="none">
            {/* Left plate outer */}
            <rect x="2" y="10" width="28" height="60" rx="3" />
            {/* Left plate inner */}
            <rect x="12" y="20" width="8" height="40" rx="2" />
            {/* Bar */}
            <rect x="30" y="34" width="140" height="12" rx="4" />
            {/* Right plate inner */}
            <rect x="180" y="20" width="8" height="40" rx="2" />
            {/* Right plate outer */}
            <rect x="170" y="10" width="28" height="60" rx="3" />
          </g>

          {/* ── Progress fill (red dumbbell drawn via clipPath) ── */}
          <clipPath id="progressClip">
            <rect x="0" y="0" width={progress * 2} height="80" />
          </clipPath>
          <g
            stroke="url(#redGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            clipPath="url(#progressClip)"
            style={{ transition: 'clip-path 0.05s linear' }}
          >
            <rect x="2" y="10" width="28" height="60" rx="3" />
            <rect x="12" y="20" width="8" height="40" rx="2" />
            <rect x="30" y="34" width="140" height="12" rx="4" />
            <rect x="180" y="20" width="8" height="40" rx="2" />
            <rect x="170" y="10" width="28" height="60" rx="3" />
          </g>

          {/* Glow dot at progress head */}
          <circle
            cx={2 + (progress / 100) * 196}
            cy="40"
            r="3"
            fill="#FF2D2D"
            filter="url(#glow)"
            style={{ transition: 'cx 0.05s linear' }}
          />
        </svg>

        {/* Red glow underneath */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 blur-xl opacity-50 h-3 rounded-full transition-all duration-100"
          style={{ width: `${progress * 1.5}px`, background: '#C1121F' }}
        />
      </div>

      {/* Brand */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-f3-red to-transparent" />
        <div className="text-center">
          <p className="font-display text-5xl text-white tracking-[0.2em] leading-none">F3</p>
          <p className="font-heading text-[9px] text-f3-gray-light tracking-[0.45em] uppercase mt-1">
            Fight For Fitness
          </p>
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-f3-red to-transparent" />
      </div>

      {/* Progress bar + percentage */}
      <div className="w-56 sm:w-72">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-[10px] text-f3-gray-light tracking-[0.35em] uppercase">
            Loading
          </span>
          <span className="font-display text-lg text-f3-red tabular-nums">{progress}%</span>
        </div>

        {/* Track */}
        <div className="h-[1px] bg-white/8 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-f3-red to-f3-red-accent transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tagline pulse */}
      <motion.p
        className="mt-8 font-heading text-[10px] text-f3-gray-light tracking-[0.4em] uppercase"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Forging Warriors Since 2018
      </motion.p>
    </motion.div>
  )
}
