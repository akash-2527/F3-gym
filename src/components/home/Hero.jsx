import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Unsplash image – dark elite gym interior
const HERO_IMG = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85'

export default function Hero() {
  const sectionRef    = useRef(null)
  const imgRef        = useRef(null)
  const fight1Ref     = useRef(null)
  const fight2Ref     = useRef(null)
  const subRef        = useRef(null)
  const ctaRef        = useRef(null)
  const sideRef       = useRef(null)
  const logoFrameRef  = useRef(null)
  const statsRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      // ── Image scale-in ──
      tl.fromTo(imgRef.current,
        { scale: 1.18, opacity: 0 },
        { scale: 1.06, opacity: 1, duration: 1.6, ease: 'power3.out' },
        0
      )

      // ── FIGHT (line 1) ──
      const split1 = new SplitType(fight1Ref.current, { types: 'chars' })
      gsap.set(split1.chars, { y: '110%', opacity: 0 })
      tl.to(split1.chars, {
        y: '0%', opacity: 1,
        stagger: 0.03, duration: 0.9, ease: 'power4.out',
      }, 0.25)

      // ── "FOR FITNESS" line ──
      const split2 = new SplitType(fight2Ref.current, { types: 'chars' })
      gsap.set(split2.chars, { y: '110%', opacity: 0 })
      tl.to(split2.chars, {
        y: '0%', opacity: 1,
        stagger: 0.025, duration: 0.9, ease: 'power4.out',
      }, 0.5)

      // ── Sub, CTA, side text ──
      tl.fromTo(subRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        0.85
      )
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.0
      )
      tl.fromTo(sideRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        0.9
      )
      tl.fromTo(logoFrameRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' },
        0.7
      )
      tl.fromTo('.hero-stat-item',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
        1.1
      )

      // ── Parallax on scroll ──
      gsap.to(imgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      })

      return () => { split1.revert(); split2.revert() }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-black"
      aria-label="Hero"
    >
      {/* ── Background image ── */}
      <div ref={imgRef} className="absolute inset-0 scale-110 will-change-transform">
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        {/* Red radial atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 60% at 75% 45%, rgba(193,18,31,0.18) 0%, transparent 65%),
              radial-gradient(ellipse 30% 30% at 15% 80%, rgba(193,18,31,0.08) 0%, transparent 60%)
            `
          }}
        />
      </div>

      {/* ── Vertical side text (left) ── */}
      <div
        ref={sideRef}
        className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-f3-red to-transparent" />
        <span
          className="font-heading text-[9px] text-white/30 tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Hyderabad · Est. 2018
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-f3-red via-f3-red/20 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-14 lg:px-24 pt-32 pb-28">
        <div className="grid grid-cols-12 gap-4 items-center">

          {/* Left: headline block */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7">

            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Elite Performance Training</span>
            </div>

            {/* FIGHT – stroke style first word */}
            <div className="overflow-hidden leading-none">
              <h1
                ref={fight1Ref}
                className="font-display text-white uppercase leading-none select-none"
                style={{
                  fontSize: 'clamp(72px, 14vw, 210px)',
                  lineHeight: 0.86,
                  WebkitTextStroke: '2px white',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.01em',
                }}
              >
                FIGHT
              </h1>
            </div>

            {/* FOR FITNESS – filled red + white */}
            <div className="overflow-hidden leading-none">
              <div
                ref={fight2Ref}
                className="font-display uppercase leading-none select-none flex items-baseline gap-4 flex-wrap"
                style={{ fontSize: 'clamp(72px, 14vw, 210px)', lineHeight: 0.86 }}
              >
                <span className="text-f3-red" style={{ letterSpacing: '-0.01em' }}>FOR</span>
                <span
                  className="text-white"
                  style={{
                    WebkitTextStroke: '2px white',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.01em',
                  }}
                >
                  FITNESS
                </span>
              </div>
            </div>

            {/* Red diagonal accent line */}
            <div className="relative mt-6 mb-8 h-px">
              <div
                className="absolute left-0 h-px w-2/3"
                style={{
                  background: 'linear-gradient(90deg, #C1121F 0%, rgba(193,18,31,0.2) 80%, transparent 100%)'
                }}
              />
            </div>

            {/* Subline */}
            <p
              ref={subRef}
              className="font-body text-base md:text-lg text-white/55 max-w-md leading-relaxed mb-10"
            >
              Spartan discipline. Modern science. F3 is not a gym — it is a forge. 
              Transform your body, forge your mind, own your future.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-f3-red text-white font-heading text-sm tracking-widest uppercase overflow-hidden hover:bg-f3-red-accent transition-colors duration-300"
              >
                Start Training
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-heading text-sm tracking-widest uppercase hover:border-white transition-colors duration-300"
              >
                Explore Programs
              </Link>
            </div>
          </div>

          {/* Right: F3 logo frame – desktop only */}
          <div className="hidden xl:flex col-span-4 xl:col-span-5 justify-end items-center pr-8">
            <div ref={logoFrameRef} className="relative">
              {/* Rotating ring */}
              <div
                className="absolute -inset-6 border border-f3-red/20 rounded-full animate-spin-slow pointer-events-none"
                style={{ borderStyle: 'dashed', borderWidth: '1px' }}
              />
              <div
                className="absolute -inset-12 border border-f3-red/10 rounded-full"
                style={{ borderStyle: 'dotted', animation: 'spin 14s linear infinite reverse' }}
              />

              {/* Logo box */}
              <div
                className="relative w-64 h-64 xl:w-80 xl:h-80 overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                  boxShadow: '0 0 80px rgba(193,18,31,0.25), 0 0 160px rgba(193,18,31,0.12)',
                }}
              >
                <img
                  src="/assets/f3-logo.jpg"
                  alt="F3 Fight For Fitness"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
              </div>

              {/* Red corner accents */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-f3-red" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-f3-red" />
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef}
          className="mt-20 pt-8 border-t border-white/6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
        >
          {[
            { val: '500+', label: 'Active Warriors' },
            { val: '15+',  label: 'Expert Coaches' },
            { val: '6 Yrs', label: 'Of Excellence' },
            { val: '98%',  label: 'Success Rate' },
          ].map(({ val, label }, i) => (
            <div
              key={label}
              className={`hero-stat-item ${i > 0 ? 'md:border-l md:border-white/6 md:pl-8' : ''}`}
            >
              <p className="font-display text-4xl md:text-5xl text-f3-red tracking-wide">{val}</p>
              <p className="font-heading text-[10px] text-white/35 tracking-[0.3em] uppercase mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-heading text-[9px] tracking-[0.45em] uppercase text-white/30">Scroll</span>
        <ArrowDown size={13} className="text-white/30 animate-bounce" />
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* ── Background "F3" watermark – more visible ── */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 font-display select-none pointer-events-none"
        style={{
          fontSize: 'clamp(160px, 32vw, 520px)',
          lineHeight: 0.78,
          color: 'rgba(255,255,255,0.055)',
          letterSpacing: '-0.04em',
        }}
      >
        F3
      </div>
    </section>
  )
}
