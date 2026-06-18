import { describe, it, expect, vi } from 'vitest'
import { cn, formatNumber, debounce, throttle, mapRange, clamp, storage } from '../../utils/helpers'

describe('cn (class merge utility)', () => {
  it('merges class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })

  it('deduplicates tailwind classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles undefined and null', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end')
  })
})

describe('formatNumber', () => {
  it('formats numbers with Indian locale', () => {
    const result = formatNumber(1000)
    expect(result).toMatch(/1[,.]?000/)
  })

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('debounce', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced()
    debounced()
    debounced()

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})

describe('throttle', () => {
  it('limits function call frequency', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    throttled()
    throttled()

    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})

describe('mapRange', () => {
  it('maps value from one range to another', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0)
    expect(mapRange(10, 0, 10, 0, 100)).toBe(100)
  })
})

describe('clamp', () => {
  it('clamps value between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('storage', () => {
  it('gets and sets JSON values', () => {
    const mockGetItem = vi.spyOn(window.localStorage, 'getItem').mockReturnValue('"test-value"')
    expect(storage.get('key')).toBe('test-value')
    mockGetItem.mockRestore()
  })

  it('handles malformed JSON gracefully', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue('invalid json{')
    expect(storage.get('bad-key')).toBeNull()
  })
})
