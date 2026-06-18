import React, { useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, CheckCircle, AlertCircle, Send } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'

gsap.registerPlugin(ScrollTrigger)

// ─── Zod Schema ───────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  program: z.string().min(1, 'Please select a program'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms'),
})

const programs = [
  'Strength Training',
  'MMA Conditioning',
  'Personal Training',
  'Functional Fitness',
  'HIIT',
  'Group Classes',
  'Free Consultation',
]

// ─── Form Field ───────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="relative">
      <label className="section-label text-[10px] mb-2 block">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-1.5 mt-1.5 font-body text-xs text-f3-red-accent"
          >
            <AlertCircle size={11} />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = `
  w-full bg-transparent border border-white/10 px-4 py-3
  font-body text-sm text-white placeholder-white/20
  focus:outline-none focus:border-f3-red
  transition-colors duration-300
`

// ─── Contact Form ─────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    setStatus('loading')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    console.log('Form data:', data)
    setStatus('success')
    reset()
    setTimeout(() => setStatus('idle'), 5000)
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 border border-f3-red/20 bg-f3-red/5"
      >
        <CheckCircle size={48} className="text-f3-red mb-6" />
        <h3 className="font-display text-4xl text-white mb-3">MESSAGE SENT!</h3>
        <p className="font-body text-sm text-white/60 max-w-xs">
          We'll get back to you within 24 hours. Your warrior journey is about to begin.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 font-heading text-xs text-f3-red hover:text-f3-red-accent tracking-widest uppercase transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name *" error={errors.name}>
          <input
            {...register('name')}
            placeholder="Your full name"
            className={inputClass}
            style={{ borderColor: errors.name ? 'rgba(255,45,45,0.6)' : undefined }}
          />
        </Field>

        <Field label="Email Address *" error={errors.email}>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className={inputClass}
            style={{ borderColor: errors.email ? 'rgba(255,45,45,0.6)' : undefined }}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone Number" error={errors.phone}>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </Field>

        <Field label="Program of Interest *" error={errors.program}>
          <select
            {...register('program')}
            className={`${inputClass} appearance-none cursor-pointer`}
            style={{ borderColor: errors.program ? 'rgba(255,45,45,0.6)' : undefined }}
          >
            <option value="" className="bg-f3-darker">Select a program</option>
            {programs.map(p => (
              <option key={p} value={p} className="bg-f3-darker">{p}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message *" error={errors.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your goals, current fitness level, and any questions you have..."
          className={`${inputClass} resize-none`}
          style={{ borderColor: errors.message ? 'rgba(255,45,45,0.6)' : undefined }}
        />
      </Field>

      <Field label="" error={errors.terms}>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              {...register('terms')}
              type="checkbox"
              className="sr-only"
            />
            <div className={`w-4 h-4 border ${errors.terms ? 'border-f3-red-accent' : 'border-white/20'} group-hover:border-f3-red transition-colors duration-300 flex items-center justify-center`}>
              <div className="w-2 h-2 bg-f3-red scale-0 group-has-[:checked]:scale-100 transition-transform" />
            </div>
          </div>
          <span className="font-body text-xs text-white/40 leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-f3-red hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-f3-red hover:underline">Privacy Policy</a>
          </span>
        </label>
      </Field>

      <button
        type="submit"
        disabled={isSubmitting || status === 'loading'}
        className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-f3-red text-white font-heading text-sm tracking-widest uppercase overflow-hidden hover:bg-f3-red-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────
export default function Contact() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 75%',
        }
      })

      gsap.from('.contact-form-wrap', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 75%',
        }
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>Contact – F3 Fight For Fitness</title>
        <meta name="description" content="Get in touch with F3 Fight For Fitness. Book a free consultation, ask about programs, or just say hello." />
      </Helmet>

      <div ref={pageRef}>
        {/* ─── Hero ───────────────────────── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-black">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #050000 0%, #0d0000 40%, #000000 100%)',
          }}>
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 60% 60% at 30% 60%, rgba(193,18,31,0.1) 0%, transparent 60%)'
            }} />
          </div>

          <div className="absolute right-0 bottom-0 font-display text-[25vw] text-white/[0.025] select-none pointer-events-none leading-none">
            CONTACT
          </div>

          <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Get In Touch</span>
            </div>
            <AnimatedText
              as="h1"
              className="font-display text-white"
              style={{ fontSize: 'clamp(56px, 9vw, 140px)', lineHeight: 0.88 }}
            >
              START YOUR<br />
              <span className="text-f3-red">JOURNEY.</span>
            </AnimatedText>
          </div>
        </section>

        {/* ─── Main Contact Section ────────── */}
        <section className="relative bg-f3-darker py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="contact-grid grid grid-cols-1 lg:grid-cols-5 gap-16">

              {/* Left info */}
              <div className="contact-info lg:col-span-2 space-y-10">
                <div>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-10">
                    Ready to transform? Drop us a message or reach out directly — 
                    our coaches are standing by to help you start your warrior journey.
                  </p>
                </div>

                {[
                  {
                    icon: Phone,
                    label: 'Phone / WhatsApp',
                    value: '+91 98765 43210',
                    href: 'tel:+919876543210',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'train@f3fitness.com',
                    href: 'mailto:train@f3fitness.com',
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: '123 Fighter\'s Lane, Banjara Hills, Hyderabad, TS 500034',
                    href: 'https://maps.google.com',
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-item flex items-start gap-5 group"
                  >
                    <div className="w-10 h-10 border border-f3-red/20 flex items-center justify-center shrink-0 group-hover:border-f3-red group-hover:bg-f3-red/10 transition-all duration-300 mt-0.5">
                      <Icon size={16} className="text-f3-red" />
                    </div>
                    <div>
                      <p className="section-label text-[10px] mb-1">{label}</p>
                      <p className="font-body text-sm text-white group-hover:text-f3-red transition-colors duration-300">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}

                {/* Hours */}
                <div className="contact-info-item border border-white/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={16} className="text-f3-red" />
                    <span className="section-label">Training Hours</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { days: 'Monday – Friday', hours: '5:00 AM – 11:00 PM' },
                      { days: 'Saturday', hours: '6:00 AM – 10:00 PM' },
                      { days: 'Sunday', hours: '7:00 AM – 9:00 PM' },
                    ].map(({ days, hours }) => (
                      <div key={days} className="flex justify-between items-center">
                        <span className="font-body text-xs text-white/40">{days}</span>
                        <span className="font-body text-xs text-white">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="contact-info-item">
                  <p className="section-label mb-4">Follow the Journey</p>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, label: 'Instagram', href: '#' },
                      { icon: Youtube, label: 'YouTube', href: '#' },
                      { icon: Facebook, label: 'Facebook', href: '#' },
                    ].map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-f3-red hover:text-f3-red transition-all duration-300"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20F3!%20I%20want%20to%20start%20my%20fitness%20journey."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item flex items-center gap-3 px-6 py-4 border border-green-500/30 bg-green-500/5 hover:border-green-500/60 hover:bg-green-500/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-green-500/20 flex items-center justify-center rounded-full">
                    <Phone size={14} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-white group-hover:text-green-400 transition-colors">
                      WhatsApp Us Now
                    </p>
                    <p className="font-body text-xs text-white/30">Quick response guaranteed</p>
                  </div>
                </a>
              </div>

              {/* Right form */}
              <div className="contact-form-wrap lg:col-span-3">
                <div className="border border-white/5 bg-black/40 p-8 md:p-12">
                  <div className="mb-10">
                    <p className="section-label mb-2">Send a Message</p>
                    <h2
                      className="font-display text-white"
                      style={{ fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 1 }}
                    >
                      LET'S TALK
                      <span className="text-f3-red"> GOALS.</span>
                    </h2>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Map placeholder ─────────────── */}
        <section className="relative h-80 md:h-[500px] bg-f3-gray overflow-hidden">
          <div className="w-full h-full flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #0d0000 0%, #050505 100%)',
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}>
            <div className="text-center">
              <MapPin size={40} className="text-f3-red mx-auto mb-4" />
              <h3 className="font-heading text-xl text-white mb-1">Find Us</h3>
              <p className="font-body text-sm text-white/40">123 Fighter's Lane, Banjara Hills, Hyderabad</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 font-heading text-xs text-f3-red hover:text-f3-red-accent tracking-widest uppercase transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Red ping */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 bg-f3-red rounded-full" style={{ animation: 'pulseRed 2s ease-in-out infinite' }} />
            <div className="absolute w-16 h-16 border border-f3-red/30 rounded-full" style={{ animation: 'pulseRed 2s ease-in-out infinite 0.3s' }} />
            <div className="absolute w-32 h-32 border border-f3-red/10 rounded-full" style={{ animation: 'pulseRed 2s ease-in-out infinite 0.6s' }} />
          </div>
        </section>
      </div>
    </>
  )
}
