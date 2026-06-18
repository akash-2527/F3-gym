import React, { useRef, useEffect, useState, useCallback, memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'

gsap.registerPlugin(ScrollTrigger)

// ─── Unsplash images (fitness / gym themed) ───────────────────────
const IMGS = {
  gym1:      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  gym2:      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
  strength1: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
  strength2: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  strength3: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  hiit1:     'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  hiit2:     'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
  group1:    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
  group2:    'https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&w=1200&q=80',
  trainer1:  'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1200&q=80',
  trainer2:  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  equip1:    'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1200&q=80',
  equip2:    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  transform1:'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80',
  transform2:'https://images.unsplash.com/photo-1609899517723-0e0cf6f0d6da?auto=format&fit=crop&w=1200&q=80',
  darkgym:   'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1920&q=80',
}

// ─── Gallery data ─────────────────────────────────────────────────
const items = [
  { id:1,  category:'Strength',        title:'Iron Mind',       caption:'The deadlift — king of all lifts',       img: IMGS.strength2, aspect:'tall'   },
  { id:2,  category:'Equipment',       title:'Power Zone',      caption:'Premium squat rack setup',               img: IMGS.gym2,      aspect:'wide'   },
  { id:3,  category:'Transformations', title:'90-Day Warrior',  caption:'Body composition before & after',        img: IMGS.transform1,aspect:'square' },
  { id:4,  category:'Community',       title:'Rise Together',   caption:'Saturday morning crew session',          img: IMGS.group1,    aspect:'wide'   },
  { id:5,  category:'Equipment',       title:'The Arsenal',     caption:'Competition-grade equipment',            img: IMGS.equip1,    aspect:'square' },
  { id:6,  category:'Strength',        title:'Atlas Protocol',  caption:'Olympic lifting in action',              img: IMGS.strength1, aspect:'tall'   },
  { id:7,  category:'Training',        title:'Strike Force',    caption:'Personal training session',              img: IMGS.trainer2,  aspect:'square' },
  { id:8,  category:'Transformations', title:'6-Month Journey', caption:'15kg lost — real transformation',        img: IMGS.transform2,aspect:'wide'   },
  { id:9,  category:'Community',       title:'Fight Night',     caption:'Monthly showcase event',                 img: IMGS.group2,    aspect:'tall'   },
  { id:10, category:'Equipment',       title:'Battle Station',  caption:'Full conditioning toolkit',              img: IMGS.equip2,    aspect:'square' },
  { id:11, category:'Strength',        title:'Barbell Kings',   caption:'Squat rack mastery session',             img: IMGS.strength3, aspect:'wide'   },
  { id:12, category:'Training',        title:'HIIT Warrior',    caption:'High intensity conditioning',            img: IMGS.hiit1,     aspect:'square' },
  { id:13, category:'Transformations', title:'Total Rebuild',   caption:'8-month complete body transformation',   img: IMGS.hiit2,     aspect:'tall'   },
  { id:14, category:'Community',       title:'The F3 Tribe',    caption:'500 warriors strong and growing',        img: IMGS.gym1,      aspect:'wide'   },
  { id:15, category:'Training',        title:'Coach & Athlete', caption:'1-on-1 personal training',              img: IMGS.trainer1,  aspect:'square' },
  { id:16, category:'Equipment',       title:'Forge Floor',     caption:'Main training area panoramic',           img: IMGS.gym2,      aspect:'wide'   },
]

const CATEGORIES = ['All', 'Strength', 'Training', 'Transformations', 'Community', 'Equipment']

// ─── Lightbox ─────────────────────────────────────────────────────
const Lightbox = memo(function Lightbox({ filteredItems, index, onClose, onPrev, onNext }) {
  const item = filteredItems[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/96 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-12 py-5 shrink-0 border-b border-white/5">
          <div>
            <h3 className="font-heading text-lg text-white font-600">{item.title}</h3>
            <p className="font-body text-xs text-white/38 mt-0.5">{item.caption}</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-heading text-xs text-white/25">{index + 1} / {filteredItems.length}</span>
            <button onClick={onClose}
              className="w-9 h-9 border border-white/10 flex items-center justify-center text-white hover:border-f3-red hover:text-f3-red transition-colors"
              aria-label="Close lightbox">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center px-14 md:px-24 min-h-0 relative py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="max-w-5xl w-full max-h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="max-w-full max-h-[65vh] object-contain rounded-sm"
                style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
              />
            </motion.div>
          </AnimatePresence>

          <button onClick={onPrev}
            className="absolute left-2 md:left-4 w-11 h-11 border border-white/10 flex items-center justify-center text-white hover:border-f3-red hover:text-f3-red transition-colors bg-black/60 backdrop-blur-sm"
            aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button onClick={onNext}
            className="absolute right-2 md:right-4 w-11 h-11 border border-white/10 flex items-center justify-center text-white hover:border-f3-red hover:text-f3-red transition-colors bg-black/60 backdrop-blur-sm"
            aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="shrink-0 border-t border-white/5 px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 w-max mx-auto">
            {filteredItems.map((it, i) => (
              <button
                key={it.id}
                onClick={() => {
                  /* navigate to exact index via repeated prev/next */
                  const diff = i - index
                  if (diff > 0) for (let j = 0; j < diff; j++) onNext()
                  else if (diff < 0) for (let j = 0; j < -diff; j++) onPrev()
                }}
                className={`relative w-14 h-14 shrink-0 overflow-hidden transition-all duration-200 ${
                  i === index ? 'ring-2 ring-f3-red' : 'opacity-35 hover:opacity-65'
                }`}
                aria-label={it.title}
              >
                <img src={it.img} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

// ─── Fullscreen clip-path reveal ──────────────────────────────────
function FullscreenReveal({ item, index }) {
  const ref    = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } }
      )
      gsap.fromTo('.reveal-inner-' + item.id,
        { scale: 1.14 },
        { scale: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } }
      )
      gsap.to('.reveal-inner-' + item.id, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      })
    }, ref)
    return () => ctx.revert()
  }, [item.id])

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: '82vh' }}>
      <div ref={imgRef} className="absolute inset-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
        <div className={`reveal-inner-${item.id} absolute inset-[-12%] w-[112%] h-[112%]`}>
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="px-8 md:px-16 max-w-2xl">
          <span className="section-label mb-3 block">{item.category}</span>
          <h2 className="font-display text-white mb-3"
            style={{ fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 0.94 }}>
            {item.title}
          </h2>
          <p className="font-body text-sm text-white/55">{item.caption}</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 font-display select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(60px, 10vw, 130px)', color: 'rgba(255,255,255,0.05)' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

// ─── Horizontal pinned scroll ──────────────────────────────────────
function HorizontalScroll({ slideItems }) {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const getAmount = () => -(track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: getAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.abs(getAmount())}`,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black" style={{ height: '100vh' }}>
      <div className="absolute top-8 left-8 md:left-14 z-10 pointer-events-none">
        <span className="section-label">Horizontal Scroll</span>
        <p className="font-body text-[10px] text-white/25 mt-1 tracking-wider">Scroll down to explore →</p>
      </div>

      <div ref={trackRef}
        className="flex gap-4 h-full items-center px-14 will-change-transform"
        style={{ width: 'max-content' }}>
        {slideItems.map((item) => (
          <div key={item.id}
            className="relative shrink-0 overflow-hidden group"
            style={{
              width:  item.aspect === 'wide' ? '58vw' : item.aspect === 'tall' ? '34vw' : '44vw',
              height: item.aspect === 'tall' ? '78vh' : '62vh',
            }}>
            <img src={item.img} alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="section-label mb-1 block">{item.category}</span>
              <h3 className="font-display text-2xl text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Masonry grid ─────────────────────────────────────────────────
function MasonryGrid({ gridItems, onOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.masonry-cell').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: (i % 9) * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [gridItems])

  // 3-column staggered masonry
  const cols = [[], [], []]
  gridItems.forEach((item, i) => cols[i % 3].push(item))

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {cols.map((col, ci) => (
        <div key={ci} className={`flex flex-col gap-3 md:gap-4 ${ci === 1 ? 'mt-8 md:mt-16' : ''}`}>
          {col.map((item) => (
            <div
              key={item.id}
              className="masonry-cell group relative overflow-hidden cursor-pointer"
              style={{
                aspectRatio: item.aspect === 'tall' ? '3/4' : item.aspect === 'wide' ? '4/3' : '1/1',
                opacity: 1,
              }}
              onClick={() => onOpen(item)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-400" />
              <div className="absolute inset-0 border border-transparent group-hover:border-f3-red/30 transition-colors duration-400" />

              {/* Category badge always visible */}
              <div className="absolute top-3 left-3">
                <span className="section-label text-[9px] bg-black/60 px-2 py-1 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                <ZoomIn size={22} className="text-white mb-2.5" />
                <h4 className="font-heading text-sm text-white font-600 tracking-wide">{item.title}</h4>
                <p className="font-body text-xs text-white/55 mt-0.5 px-4 text-center">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Main Gallery Page ────────────────────────────────────────────
export default function Gallery() {
  const pageRef   = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lbIndex,  setLbIndex]  = useState(null)

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  const openLb  = useCallback((item) => {
    setLbIndex(filtered.findIndex(i => i.id === item.id))
    document.body.style.overflow = 'hidden'
  }, [filtered])

  const closeLb = useCallback(() => {
    setLbIndex(null)
    document.body.style.overflow = ''
  }, [])

  const prevLb = useCallback(() =>
    setLbIndex(i => (i - 1 + filtered.length) % filtered.length),
    [filtered.length])

  const nextLb = useCallback(() =>
    setLbIndex(i => (i + 1) % filtered.length),
    [filtered.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gallery-hero-bg', {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // Slice data for different sections
  const reveals    = items.slice(0, 3)
  const hScroll    = items.slice(3, 10)
  const marqueeSet = items.slice(0, 8)

  return (
    <>
      <Helmet>
        <title>Gallery – F3 Fight For Fitness</title>
        <meta name="description" content="F3 gallery — transformations, training sessions, gym atmosphere, and the community that defines us." />
      </Helmet>

      <div ref={pageRef}>

        {/* ── Hero ──────────────────────────────── */}
        <section className="gallery-hero relative min-h-screen flex items-end overflow-hidden bg-black">
          <div className="gallery-hero-bg absolute inset-0 scale-110 will-change-transform">
            <img src={IMGS.darkgym} alt="" className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(193,18,31,0.14) 0%, transparent 65%)'
            }} />
          </div>

          {/* Background word */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 font-display select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(110px, 22vw, 380px)', color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.02em' }}
          >
            GALLERY
          </div>

          <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-f3-red" />
                  <span className="section-label">Visual Archive</span>
                </div>
                <AnimatedText as="h1" className="font-display text-white"
                  style={{ fontSize: 'clamp(54px, 10vw, 156px)', lineHeight: 0.88 }}>
                  INSIDE<br />
                  THE <span className="text-f3-red">FORGE.</span>
                </AnimatedText>
              </div>
              <div className="lg:flex items-end justify-end hidden">
                <p className="font-body text-sm text-white/45 max-w-xs leading-relaxed text-right">
                  Raw, unfiltered. The sweat, the sacrifice, the transformation. 
                  This is what it looks like to fight for fitness.
                </p>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-4">
              <div className="w-12 h-px bg-f3-red" />
              <span className="font-heading text-[10px] text-white/28 tracking-widest uppercase">
                Scroll to explore {items.length} moments
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>

        {/* ── Fullscreen Reveals ─────────────────── */}
        <section className="bg-black">
          {reveals.map((item, i) => (
            <FullscreenReveal key={item.id} item={item} index={i} />
          ))}
        </section>

        {/* ── Horizontal scroll ─────────────────── */}
        <HorizontalScroll slideItems={hScroll} />

        {/* ── Marquee strip ─────────────────────── */}
        <section className="bg-f3-red py-4 overflow-hidden">
          <div className="marquee-track flex gap-8 items-center">
            {[...marqueeSet, ...marqueeSet].map((item, i) => (
              <span key={`${item.id}-${i}`}
                className="font-display text-black/30 text-2xl tracking-widest whitespace-nowrap shrink-0 select-none">
                {item.title.toUpperCase()} ✦
              </span>
            ))}
          </div>
        </section>

        {/* ── Filtered masonry ──────────────────── */}
        <section className="bg-f3-darker py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
            {/* Header + filters */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-f3-red" />
                  <span className="section-label">The Collection</span>
                </div>
                <AnimatedText as="h2" className="font-display text-white"
                  style={{ fontSize: 'clamp(30px, 4vw, 62px)', lineHeight: 0.94 }}>
                  EVERY STORY<br />
                  <span className="text-f3-red">MATTERS.</span>
                </AnimatedText>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-heading text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-f3-red border-f3-red text-white'
                        : 'border-white/10 text-white/38 hover:border-f3-red/40 hover:text-white/65'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid with filter transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                <MasonryGrid gridItems={filtered} onOpen={openLb} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-end gap-3">
              <span className="font-heading text-[10px] text-white/25 tracking-widest uppercase">
                Showing {filtered.length} of {items.length}
              </span>
            </div>
          </div>
        </section>

        {/* ── Full-bleed community closer ────────── */}
        <section className="relative h-screen overflow-hidden">
          <img src={IMGS.group1} alt="The F3 Community"
            className="absolute inset-0 w-full h-full object-cover scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-f3-red" />
              <span className="section-label">Community</span>
              <div className="w-8 h-px bg-f3-red" />
            </div>
            <h2 className="font-display text-white mb-5"
              style={{ fontSize: 'clamp(46px, 8vw, 136px)', lineHeight: 0.9 }}>
              WE ARE<br /><span className="text-f3-red">F3.</span>
            </h2>
            <p className="font-body text-base text-white/55 max-w-md">
              500+ warriors. One goal. Zero excuses.
            </p>
          </div>
        </section>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lbIndex !== null && (
          <Lightbox key="lb"
            filteredItems={filtered}
            index={lbIndex}
            onClose={closeLb}
            onPrev={prevLb}
            onNext={nextLb}
          />
        )}
      </AnimatePresence>
    </>
  )
}
