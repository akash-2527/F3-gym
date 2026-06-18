import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Zap, Target, Award, Users, TrendingUp } from 'lucide-react'
import AnimatedText from '../ui/AnimatedText'

gsap.registerPlugin(ScrollTrigger)

const TRAINING_IMG = 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80'

const features = [
  { icon: Shield, title: 'Proven Methodology', desc: 'Science-backed protocols used by elite athletes worldwide.' },
  { icon: Zap,    title: 'Maximum Intensity',   desc: 'Every session designed to push you past perceived limits.' },
  { icon: Target, title: 'Precision Coaching',  desc: 'Hyper-personalised programming that adapts to your body.' },
  { icon: Award,  title: 'Elite Standards',     desc: 'Certified coaches with decades of professional experience.' },
  { icon: Users,  title: 'Warrior Community',   desc: 'Train alongside people who refuse to let you settle.' },
  { icon: TrendingUp, title: 'Real Results',    desc: 'Data-driven tracking that keeps results visible every week.' },
]

export function WhyChooseF3() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards — individual triggers for reliability
      document.querySelectorAll('.feat-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 45, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        )
      })

      // Divider line
      gsap.fromTo('.why-divider',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.why-divider', start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-f3-darker py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -right-8 top-0 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: '28vw', color: 'rgba(255,255,255,0.03)' }}
      >
        01
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Why F3</span>
            </div>
            <AnimatedText
              as="h2"
              className="font-display text-white"
              style={{ fontSize: 'clamp(38px, 5vw, 78px)', lineHeight: 0.94 }}
            >
              NOT A GYM.<br />
              <span className="text-f3-red">A PROVING GROUND.</span>
            </AnimatedText>
          </div>
          <div className="flex items-end">
            <p className="font-body text-sm text-white/45 leading-relaxed max-w-md">
              F3 is built on one belief: every person carries extraordinary potential, waiting to be
              unleashed by the right environment, methodology, and coaches who refuse to let you settle.
            </p>
          </div>
        </div>

        <div className="why-divider w-full h-px bg-white/5 mb-14" style={{ transformOrigin: 'left' }} />

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="feat-card group relative bg-f3-darker p-8 md:p-10 hover:bg-black transition-colors duration-400 cursor-default"
              style={{ opacity: 1 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-f3-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="mb-5 w-11 h-11 border border-f3-red/25 flex items-center justify-center group-hover:border-f3-red group-hover:bg-f3-red/10 transition-all duration-300">
                <Icon size={18} className="text-f3-red" />
              </div>
              <h3 className="font-heading text-xl text-white font-600 tracking-wide mb-2.5 group-hover:text-f3-red transition-colors duration-300">
                {title}
              </h3>
              <p className="font-body text-sm text-white/38 leading-relaxed group-hover:text-white/58 transition-colors duration-300">
                {desc}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-5 right-7 font-display text-5xl text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-300 select-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrainingPhilosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to('.phil-img-inner', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.phil-img-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Text lines
      document.querySelectorAll('.phil-line').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 35, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="phil-img-wrap relative h-[480px] md:h-[620px] overflow-hidden">
            <div className="phil-img-inner absolute inset-[-12%] w-[112%] h-[112%]">
              <img
                src={TRAINING_IMG}
                alt="F3 Training in action"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            {/* Stat chip */}
            <div className="absolute bottom-8 left-8 glass p-5">
              <p className="font-display text-4xl text-f3-red">2,000+</p>
              <p className="font-heading text-[10px] text-white/50 tracking-widest uppercase mt-1">
                Lives Transformed
              </p>
            </div>

            {/* Red accent bar */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-f3-red via-f3-red/20 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-7 phil-line">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Philosophy</span>
            </div>

            <AnimatedText
              as="h2"
              className="font-display text-white mb-8 phil-line"
              style={{ fontSize: 'clamp(34px, 4.5vw, 70px)', lineHeight: 0.94 }}
            >
              MIND. MUSCLE.<br />
              <span className="text-f3-red">MISSION.</span>
            </AnimatedText>

            <div className="space-y-6">
              {[
                { title: 'Strength First', desc: 'Every program begins with an unshakeable foundation of raw, functional strength that carries into every dimension of life.' },
                { title: 'Mental Fortitude', desc: 'Physical transformation is secondary to mental. We train the mind alongside the body, building an unbreakable inner warrior.' },
                { title: 'Community & Accountability', desc: 'Your training partners are your greatest asset. We build a culture where everyone rises together — no one is left behind.' },
              ].map(({ title, desc }) => (
                <div key={title} className="phil-line flex gap-4 group" style={{ opacity: 1 }}>
                  <div className="w-0.5 bg-f3-red/25 group-hover:bg-f3-red transition-colors duration-300 shrink-0 rounded-full" />
                  <div>
                    <h3 className="font-heading text-base text-white font-600 tracking-wide mb-1">{title}</h3>
                    <p className="font-body text-sm text-white/38 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
