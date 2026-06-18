import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { clsx } from 'clsx'

export function MagneticButton({ children, className, strength = 30, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={clsx('inline-block', className)} {...props}>
      {children}
    </div>
  )
}

export function ButtonPrimary({ children, to, href, onClick, className, icon = true, ...props }) {
  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {icon && <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </span>
  )

  const baseClass = clsx(
    'group relative inline-flex items-center px-8 py-4 bg-f3-red text-white',
    'font-heading text-sm font-600 tracking-widest uppercase overflow-hidden',
    'hover:bg-f3-red-accent transition-colors duration-300',
    'before:absolute before:inset-0 before:bg-f3-red-accent before:scale-x-0 before:origin-left',
    'before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]',
    'hover:before:scale-x-100',
    className
  )

  if (to) return <Link to={to} className={baseClass} {...props}>{inner}</Link>
  if (href) return <a href={href} className={baseClass} {...props}>{inner}</a>
  return <button onClick={onClick} className={baseClass} {...props}>{inner}</button>
}

export function ButtonOutline({ children, to, href, onClick, className, ...props }) {
  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  )

  const baseClass = clsx(
    'group relative inline-flex items-center px-8 py-4 border border-white text-white',
    'font-heading text-sm font-600 tracking-widest uppercase overflow-hidden',
    'before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left',
    'before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]',
    'hover:before:scale-x-100 hover:text-black transition-colors duration-300',
    className
  )

  if (to) return <Link to={to} className={baseClass} {...props}>{inner}</Link>
  if (href) return <a href={href} className={baseClass} {...props}>{inner}</a>
  return <button onClick={onClick} className={baseClass} {...props}>{inner}</button>
}

export function ButtonGhost({ children, to, href, onClick, className, ...props }) {
  const baseClass = clsx(
    'group inline-flex items-center gap-2 font-heading text-sm font-600 tracking-widest uppercase',
    'text-white hover:text-f3-red transition-colors duration-300',
    className
  )

  const inner = (
    <>
      <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
      {children}
    </>
  )

  if (to) return <Link to={to} className={baseClass} {...props}>{inner}</Link>
  if (href) return <a href={href} className={baseClass} {...props}>{inner}</a>
  return <button onClick={onClick} className={baseClass} {...props}>{inner}</button>
}
