import React, { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import PageTransition from '../components/common/PageTransition'
import FloatingActions from '../components/common/FloatingActions'

const Home     = lazy(() => import('../pages/Home'))
const About    = lazy(() => import('../pages/About'))
const Services = lazy(() => import('../pages/Services'))
const Gallery  = lazy(() => import('../pages/Gallery'))
const Contact  = lazy(() => import('../pages/Contact'))

function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 border-f3-red border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AppRouter() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about"   element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </>
  )
}
