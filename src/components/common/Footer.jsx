import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const colLinks = {
  Pages: [
    { label: 'Home',     path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery',  path: '/gallery' },
    { label: 'Contact',  path: '/contact' },
  ],
  Services: [
    { label: 'Strength Training',  path: '/services' },
    { label: 'Personal Training',  path: '/services' },
    { label: 'Weight Loss',        path: '/services' },
    { label: 'HIIT Classes',       path: '/services' },
    { label: 'Group Sessions',     path: '/services' },
    { label: 'Functional Fitness', path: '/services' },
  ],
}

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.ft-item').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.04, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true } }
        )
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-f3-darker border-t border-white/5 overflow-hidden">
      {/* Diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 10px,#C1121F 10px,#C1121F 11px)'
      }} />
      {/* BG watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: '22vw', color: 'rgba(255,255,255,0.016)' }}
      >F3</div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 py-20">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="ft-item lg:col-span-1" style={{ opacity: 1 }}>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/assets/f3-logo.jpg" alt="F3" className="w-11 h-11 object-cover rounded-sm" />
              <div>
                <span className="font-display text-2xl text-white tracking-widest block leading-none">F3</span>
                <span className="font-heading text-[8px] text-white/30 tracking-[0.3em] uppercase">Fight For Fitness</span>
              </div>
            </Link>
            <p className="font-body text-sm text-white/38 leading-relaxed mb-7 max-w-xs">
              Where warriors are forged. Elite training for those who refuse to settle for anything less than extraordinary.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube,   href: '#', label: 'YouTube' },
                { Icon: Facebook,  href: '#', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-white/8 flex items-center justify-center text-white/35 hover:border-f3-red hover:text-f3-red transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(colLinks).map(([title, links]) => (
            <div key={title} className="ft-item" style={{ opacity: 1 }}>
              <h3 className="section-label mb-5">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path}
                      className="font-heading text-sm text-white/38 hover:text-white transition-colors duration-300 tracking-wide flex items-center gap-2 group">
                      <span className="w-0 h-px bg-f3-red transition-all duration-300 group-hover:w-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="ft-item" style={{ opacity: 1 }}>
            <h3 className="section-label mb-5">Contact</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-f3-red mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/38 leading-relaxed">
                  123 Fighter's Lane,<br />Hyderabad, TS 500034
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-f3-red shrink-0" />
                <a href="tel:+919876543210" className="font-body text-sm text-white/38 hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-f3-red shrink-0" />
                <a href="mailto:train@f3fitness.com" className="font-body text-sm text-white/38 hover:text-white transition-colors">train@f3fitness.com</a>
              </li>
            </ul>

            <div className="p-4 border border-white/5 bg-white/[0.02]">
              <p className="section-label text-[9px] mb-2">Hours</p>
              {[
                { d: 'Mon – Fri', h: '5 AM – 11 PM' },
                { d: 'Sat – Sun', h: '6 AM – 10 PM' },
              ].map(({ d, h }) => (
                <div key={d} className="flex justify-between">
                  <span className="font-body text-[11px] text-white/30">{d}</span>
                  <span className="font-body text-[11px] text-white/60">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="ft-item border border-f3-red/18 bg-f3-red/4 p-8 md:p-12 mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ opacity: 1 }}>
          <div>
            <p className="section-label mb-2">Ready to Transform?</p>
            <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide">
              START YOUR <span className="text-f3-red">JOURNEY TODAY</span>
            </h2>
          </div>
          <Link to="/contact"
            className="shrink-0 flex items-center gap-2 px-8 py-4 bg-f3-red text-white font-heading text-sm font-600 tracking-widest uppercase hover:bg-f3-red-accent transition-colors duration-300 group">
            Join F3 Now
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="ft-item flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5"
          style={{ opacity: 1 }}>
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} Fight For Fitness (F3). All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="font-body text-xs text-white/25 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-white/25 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
