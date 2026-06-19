import React, { useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Clock, Users, Zap } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'
import { ButtonPrimary } from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const FOUNDER_IMG = 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=800&q=80'
const STORY_IMG   = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80'

const timeline = [
  { year: '2018', title: 'The Beginning',      desc: 'F3 founded by Coach Charan in a 1,200 sq ft garage — nothing but iron, sweat, and a vision to build warriors.' },
  { year: '2019', title: 'First Champions',    desc: 'Three F3 athletes win regional titles. The philosophy is proven: discipline, intensity, community.' },
  { year: '2020', title: 'Expansion',          desc: 'Despite global challenges, F3 doubles in size. Online programs launch, reaching 200+ members worldwide.' },
  { year: '2021', title: 'New Facility',       desc: '6,000 sq ft state-of-the-art training centre opens with dedicated strength and functional zones.' },
  { year: '2023', title: 'Elite Recognition',  desc: 'Named Top Fitness Brand of the Year. Coaching team expands to 15 certified specialists.' },
  { year: '2024', title: 'The F3 Legacy',      desc: '500+ active members, 2,000+ transformations — and still just getting started.' },
]

const values = [
  { icon: Award,  title: 'Excellence',   desc: 'We settle for nothing less than our absolute best in coaching, facilities, and outcomes.' },
  { icon: Zap,    title: 'Intensity',    desc: 'Mediocrity has no home here. Every session is approached with maximum focus and effort.' },
  { icon: Users,  title: 'Brotherhood', desc: 'The warrior code: no member is left behind. We rise together or not at all.' },
  { icon: Clock,  title: 'Consistency', desc: 'Transformation is earned daily. We build habits that create permanent, lasting change.' },
]

export default function About() {
  const pageRef     = useRef(null)
  const timelineRef = useRef(null)
  const lineRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero parallax ──
      gsap.to('.about-hero-bg', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // ── Values cards — per element ──
      document.querySelectorAll('.val-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        )
      })

      // ── Timeline vertical line — animate scaleY from top ──
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 1.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // ── Timeline items — stagger from left/right ──
      document.querySelectorAll('.tl-item').forEach((el, i) => {
        const fromLeft = i % 2 === 0
        gsap.fromTo(el,
          { x: fromLeft ? -40 : 40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      // ── Founder / story sections ──
      document.querySelectorAll('.reveal-up').forEach((el) => {
        gsap.fromTo(el,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>About – F3 Fight For Fitness</title>
        <meta name="description" content="The story of F3 – born from passion, built on iron." />
      </Helmet>

      <div ref={pageRef}>

        {/* ── Hero ─────────────────────────────── */}
        <section className="about-hero relative min-h-[68vh] flex items-end overflow-hidden bg-black">
          <div className="about-hero-bg absolute inset-0 scale-110">
            <img
              src={STORY_IMG}
              alt="F3 Training"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>

          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 font-display select-none pointer-events-none leading-none"
            style={{ fontSize: '33vw', color: 'rgba(255,255,255,0.04)' }}
          >
            F3
          </div>

          <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-40">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Our Story</span>
            </div>
            <AnimatedText as="h1" className="font-display text-white"
              style={{ fontSize: 'clamp(54px, 9vw, 150px)', lineHeight: 0.88 }}>
              BORN IN IRON.<br />
              <span className="text-f3-red">BUILT FOR WAR.</span>
            </AnimatedText>
          </div>
        </section>

        {/* ── Brand Story ───────────────────────── */}
        <section className="relative bg-black py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              <div className="lg:col-span-5 reveal-up" style={{ opacity: 1 }}>
                <div className="relative aspect-[4/5] max-w-sm overflow-hidden">
                  <img
                    src={STORY_IMG}
                    alt="F3 brand story"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-0 left-0 w-14 h-14 border-l-2 border-t-2 border-f3-red" />
                  <div className="absolute bottom-0 right-0 w-14 h-14 border-r-2 border-b-2 border-f3-red" />
                  {/* Stat chip */}
                  <div className="absolute bottom-6 left-6 glass p-4">
                    <p className="font-display text-3xl text-f3-red">2018</p>
                    <p className="font-heading text-[9px] text-white/50 tracking-widest uppercase mt-0.5">Est. Hyderabad</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5 reveal-up" style={{ opacity: 1 }}>
                  <div className="w-8 h-px bg-f3-red" />
                  <span className="section-label">The Mission</span>
                </div>
                <AnimatedText as="h2" className="font-display text-white mb-7"
                  style={{ fontSize: 'clamp(30px, 4vw, 62px)', lineHeight: 0.94 }}>
                  TO FORGE WARRIORS<br />
                  <span className="text-f3-red">FROM CIVILIANS.</span>
                </AnimatedText>
                <div className="space-y-4 font-body text-sm text-white/55 leading-relaxed reveal-up" style={{ opacity: 1 }}>
                  <p>F3 was born in 2018 when Coach Charan noticed something alarming: most gyms were focused on aesthetics over performance, comfort over challenge, and profit over progress.</p>
                  <p>He built F3 on a radical premise — that every person who walks through our doors carries the genetic blueprint of a warrior. A coach's job isn't to motivate. It's to <span className="text-white font-500">excavate the champion already inside.</span></p>
                  <p>Today, F3 is Hyderabad's most intense, most transformative, most respected performance training centre. Still guided by the same principle: forge warriors, one session at a time.</p>
                </div>
                <div className="mt-9 reveal-up" style={{ opacity: 1 }}>
                  <ButtonPrimary to="/contact">Join the F3 Family</ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────── */}
        <section className="relative bg-f3-darker py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-f3-red" />
                <span className="section-label">Core Values</span>
                <div className="w-8 h-px bg-f3-red" />
              </div>
              <AnimatedText as="h2" className="font-display text-white"
                style={{ fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 0.94 }}>
                WHAT WE <span className="text-f3-red">STAND FOR.</span>
              </AnimatedText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title}
                  className="val-card bg-f3-darker group p-10 hover:bg-black transition-colors duration-400 relative"
                  style={{ opacity: 1 }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-f3-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <Icon size={26} className="text-f3-red mb-5" />
                  <h3 className="font-display text-3xl text-white mb-2.5 tracking-wide">{title}</h3>
                  <p className="font-body text-sm text-white/38 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────── */}
        <section className="relative bg-black py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 font-display select-none pointer-events-none leading-none"
            style={{ fontSize: '22vw', color: 'rgba(255,255,255,0.04)' }}
          >
            HISTORY
          </div>

          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="mb-14 reveal-up" style={{ opacity: 1 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-f3-red" />
                <span className="section-label">Journey</span>
              </div>
              <AnimatedText as="h2" className="font-display text-white"
                style={{ fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 0.94 }}>
                THE F3 <span className="text-f3-red">TIMELINE.</span>
              </AnimatedText>
            </div>

            {/* Timeline container */}
            <div ref={timelineRef} className="relative">

              {/* ── Animated vertical line ── */}
              <div
                ref={lineRef}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-f3-red/30"
                style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
              />

              <div className="space-y-0">
                {timeline.map(({ year, title, desc }, i) => (
                  <div
                    key={year}
                    className={`tl-item relative flex py-10 gap-8 md:gap-0 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    style={{ opacity: 1 }}
                  >
                    {/* Content half */}
                    <div
                      className={`pl-12 md:pl-0 md:w-1/2 ${
                        i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                      }`}
                    >
                      <span className="section-label mb-1.5 block">{year}</span>
                      <h3 className="font-heading text-2xl text-white font-600 mb-2">{title}</h3>
                      <p className="font-body text-sm text-white/45 leading-relaxed max-w-sm md:ml-auto">
                        {desc}
                      </p>
                    </div>

                    {/* Dot on the line */}
                    <div
                      className="absolute left-4 md:left-1/2 top-12 w-3 h-3 bg-f3-red rounded-full border-2 border-black"
                      style={{ transform: 'translateX(-50%)' }}
                    />
                    {/* Pulse ring */}
                    <div
                      className="absolute left-4 md:left-1/2 top-12 w-3 h-3 rounded-full border border-f3-red/40"
                      style={{ transform: 'translateX(-50%)', animation: 'pulseRed 2.5s ease-in-out infinite' }}
                    />

                    {/* Empty half */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder ──────────────────────────── */}
        <section className="relative bg-f3-darker py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div className="relative reveal-up" style={{ opacity: 1 }}>
                <div className="aspect-[3/4] max-w-md overflow-hidden">
                  <img
                    src={FOUNDER_IMG}
                    alt="Charan – Founder & Head Coach"
                    className="w-full h-full object-cover grayscale contrast-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Red tint overlay */}
                  <div className="absolute inset-0" style={{ background: 'rgba(193,18,31,0.08)' }} />
                </div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 border-r-2 border-b-2 border-f3-red" />
              </div>

              <div className="reveal-up" style={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-f3-red" />
                  <span className="section-label">Founder & Head Coach</span>
                </div>
                <AnimatedText as="h2" className="font-display text-white mb-1"
                  style={{ fontSize: 'clamp(38px, 5vw, 70px)', lineHeight: 0.94 }}>
                  Charan 
                </AnimatedText>
                <p className="font-heading text-f3-red text-lg tracking-widest uppercase mb-7">
                  Founder & Head Coach
                </p>
                <div className="space-y-4 font-body text-sm text-white/55 leading-relaxed mb-9">
                  <p>With 15+ years of competitive strength, conditioning, and performance science experience, Coach Charan is the vision and the discipline behind F3.</p>
                  <p>A former national-level competitive athlete and certified strength & conditioning specialist, his methodology bridges the world of combat sports and elite strength athletics in a uniquely powerful way.</p>
                  <p className="italic text-white/70">"My job is not to make training easy. My job is to make <span className="text-white not-italic">you</span> extraordinary."</p>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {[
                    { val: '15+', label: 'Years Exp.' },
                    { val: '500+', label: 'Athletes' },
                    { val: '12', label: 'Certifications' },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <p className="font-display text-3xl text-f3-red">{val}</p>
                      <p className="font-heading text-[9px] text-white/35 tracking-widest uppercase mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
