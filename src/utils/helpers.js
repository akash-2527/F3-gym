// ─── Class merge utility ──────────────────────────────────────────
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ─── Format numbers ───────────────────────────────────────────────
export function formatNumber(n) {
  return new Intl.NumberFormat('en-IN').format(n)
}

// ─── Debounce ─────────────────────────────────────────────────────
export function debounce(fn, delay = 200) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ─── Throttle ────────────────────────────────────────────────────
export function throttle(fn, limit = 60) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= limit) {
      last = now
      fn(...args)
    }
  }
}

// ─── Map range ────────────────────────────────────────────────────
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

// ─── Clamp ────────────────────────────────────────────────────────
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// ─── Wait ─────────────────────────────────────────────────────────
export const wait = (ms) => new Promise(r => setTimeout(r, ms))

// ─── localStorage safe helpers ────────────────────────────────────
export const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key) } catch {}
  },
}
