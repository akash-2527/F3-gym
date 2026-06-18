import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(el) {
    this.callback([{ isIntersecting: true, target: el }])
  }
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = MockIntersectionObserver

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn().mockReturnValue({ kill: vi.fn() }),
    from: vi.fn().mockReturnValue({ kill: vi.fn() }),
    fromTo: vi.fn().mockReturnValue({ kill: vi.fn() }),
    set: vi.fn(),
    timeline: vi.fn().mockReturnValue({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn() }),
    batch: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
  },
}))

// Mock Lenis
vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    destroy: vi.fn(),
    raf: vi.fn(),
  })),
}))

// Mock split-type
vi.mock('split-type', () => ({
  default: vi.fn().mockImplementation(() => ({
    chars: [],
    words: [],
    lines: [],
    revert: vi.fn(),
  })),
}))

// Mock video element
window.HTMLVideoElement.prototype.play = vi.fn().mockResolvedValue(undefined)
window.HTMLVideoElement.prototype.pause = vi.fn()
window.HTMLVideoElement.prototype.load = vi.fn()

// localStorage mock
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Console error suppression for known React warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (args[0]?.includes?.('Warning:')) return
    originalError(...args)
  }
})
afterAll(() => {
  console.error = originalError
})
