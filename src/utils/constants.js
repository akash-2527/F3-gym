// ─── Brand ───────────────────────────────────────────────────────
export const BRAND = {
  name: 'Fight For Fitness',
  short: 'F3',
  tagline: 'Where Warriors Are Forged',
  year: 2018,
  email: 'train@f3fitness.com',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  address: '123 Fighter\'s Lane, Banjara Hills, Hyderabad, TS 500034',
}

// ─── Colors ──────────────────────────────────────────────────────
export const COLORS = {
  black: '#000000',
  dark: '#0a0a0a',
  red: '#C1121F',
  redAccent: '#FF2D2D',
  white: '#FFFFFF',
}

// ─── Breakpoints ─────────────────────────────────────────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// ─── Nav links ───────────────────────────────────────────────────
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

// ─── Social links ─────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://instagram.com/f3fightforfitness', handle: '@f3fightforfitness' },
  { platform: 'YouTube', url: 'https://youtube.com/f3fightforfitness', handle: 'F3 Fight For Fitness' },
  { platform: 'Facebook', url: 'https://facebook.com/f3fightforfitness', handle: 'F3 Fight For Fitness' },
]

// ─── Hours ────────────────────────────────────────────────────────
export const HOURS = [
  { days: 'Monday – Friday', open: '5:00 AM', close: '11:00 PM' },
  { days: 'Saturday', open: '6:00 AM', close: '10:00 PM' },
  { days: 'Sunday', open: '7:00 AM', close: '9:00 PM' },
]

// ─── localStorage keys ───────────────────────────────────────────
export const STORAGE_KEYS = {
  hasSeenIntro: 'f3_hasSeenIntro',
  theme: 'f3_theme',
}

// ─── Animation durations ─────────────────────────────────────────
export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.6,
}

// ─── Framer Motion page variants ─────────────────────────────────
export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}
