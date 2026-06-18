import React, { useEffect, useRef, useCallback } from 'react'
import { useApp } from '../../contexts/AppContext'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const { cursorVariant } = useApp()

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rafId

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.set(dot, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50 })
    }

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      gsap.set(ring, {
        x: ringPos.current.x,
        y: ringPos.current.y,
        xPercent: -50,
        yPercent: -50,
      })
      rafId = requestAnimationFrame(animateRing)
    }

    animateRing()
    window.addEventListener('mousemove', onMove, { passive: true })

    // Hover interactions
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(dot, { scale: 2.5, duration: 0.3, ease: 'power2.out' })
          gsap.to(ring, { scale: 1.8, borderColor: '#FF2D2D', duration: 0.3 })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
          gsap.to(ring, { scale: 1, borderColor: 'rgba(193,18,31,0.6)', duration: 0.3 })
        })
      })
    }

    // Small delay to let DOM mount
    const timer = setTimeout(addHover, 500)

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })

    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          backgroundColor: '#FF2D2D',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: '1.5px solid rgba(193,18,31,0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
