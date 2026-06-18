import React, { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppRouter from './routes/AppRouter'
import IntroVideo from './features/intro/IntroVideo'
import Loader from './features/loader/Loader'
import { AppProvider } from './contexts/AppContext'
import { LenisProvider } from './contexts/LenisContext'

// Determine initial phase synchronously — eliminates race condition
function getInitialPhase() {
  try {
    return localStorage.getItem('f3_hasSeenIntro') ? 'loading' : 'intro'
  } catch {
    return 'loading'
  }
}

export default function App() {
  const [phase, setPhase] = useState(() => getInitialPhase())
  // phase: 'intro' | 'loading' | 'ready'

  const completeIntro = useCallback(() => {
    try { localStorage.setItem('f3_hasSeenIntro', 'true') } catch {}
    setPhase('loading')
  }, [])

  const completeLoader = useCallback(() => {
    setPhase('ready')
  }, [])

  return (
    <BrowserRouter>
      <AppProvider>
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <IntroVideo key="intro" onComplete={completeIntro} />
          )}
          {phase === 'loading' && (
            <Loader key="loader" onComplete={completeLoader} />
          )}
        </AnimatePresence>

        {phase === 'ready' && (
          <LenisProvider>
            <AppRouter />
          </LenisProvider>
        )}
      </AppProvider>
    </BrowserRouter>
  )
}
