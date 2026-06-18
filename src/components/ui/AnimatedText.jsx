import React, { useRef, useEffect } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedText({
  children,
  as: Tag = 'div',
  className = '',
  type = 'words', // 'chars' | 'words' | 'lines'
  animation = 'slideUp', // 'slideUp' | 'fadeIn' | 'scramble'
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  scrollTrigger = true,
  once = true,
  start = 'top 85%',
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitType(el, { types: type })
    const elements = type === 'chars' ? split.chars
      : type === 'words' ? split.words
      : split.lines

    if (!elements?.length) return

    const vars = {}

    if (animation === 'slideUp') {
      gsap.set(elements, { y: '110%', opacity: 0 })
      vars.y = '0%'
      vars.opacity = 1
    } else if (animation === 'fadeIn') {
      gsap.set(elements, { opacity: 0 })
      vars.opacity = 1
    } else if (animation === 'slideLeft') {
      gsap.set(elements, { x: 60, opacity: 0 })
      vars.x = 0
      vars.opacity = 1
    }

    const animProps = {
      ...vars,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }

    if (scrollTrigger) {
      animProps.scrollTrigger = {
        trigger: el,
        start,
        once,
      }
    }

    const tween = gsap.to(elements, animProps)

    return () => {
      tween.kill()
      split.revert()
    }
  }, [children, type, animation, delay, stagger, duration, scrollTrigger, once, start])

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export function GlitchText({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const original = el.textContent

    const onEnter = () => {
      let iteration = 0
      const interval = setInterval(() => {
        el.textContent = original.split('').map((char, idx) => {
          if (idx < iteration) return original[idx]
          return String.fromCharCode(65 + Math.floor(Math.random() * 26))
        }).join('')

        if (iteration >= original.length) clearInterval(interval)
        iteration += 1 / 3
      }, 30)
    }

    el.addEventListener('mouseenter', onEnter)
    return () => el.removeEventListener('mouseenter', onEnter)
  }, [])

  return (
    <span ref={ref} className={className} data-text={children}>
      {children}
    </span>
  )
}
