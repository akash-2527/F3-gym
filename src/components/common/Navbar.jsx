import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const navLinks = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/gallery',  label: 'Gallery' },
  { path: '/contact',  label: 'Contact' },
]

const menuVariants = {
  closed: { opacity: 0, x: '100%' },
  open:   { opacity: 1, x: 0, transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] } },
  exit:   { opacity: 0, x: '100%', transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } },
}

const linkVar = {
  closed: { opacity: 0, y: 36 },
  open:   (i) => ({ opacity: 1, y: 0, transition: { delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.23,1,0.32,1] } }),
}

export default function Navbar() {
  const { isNavOpen, toggleNav, closeNav } = useApp()
  const location  = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { closeNav() }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isNavOpen])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.93)' : 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(193,18,31,0.12)' : 'none',
        }}
      >
        <nav className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-sm">
              <img src="/assets/f3-logo.jpg" alt="F3 Fight For Fitness"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl md:text-2xl text-white tracking-widest block leading-none">F3</span>
              <span className="font-heading text-[8px] text-white/35 tracking-[0.3em] uppercase">Fight For Fitness</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link to={path}
                  className={`relative font-heading text-sm font-600 tracking-widest uppercase transition-colors duration-300 group ${
                    isActive(path) ? 'text-f3-red' : 'text-white/80 hover:text-white'
                  }`}>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-f3-red transition-all duration-300 ${
                    isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link to="/contact"
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 font-heading text-xs font-600 tracking-widest uppercase border border-f3-red text-f3-red hover:bg-f3-red hover:text-white transition-all duration-300">
              Join Now
            </Link>

            <button onClick={toggleNav}
              className="relative z-[110] w-10 h-10 flex items-center justify-center text-white lg:hidden"
              aria-label="Toggle menu">
              <AnimatePresence mode="wait">
                {isNavOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity:0 }} animate={{ rotate: 0, opacity:1 }} exit={{ rotate: 90,  opacity:0 }} transition={{ duration:0.2 }}><X    size={22} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate:  90, opacity:0 }} animate={{ rotate: 0, opacity:1 }} exit={{ rotate: -90, opacity:0 }} transition={{ duration:0.2 }}><Menu size={22} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div key="mobile-menu"
            variants={menuVariants} initial="closed" animate="open" exit="exit"
            className="fixed inset-0 z-[105] flex flex-col bg-black">
            {/* Red left accent */}
            <div className="absolute top-0 left-0 w-0.5 h-full bg-f3-red" />
            {/* Subtle diagonal pattern */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
              backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(193,18,31,0.8) 10px,rgba(193,18,31,0.8) 11px)'
            }} />

            <div className="relative z-10 flex flex-col justify-center h-full px-10 py-20">
              <div className="mb-10">
                <span className="section-label">Navigation</span>
              </div>

              <ul className="space-y-1">
                {navLinks.map(({ path, label }, i) => (
                  <motion.li key={path} custom={i} variants={linkVar} initial="closed" animate="open">
                    <Link to={path} onClick={closeNav}
                      className={`block font-display leading-none tracking-tight transition-colors duration-300 ${
                        isActive(path) ? 'text-f3-red' : 'text-white hover:text-f3-red'
                      }`}
                      style={{ fontSize: 'clamp(48px, 12vw, 88px)' }}>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="mt-14"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.4 }}>
                <Link to="/contact" onClick={closeNav}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-f3-red font-heading text-sm font-600 tracking-widest uppercase text-white hover:bg-f3-red-accent transition-colors">
                  Start Your Journey
                </Link>
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-10 right-10 flex items-center justify-between"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
                <span className="font-heading text-[10px] text-white/25 tracking-widest uppercase">© {new Date().getFullYear()} F3</span>
                <div className="flex gap-5">
                  {['IG','YT','FB'].map(s => (
                    <a key={s} href="#"
                      className="font-heading text-[10px] text-white/25 hover:text-f3-red tracking-widest uppercase transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
