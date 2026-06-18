import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [showSkip, setShowSkip] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show skip after 2s
    const skipTimer = setTimeout(() => setShowSkip(true), 2000)

    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {
      // Autoplay blocked: just complete
      handleComplete()
    })

    return () => clearTimeout(skipTimer)
  }, [])

  const handleComplete = () => {
    if (exiting) return
    setExiting(true)

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => onComplete(),
    })
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/assets/f3-intro.mp4"
        className="w-full h-full object-cover"
        playsInline
        muted
        onEnded={handleComplete}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Overlay vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* Logo overlay */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="w-1 h-12 bg-f3-red" />
        <span className="font-display text-xs tracking-[0.5em] text-white/60 uppercase">
          Fight For Fitness
        </span>
      </motion.div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            onClick={handleComplete}
            className="absolute top-8 right-8 flex items-center gap-2 font-heading text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <span>Skip Intro</span>
            <div className="w-6 h-px bg-white/40 group-hover:bg-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
        <motion.div
          className="h-full bg-f3-red"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 8, ease: 'linear' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  )
}
