import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  },
}

// Curtain transition overlay
const curtainVariants = {
  initial: { scaleY: 0, originY: 0 },
  animate: {
    scaleY: [0, 1, 1, 0],
    originY: ['0%', '0%', '100%', '100%'],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 0.6, 1],
      ease: 'easeInOut',
    }
  }
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
