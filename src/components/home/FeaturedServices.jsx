import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Dumbbell, Zap, Users, Target, TrendingUp, Flame, ArrowUpRight } from 'lucide-react'
import AnimatedText from '../ui/AnimatedText'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Dumbbell,
    title: 'Strength Training',
    short: 'Progressive overload programming to build raw, transferable power from the ground up.',
    href: '/services',
  },
  {
    icon: Target,
    title: 'Personal Training',
    short: 'One-on-one sessions laser-focused on your specific goals and exact timeline.',
    href: '/services',
  },
  {
    icon: TrendingUp,
    title: 'Weight Loss',
    short: 'Systematic body recomposition through nutrition and training working in perfect synergy.',
    href: '/services',
  },
  {
    icon: Zap,
    title: 'HIIT',
    short: 'High-intensity intervals that incinerate fat while preserving hard-earned muscle.',
    href: '/services',
  },
  {
    icon: Flame,
    title: 'Functional Fitness',
    short: 'Train movement patterns that translate into real-world athletic performance.',
    href: '/services',
  },
  {
    icon: Users,
    title: 'Group Classes',
    short: 'Energy-fuelled sessions where the community drives you past your limits every time.',
    href: '/services',
  },
]

export default function FeaturedServices() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animate
      gsap.from('.svc-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.svc-header',
          start: 'top 88%',
          once: true,
        },
      })

      // Each service item — animate individually for reliability
      const items = document.querySelectorAll('.svc-item')
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Section watermark */}
      <div
        aria-hidden="true"
        className="absolute -left-4 top-0 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: '28vw', color: 'rgba(255,255,255,0.03)' }}
      >
        02
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* ── Sticky left header ── */}
          <div className="svc-header lg:col-span-2 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Services</span>
            </div>

            <AnimatedText
              as="h2"
              className="font-display text-white mb-7"
              style={{ fontSize: 'clamp(38px, 5vw, 78px)', lineHeight: 0.94 }}
            >
              TRAIN WITH<br />
              <span className="text-f3-red">PURPOSE.</span>
            </AnimatedText>

            <p className="font-body text-sm text-white/45 leading-relaxed mb-10 max-w-xs">
              Every program at F3 is engineered to produce measurable, visible results — designed by
              experts, executed with discipline.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 font-heading text-sm text-f3-red hover:text-f3-red-accent tracking-widest uppercase transition-colors group"
            >
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
              All Services
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ── Service list ── */}
          <div className="lg:col-span-3">
            {services.map(({ icon: Icon, title, short, href }, i) => (
              <Link
                key={title}
                to={href}
                className="svc-item group flex items-start gap-5 py-7 border-b border-white/5 hover:border-f3-red/20 transition-all duration-300 relative"
                style={{ opacity: 1 }} // ensure visible by default; GSAP animates from 0
              >
                {/* Index number */}
                <span className="font-display text-lg text-white/8 group-hover:text-f3-red/25 transition-colors duration-300 min-w-[2.2rem] pt-1 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 border border-white/8 group-hover:border-f3-red/40 flex items-center justify-center shrink-0 mt-1 transition-colors duration-300">
                  <Icon size={17} className="text-white/35 group-hover:text-f3-red transition-colors duration-300" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl text-white font-600 tracking-wide mb-1.5 group-hover:text-f3-red transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-white/38 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                    {short}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={17}
                  className="text-white/15 group-hover:text-f3-red transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1"
                />

                {/* Left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-f3-red scale-y-0 group-hover:scale-y-100 transition-transform duration-350 origin-top rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
