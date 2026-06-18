import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── useGSAP ─────────────────────────────────────────────────────
/**
 * Safe GSAP context that auto-reverts on unmount.
 * Usage: useGSAP(() => { gsap.from(ref.current, {...}) }, [deps], scopeRef)
 */
export function useGSAP(callback, deps = [], scope = null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const ctx = gsap.context(() => savedCallback.current(), scope?.current ?? document)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// ─── useScrollTrigger ─────────────────────────────────────────────
/**
 * Creates a ScrollTrigger animation on a ref element.
 */
export function useScrollTrigger({
  trigger,
  animation,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  once = true,
  onEnter,
  onLeave,
}) {
  useEffect(() => {
    const el = trigger?.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub,
      pin,
      once,
      animation,
      onEnter,
      onLeave,
    })

    return () => st.kill()
  }, [trigger, animation, start, end, scrub, pin, once, onEnter, onLeave])
}

// ─── useMagnetic ──────────────────────────────────────────────────
/**
 * Applies magnetic hover effect to a ref element.
 */
export function useMagnetic(ref, { strength = 0.3, ease = 0.4 } = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      gsap.to(el, {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
        duration: ease,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength, ease])
}

// ─── useWindowSize ────────────────────────────────────────────────
/**
 * Returns current window dimensions, debounced.
 */
export function useWindowSize() {
  const [size, setSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
        ScrollTrigger.refresh()
      }, 200)
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timer)
    }
  }, [])

  return size
}

// ─── useInView ────────────────────────────────────────────────────
/**
 * Returns whether a ref element is in the viewport.
 */
export function useInView(ref, { threshold = 0.1, once = true } = {}) {
  const [inView, setInView] = React.useState(false)

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, once])

  return inView
}

// ─── useParallax ──────────────────────────────────────────────────
/**
 * Applies a GSAP parallax effect to a ref element.
 */
export function useParallax(ref, { speed = 0.5, start = 'top bottom', end = 'bottom top' } = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const tween = gsap.to(el, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 1,
      },
    })

    return () => tween.kill()
  }, [ref, speed, start, end])
}

// ─── useTextReveal ────────────────────────────────────────────────
/**
 * Animates text reveal using SplitType.
 */
export function useTextReveal(ref, { delay = 0, stagger = 0.05, type = 'words' } = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    let split
    const runAnimation = async () => {
      const SplitType = (await import('split-type')).default
      split = new SplitType(el, { types: type })
      const els = split[type === 'chars' ? 'chars' : type === 'lines' ? 'lines' : 'words']

      gsap.set(els, { y: '110%', opacity: 0 })
      gsap.to(els, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    }

    runAnimation()
    return () => {
      split?.revert()
    }
  }, [ref, delay, stagger, type])
}

// Add React import for useWindowSize / useInView
import React from 'react'
