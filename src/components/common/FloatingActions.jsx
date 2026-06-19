import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// ─── WhatsApp SVG icon (lucide doesn't include it) ─────────────────
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const WA_NUMBER = '+919705605917'
const WA_MSG    = encodeURIComponent('Hi F3! I want to start my fitness journey.')
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

export default function FloatingActions() {
  const [showTop,    setShowTop]    = useState(false)
  const [waExpanded, setWaExpanded] = useState(false)

  // Show scroll-to-top after scrolling 400px
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    /* Stack both in bottom-right corner, column direction, gap between */
    <div
      className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[90] flex flex-col items-end gap-3"
      aria-label="Floating actions"
    >

      {/* ── WhatsApp floating badge ─────────────────────────────────── */}
      <div className="flex items-center gap-0">

        {/* Expandable label — slides in from right on hover/focus */}
        <AnimatePresence>
          {waExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 12, width: 0 }}
              animate={{ opacity: 1, x: 0,  width: 'auto' }}
              exit={{   opacity: 0, x: 12, width: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden mr-2"
            >
              <div
                className="flex flex-col items-end px-4 py-2.5 rounded-sm whitespace-nowrap"
                style={{
                  background: 'rgba(0,0,0,0.88)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="font-heading text-[10px] text-white/50 tracking-widest uppercase leading-none mb-0.5">
                  Chat with us
                </span>
                <span className="font-heading text-sm text-white font-600 tracking-wide leading-none">
                  WhatsApp
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp button */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setWaExpanded(true)}
          onMouseLeave={() => setWaExpanded(false)}
          onFocus={()    => setWaExpanded(true)}
          onBlur={()     => setWaExpanded(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-sm text-white transition-all duration-300 group"
          style={{
            background: '#25D366',
            boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
          }}
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-sm"
            style={{
              animation: 'waPulse 2.4s ease-out infinite',
              background: 'rgba(37,211,102,0.45)',
            }}
          />
          {/* Second ring (delayed) */}
          <span
            className="absolute inset-0 rounded-sm"
            style={{
              animation: 'waPulse 2.4s ease-out infinite 0.8s',
              background: 'rgba(37,211,102,0.25)',
            }}
          />

          <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            <WhatsAppIcon size={24} />
          </span>

          {/* F3 brand red accent strip at bottom */}
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-sm"
            style={{ background: 'rgba(193,18,31,0.6)' }}
          />
        </a>
      </div>

      {/* ── Scroll to top button ────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 16, scale: 0.85  }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="relative flex items-center justify-center w-14 h-14 group overflow-hidden"
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(193,18,31,0.4)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {/* Red fill on hover */}
            <span
              className="absolute inset-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom"
              style={{ background: '#C1121F' }}
            />

            {/* Arrow icon */}
            <ArrowUp
              size={20}
              className="relative z-10 text-f3-red group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 transition-transform"
            />

            {/* Tooltip */}
            <span
              className="absolute right-full mr-3 px-2.5 py-1.5 font-heading text-[9px] tracking-widest uppercase text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                background: 'rgba(0,0,0,0.85)',
                border: '1px solid rgba(193,18,31,0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Back to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}