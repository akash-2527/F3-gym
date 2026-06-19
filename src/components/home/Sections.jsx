import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, ArrowRight } from 'lucide-react'
import AnimatedText from '../ui/AnimatedText'
import { ButtonPrimary } from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

const COMMUNITY_IMG  = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80'
const EQUIPMENT_IMG  = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80'
const STRENGTH_IMG   = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80'
const HIIT_IMG       = 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80'

/* ─── Stats Counter ───────────────────────────────────────────── */
const stats = [
  { end: 500, suffix: '+', label: 'Active Warriors' },
  { end: 15,  suffix: '+', label: 'Elite Coaches' },
  { end: 6,   suffix: '',  label: 'Years of Mastery' },
  { end: 98,  suffix: '%', label: 'Success Rate' },
]

export function StatsCounter() {
  const sectionRef  = useRef(null)
  const triggered   = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.stat-block').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        )
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true
          stats.forEach((stat, i) => {
            const el = document.querySelector(`.stat-num-${i}`)
            if (!el) return
            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.end,
              duration: 2,
              delay: i * 0.12,
              ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix },
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-f3-red py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 20px,rgba(0,0,0,0.4) 20px,rgba(0,0,0,0.4) 21px)' }} />
      <div aria-hidden="true" className="absolute right-0 top-0 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: '38vw', color: 'rgba(0,0,0,0.09)' }}>F3</div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
          {stats.map(({ end, suffix, label }, i) => (
            <div key={label} className="stat-block text-center md:text-left" style={{ opacity: 1 }}>
              <p className={`stat-num-${i} font-display text-white`}
                style={{ fontSize: 'clamp(46px, 6vw, 94px)', lineHeight: 1 }}>
                0{suffix}
              </p>
              <p className="font-heading text-xs text-white/65 tracking-[0.3em] uppercase mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─────────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Competitive Athlete',
    quote: 'F3 didn\'t just change my physique — it rewired my entire mentality. In 6 months I dropped 18kg and became a completely different athlete.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Corporate Professional',
    quote: 'I was sceptical. Now I\'m 3 months in — 12kg down, real functional strength gained, and my confidence is through the roof. The coaches here are world-class.',
    rating: 5,
  },
  {
    name: 'Vikram Reddy',
    role: 'Strength Athlete',
    quote: 'After 8 years of training I thought I\'d plateaued. F3\'s programming broke through every barrier. My numbers have never been this high.',
    rating: 5,
  },
]

export function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.tcard').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.14, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-f3-darker py-24 md:py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute -left-8 bottom-0 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: '28vw', color: 'rgba(255,255,255,0.03)' }}>WIN</div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Testimonials</span>
            </div>
            <AnimatedText as="h2" className="font-display text-white"
              style={{ fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 0.94 }}>
              WARRIORS<br /><span className="text-f3-red">SPEAK.</span>
            </AnimatedText>
          </div>
          <Link to="/about" className="flex items-center gap-2 font-heading text-sm text-f3-red hover:text-f3-red-accent tracking-widest uppercase transition-colors group">
            Read All Stories
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, quote, rating }) => (
            <div key={name} className="tcard group glass p-8 border border-white/5 hover:border-f3-red/20 transition-colors duration-400 relative"
              style={{ opacity: 1 }}>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-f3-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Quote size={30} className="text-f3-red/25 mb-5" />
              <p className="font-body text-sm text-white/65 leading-relaxed mb-7 italic">"{quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-base text-white font-600">{name}</p>
                  <p className="font-body text-xs text-f3-gray-light mt-0.5">{role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={11} className="text-f3-red fill-f3-red" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Gallery Preview ──────────────────────────────────────────── */
const galleryItems = [
  { id: 1, label: 'Strength Zone',    img: STRENGTH_IMG,  aspect: 'tall' },
  { id: 2, label: 'Elite Equipment',  img: EQUIPMENT_IMG, aspect: 'wide' },
  { id: 3, label: 'Transformations',  img: HIIT_IMG,      aspect: 'square' },
  { id: 4, label: 'Community',        img: COMMUNITY_IMG, aspect: 'tall' },
]

export function GalleryPreview() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.gp-item').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Gallery</span>
            </div>
            <AnimatedText as="h2" className="font-display text-white"
              style={{ fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 0.94 }}>
              INSIDE THE<br /><span className="text-f3-red">FORGE.</span>
            </AnimatedText>
          </div>
          <ButtonPrimary to="/gallery">Full Gallery</ButtonPrimary>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryItems.map(({ id, label, img, aspect }) => (
            <Link
              key={id}
              to="/gallery"
              className="gp-item group relative overflow-hidden bg-f3-gray"
              style={{
                aspectRatio: aspect === 'tall' ? '3/4' : aspect === 'wide' ? '4/3' : '1/1',
                opacity: 1,
              }}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-f3-red/30 transition-colors duration-400" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="font-heading text-sm text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact CTA ──────────────────────────────────────────────── */
export function ContactCTA() {
  return (
    <section className="relative bg-f3-darker py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(193,18,31,0.07) 0%, transparent 70%)'
      }} />

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-f3-red" />
          <span className="section-label">Get Started</span>
          <div className="w-8 h-px bg-f3-red" />
        </div>

        <AnimatedText as="h2" className="font-display text-white mb-6 mx-auto"
          style={{ fontSize: 'clamp(46px, 8vw, 136px)', lineHeight: 0.9 }}>
          YOUR NEXT<br />
          <span className="text-f3-red">CHAPTER</span><br />
          STARTS NOW.
        </AnimatedText>

        <p className="font-body text-sm text-white/45 max-w-md mx-auto mb-11 leading-relaxed">
          Stop waiting for the perfect moment. The moment is now. Book your free consultation and
          take the first step toward the warrior version of yourself.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonPrimary to="/contact">Book Free Consultation</ButtonPrimary>
          <a
            href="https://wa.me/97056 05917"
            className="flex items-center gap-2 px-8 py-4 border border-white/18 text-white font-heading text-sm tracking-widest uppercase hover:border-f3-red hover:text-f3-red transition-all duration-300"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
