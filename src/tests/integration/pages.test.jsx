import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Home     from '../../pages/Home'
import About    from '../../pages/About'
import Services from '../../pages/Services'
import Gallery  from '../../pages/Gallery'
import Contact  from '../../pages/Contact'

vi.mock('framer-motion', () => ({
  motion: {
    div:     ({ children, ...p }) => <div {...p}>{children}</div>,
    button:  ({ children, ...p }) => <button {...p}>{children}</button>,
    h1:      ({ children, ...p }) => <h1 {...p}>{children}</h1>,
    h2:      ({ children, ...p }) => <h2 {...p}>{children}</h2>,
    p:       ({ children, ...p }) => <p {...p}>{children}</p>,
    section: ({ children, ...p }) => <section {...p}>{children}</section>,
    span:    ({ children, ...p }) => <span {...p}>{children}</span>,
    li:      ({ children, ...p }) => <li {...p}>{children}</li>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => true,
}))

const Wrap = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

/* ─── Home ─────────────────────────────────────────────────────── */
describe('Home Page', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Home /></Wrap>)).not.toThrow()
  })
  it('renders main element', () => {
    render(<Wrap><Home /></Wrap>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
  it('renders Start Training CTA link', () => {
    render(<Wrap><Home /></Wrap>)
    expect(screen.getByRole('link', { name: /start training/i })).toBeInTheDocument()
  })
  it('renders Active Warriors stat label', () => {
    render(<Wrap><Home /></Wrap>)
    expect(screen.getAllByText(/Active Warriors/i).length).toBeGreaterThan(0)
  })
  it('renders proving ground copy', () => {
    render(<Wrap><Home /></Wrap>)
    expect(screen.getAllByText(/not a gym/i).length).toBeGreaterThan(0)
  })
  it('renders Explore Programs link', () => {
    render(<Wrap><Home /></Wrap>)
    expect(screen.getByRole('link', { name: /explore programs/i })).toBeInTheDocument()
  })
})

/* ─── About ────────────────────────────────────────────────────── */
describe('About Page', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><About /></Wrap>)).not.toThrow()
  })
  it('renders h1 heading', () => {
    render(<Wrap><About /></Wrap>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
  it('renders all timeline years', () => {
    render(<Wrap><About /></Wrap>)
    expect(screen.getAllByText('2018').length).toBeGreaterThan(0)
    expect(screen.getAllByText('2024').length).toBeGreaterThan(0)
  })
  it('renders core values', () => {
    render(<Wrap><About /></Wrap>)
    expect(screen.getByText('Excellence')).toBeInTheDocument()
    expect(screen.getByText('Intensity')).toBeInTheDocument()
    expect(screen.getByText('Brotherhood')).toBeInTheDocument()
    expect(screen.getByText('Consistency')).toBeInTheDocument()
  })
  it('renders founder name', () => {
    render(<Wrap><About /></Wrap>)
    expect(screen.getByText('ADITYA RAO')).toBeInTheDocument()
  })
  it('renders Join CTA', () => {
    render(<Wrap><About /></Wrap>)
    expect(screen.getByRole('link', { name: /join the f3 family/i })).toBeInTheDocument()
  })
})

/* ─── Services ─────────────────────────────────────────────────── */
describe('Services Page', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Services /></Wrap>)).not.toThrow()
  })
  it('renders Strength Training service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Strength Training')).toBeInTheDocument()
  })
  it('renders Personal Training service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Personal Training')).toBeInTheDocument()
  })
  it('renders Weight Loss service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Weight Loss')).toBeInTheDocument()
  })
  it('renders HIIT service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('HIIT')).toBeInTheDocument()
  })
  it('renders Group Classes service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Group Classes')).toBeInTheDocument()
  })
  it('renders Functional Fitness service', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Functional Fitness')).toBeInTheDocument()
  })
  it('shows pricing in card header', () => {
    render(<Wrap><Services /></Wrap>)
    const prices = screen.getAllByText(/₹[\d,]+\/mo/)
    expect(prices.length).toBeGreaterThan(0)
  })
  it('accordion expands on click revealing features', async () => {
    render(<Wrap><Services /></Wrap>)
    fireEvent.click(screen.getAllByRole('button')[0])
    await waitFor(() => {
      expect(screen.getByText(/Personalised program design/i)).toBeInTheDocument()
    })
  })
  it('renders taglines', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText('Build Unbreakable Power')).toBeInTheDocument()
  })
  it('renders free assessment CTA', () => {
    render(<Wrap><Services /></Wrap>)
    expect(screen.getByText(/free assessment/i)).toBeInTheDocument()
  })
})

/* ─── Gallery ──────────────────────────────────────────────────── */
describe('Gallery Page', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Gallery /></Wrap>)).not.toThrow()
  })
  it('renders h1', () => {
    render(<Wrap><Gallery /></Wrap>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
  it('renders All filter button', () => {
    render(<Wrap><Gallery /></Wrap>)
    const allBtns = screen.getAllByRole('button').filter(b => b.textContent?.trim() === 'All')
    expect(allBtns.length).toBeGreaterThan(0)
  })
  it('renders Strength category filter', () => {
    render(<Wrap><Gallery /></Wrap>)
    const btns = screen.getAllByRole('button').filter(b => b.textContent?.trim() === 'Strength')
    expect(btns.length).toBeGreaterThan(0)
  })
  it('renders gallery item titles in marquee', () => {
    render(<Wrap><Gallery /></Wrap>)
    expect(screen.getAllByText(/IRON MIND/i).length).toBeGreaterThan(0)
  })
  it('renders collection heading', () => {
    render(<Wrap><Gallery /></Wrap>)
    expect(screen.getByText(/every story/i)).toBeInTheDocument()
  })
  it('filters items when category selected', async () => {
    render(<Wrap><Gallery /></Wrap>)
    const strengthBtn = screen.getAllByRole('button').find(b => b.textContent?.trim() === 'Strength')
    if (strengthBtn) {
      fireEvent.click(strengthBtn)
      await waitFor(() => {
        expect(screen.getByText(/Showing/i)).toBeInTheDocument()
      })
    }
  })
})

/* ─── Contact ──────────────────────────────────────────────────── */
describe('Contact Page', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Contact /></Wrap>)).not.toThrow()
  })
  it('renders name and email inputs', () => {
    render(<Wrap><Contact /></Wrap>)
    expect(screen.getByPlaceholderText(/your full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your@email/i)).toBeInTheDocument()
  })
  it('shows name validation error on empty submit', async () => {
    const user = userEvent.setup()
    render(<Wrap><Contact /></Wrap>)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
    })
  })
  it('shows email validation error', async () => {
    const user = userEvent.setup()
    render(<Wrap><Contact /></Wrap>)
    await user.type(screen.getByPlaceholderText(/your@email/i), 'notanemail')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })
  it('renders phone number', () => {
    render(<Wrap><Contact /></Wrap>)
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument()
  })
  it('renders program dropdown options', () => {
    render(<Wrap><Contact /></Wrap>)
    expect(screen.getByRole('option', { name: 'Strength Training' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Personal Training' })).toBeInTheDocument()
  })
  it('renders WhatsApp CTA', () => {
    render(<Wrap><Contact /></Wrap>)
    expect(screen.getByText('WhatsApp Us Now')).toBeInTheDocument()
  })
  it('renders business hours', () => {
    render(<Wrap><Contact /></Wrap>)
    expect(screen.getByText('Training Hours')).toBeInTheDocument()
  })
  it('shows success on valid submission', async () => {
    const user = userEvent.setup()
    render(<Wrap><Contact /></Wrap>)
    await user.type(screen.getByPlaceholderText(/your full name/i), 'Arjun Mehta')
    await user.type(screen.getByPlaceholderText(/your@email/i), 'arjun@test.com')
    await user.selectOptions(screen.getByRole('combobox'), 'Personal Training')
    await user.type(screen.getByPlaceholderText(/tell us about/i), 'I want to build strength and improve fitness performance')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    }, { timeout: 5000 })
  })
})
