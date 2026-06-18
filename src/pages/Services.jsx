import React, { useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Dumbbell, Zap, Users, Target, TrendingUp, Flame, ChevronDown, Check } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'
import { ButtonPrimary } from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMG = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80'

const services = [
  {
    id: 'strength', icon: Dumbbell,
    title: 'Strength Training', tagline: 'Build Unbreakable Power',
    desc: 'Our strength program uses progressive overload, periodisation, and functional movement patterns to build raw, transferable power. Beginner or advanced — our programming adapts.',
    features: ['Personalised program design','Monthly strength assessments','Olympic lifting coaching','Powerlifting techniques','Mobility & recovery protocols','Nutrition guidance'],
    duration: '60 min', frequency: '3–5× / week', level: 'All levels', price: '₹3,500/mo',
  },
  {
    id: 'personal', icon: Target,
    title: 'Personal Training', tagline: 'Laser-Focused Results',
    desc: 'Complete one-on-one attention from an elite coach dedicated entirely to you. Every session is tailored to your body, goals, schedule, and recovery — no templates, no shortcuts.',
    features: ['Comprehensive initial assessment','Fully custom programming','Real-time form correction','Weekly progress check-ins','Nutrition planning','24/7 coach availability'],
    duration: '60–90 min', frequency: 'Your schedule', level: 'All levels', price: '₹12,000/mo',
  },
  {
    id: 'weightloss', icon: TrendingUp,
    title: 'Weight Loss', tagline: 'Systematic Body Transformation',
    desc: 'Science-based body composition transformation through nutrition and training working in perfect synergy. We measure, track, and adjust every variable until results are undeniable.',
    features: ['Body composition analysis','Caloric & macro coaching','Metabolic conditioning','Weekly measurements','Progress photo tracking','Lifestyle coaching'],
    duration: '60 min', frequency: '4–5× / week', level: 'All levels', price: '₹4,000/mo',
  },
  {
    id: 'functional', icon: Flame,
    title: 'Functional Fitness', tagline: 'Move Better. Perform Better.',
    desc: 'Train movement patterns, not just muscles. Builds athleticism, coordination, and real-world strength that makes everything in life easier and more powerful.',
    features: ['Movement pattern assessment','Mobility & flexibility work','Athletic conditioning','Injury prevention protocols','Core strength & stability','Sport-specific training'],
    duration: '60 min', frequency: '3× / week', level: 'All levels', price: '₹3,000/mo',
  },
  {
    id: 'hiit', icon: Zap,
    title: 'HIIT', tagline: 'Maximum Burn. Minimum Time.',
    desc: 'Science-backed high-intensity intervals that torch body fat, preserve muscle, and spike your metabolism for 24+ hours post-training. The most efficient protocol for body composition change.',
    features: ['Heart rate zone training','Metabolic conditioning circuits','Tabata & interval protocols','Body composition tracking','Progressive intensity scaling','Recovery nutrition guidance'],
    duration: '45 min', frequency: '4–5× / week', level: 'Intermediate – Advanced', price: '₹2,500/mo',
  },
  {
    id: 'group', icon: Users,
    title: 'Group Classes', tagline: 'Stronger Together',
    desc: 'High-energy group sessions that combine the motivation of community with the structure of a professional program. Multiple formats from beginner-friendly to elite performance.',
    features: ['Max 12 members per class','Multiple daily time slots','Beginner & advanced tracks','Community challenges','Monthly contests','Social events & workshops'],
    duration: '50 min', frequency: 'Unlimited', level: 'All levels', price: '₹2,000/mo',
  },
]

function ServiceCard({ service }) {
  const [open, setOpen] = useState(false)
  const { icon: Icon, title, tagline, desc, features, duration, frequency, level, price } = service

  return (
    <div className={`group relative border border-white/5 hover:border-f3-red/18 transition-all duration-400 ${open ? 'border-f3-red/18' : ''}`}>
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-f3-red transition-transform duration-500 origin-left ${open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

      <button onClick={() => setOpen(p => !p)}
        className="w-full flex items-center gap-5 p-7 text-left focus:outline-none">
        <div className="w-11 h-11 border border-f3-red/18 flex items-center justify-center shrink-0 group-hover:border-f3-red/50 transition-colors duration-300">
          <Icon size={19} className="text-f3-red" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-xl md:text-2xl text-white font-600 tracking-wide">{title}</h3>
          <p className="font-body text-xs text-white/38 mt-0.5">{tagline}</p>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <span className="hidden md:block font-display text-xl text-f3-red">{price}</span>
          <ChevronDown size={18} className={`text-white/35 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-7 pb-9 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-7">
            <div>
              <p className="font-body text-sm text-white/55 leading-relaxed mb-6">{desc}</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ label: 'Duration', val: duration }, { label: 'Frequency', val: frequency }, { label: 'Level', val: level }].map(({ label, val }) => (
                  <div key={label} className="bg-white/[0.03] p-3">
                    <p className="section-label text-[9px] mb-1">{label}</p>
                    <p className="font-heading text-xs text-white">{val}</p>
                  </div>
                ))}
              </div>
              <div className="md:hidden">
                <p className="font-display text-3xl text-f3-red mb-0.5">{price}</p>
                <p className="font-heading text-[9px] text-white/35 tracking-widest uppercase">Per Month</p>
              </div>
            </div>
            <div>
              <p className="section-label mb-3.5">What's Included</p>
              <ul className="space-y-2 mb-7">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <Check size={13} className="text-f3-red shrink-0" />
                    <span className="font-body text-sm text-white/65">{f}</span>
                  </li>
                ))}
              </ul>
              <ButtonPrimary to="/contact">Enroll Now</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.svc-card-wrap').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>Services – F3 Fight For Fitness</title>
        <meta name="description" content="Elite training programs at F3: Strength, Personal Training, Weight Loss, HIIT, Functional Fitness, Group Classes." />
      </Helmet>

      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-black">
          <div className="absolute inset-0 scale-105">
            <img src={HERO_IMG} alt="F3 Training" className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 font-display select-none pointer-events-none leading-none"
            style={{ fontSize: '23vw', color: 'rgba(255,255,255,0.04)' }}
          >
            TRAIN
          </div>
          <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-40">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Programs</span>
            </div>
            <AnimatedText as="h1" className="font-display text-white"
              style={{ fontSize: 'clamp(54px, 9vw, 138px)', lineHeight: 0.88 }}>
              ELITE PROGRAMS.<br />
              <span className="text-f3-red">REAL RESULTS.</span>
            </AnimatedText>
          </div>
        </section>

        {/* Services */}
        <section className="relative bg-f3-darker py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <p className="font-body text-sm text-white/45 max-w-2xl mb-14">
              Every program is engineered for measurable results through science-based methodology and elite coaching.
              Click any program to explore full details and pricing.
            </p>

            <div className="border-t border-white/5 space-y-0">
              {services.map((svc, i) => (
                <div key={svc.id} className="svc-card-wrap" style={{ opacity: 1 }}>
                  <ServiceCard service={svc} />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 p-10 md:p-14 border border-white/5 text-center">
              <p className="section-label mb-3.5">Not sure where to start?</p>
              <AnimatedText as="h2" className="font-display text-white mb-5"
                style={{ fontSize: 'clamp(30px, 4vw, 62px)', lineHeight: 0.94 }}>
                GET A <span className="text-f3-red">FREE ASSESSMENT</span>
              </AnimatedText>
              <p className="font-body text-sm text-white/45 max-w-md mx-auto mb-7">
                Book a complimentary consultation and get a personalised program recommendation.
              </p>
              <ButtonPrimary to="/contact">Book Free Consultation</ButtonPrimary>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
