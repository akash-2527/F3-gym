import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const openNav = useCallback(() => setIsNavOpen(true), [])
  const closeNav = useCallback(() => setIsNavOpen(false), [])
  const toggleNav = useCallback(() => setIsNavOpen(prev => !prev), [])

  const setCursorHover = useCallback(() => setCursorVariant('hover'), [])
  const setCursorDefault = useCallback(() => setCursorVariant('default'), [])
  const setCursorText = useCallback(() => setCursorVariant('text'), [])
  const setCursorDrag = useCallback(() => setCursorVariant('drag'), [])

  return (
    <AppContext.Provider value={{
      isNavOpen,
      openNav,
      closeNav,
      toggleNav,
      cursorVariant,
      setCursorHover,
      setCursorDefault,
      setCursorText,
      setCursorDrag,
      isTransitioning,
      setIsTransitioning,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
