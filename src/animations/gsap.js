import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Standard Easing Presets ──────────────────────────────────────
export const ease = {
  smooth: 'power3.out',
  swift: 'power4.out',
  elastic: 'elastic.out(1, 0.4)',
  expo: 'expo.out',
  circ: 'circ.out',
  bounce: 'bounce.out',
  snap: 'back.out(1.7)',
  premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
}

// ─── Clip-path Reveals ────────────────────────────────────────────
export const clipReveal = {
  fromBottom: {
    initial: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
    final: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  },
  fromLeft: {
    initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    final: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  },
  fromRight: {
    initial: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
    final: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  },
}

// ─── Batch Reveal Factory ─────────────────────────────────────────
export function createBatchReveal(selector, {
  y = 40,
  x = 0,
  opacity = 0,
  stagger = 0.1,
  duration = 0.8,
  start = 'top 80%',
  ease: easeVal = 'power3.out',
} = {}) {
  return ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.from(elements, {
        y,
        x,
        opacity,
        stagger,
        duration,
        ease: easeVal,
      })
    },
    start,
    once: true,
  })
}

// ─── Horizontal Scroll ────────────────────────────────────────────
export function createHorizontalScroll(containerEl, trackEl) {
  if (!containerEl || !trackEl) return null

  const getScrollAmount = () => -(trackEl.scrollWidth - trackEl.clientWidth)

  return gsap.to(trackEl, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: containerEl,
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
}

// ─── Image Parallax ───────────────────────────────────────────────
export function createImageParallax(el, { speed = 0.2, scrub = 1 } = {}) {
  if (!el) return null
  return gsap.to(el, {
    yPercent: speed * -100,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  })
}

// ─── Counter Animation ────────────────────────────────────────────
export function animateCounter(el, { end, duration = 2, suffix = '', delay = 0 } = {}) {
  if (!el) return null
  const counter = { val: 0 }
  return gsap.to(counter, {
    val: end,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(counter.val) + suffix
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true,
    },
  })
}

// ─── Stagger Entrance ────────────────────────────────────────────
export function staggerEntrance(elements, {
  from = { y: 50, opacity: 0 },
  to = { y: 0, opacity: 1 },
  stagger = 0.1,
  duration = 0.8,
  delay = 0,
  trigger,
  start = 'top 75%',
} = {}) {
  if (!elements?.length) return null

  const tween = gsap.fromTo(elements, from, {
    ...to,
    stagger,
    duration,
    delay,
    ease: 'power3.out',
  })

  if (trigger) {
    tween.scrollTrigger = ScrollTrigger.create({
      trigger,
      start,
      animation: tween,
      once: true,
    })
  }

  return tween
}

// ─── Magnetic Effect ─────────────────────────────────────────────
export function applyMagnetic(el, strength = 0.3) {
  if (!el) return () => {}

  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(el, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.4,
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
}

// ─── Page Transition ─────────────────────────────────────────────
export function pageEnter(el, onComplete) {
  return gsap.fromTo(el,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', onComplete }
  )
}

export function pageExit(el, onComplete) {
  return gsap.to(el, {
    opacity: 0, y: -20,
    duration: 0.4,
    ease: 'power3.in',
    onComplete,
  })
}

// ─── Refresh ScrollTrigger ────────────────────────────────────────
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
