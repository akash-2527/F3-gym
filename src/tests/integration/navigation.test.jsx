import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { AppProvider } from '../../contexts/AppContext'

vi.mock('framer-motion', () => ({
  motion: {
    div:    ({ children, ...p }) => <div {...p}>{children}</div>,
    button: ({ children, ...p }) => <button {...p}>{children}</button>,
    span:   ({ children, ...p }) => <span {...p}>{children}</span>,
    li:     ({ children, ...p }) => <li {...p}>{children}</li>,
    ul:     ({ children, ...p }) => <ul {...p}>{children}</ul>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

const Wrap = ({ children, path = '/' }) => (
  <HelmetProvider>
    <MemoryRouter initialEntries={[path]}>
      <AppProvider>
        {children}
      </AppProvider>
    </MemoryRouter>
  </HelmetProvider>
)

/* ─── Navbar ─────────────────────────────────────────────────────── */
describe('Navbar', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Navbar /></Wrap>)).not.toThrow()
  })
  it('renders the F3 logo image', () => {
    render(<Wrap><Navbar /></Wrap>)
    expect(screen.getByAltText(/F3 Fight For Fitness/i)).toBeInTheDocument()
  })
  it('renders all five desktop nav links', () => {
    render(<Wrap><Navbar /></Wrap>)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/gallery')
    expect(hrefs).toContain('/contact')
  })
  it('renders Join Now CTA', () => {
    render(<Wrap><Navbar /></Wrap>)
    expect(screen.getByText('Join Now')).toBeInTheDocument()
  })
  it('renders hamburger menu button', () => {
    render(<Wrap><Navbar /></Wrap>)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })
  it('opens mobile menu on hamburger click', async () => {
    render(<Wrap><Navbar /></Wrap>)
    fireEvent.click(screen.getByLabelText('Toggle menu'))
    await waitFor(() => {
      const homeLinks = screen.getAllByText('Home')
      expect(homeLinks.length).toBeGreaterThan(1)
    })
  })
  it('marks active route with red colour class', () => {
    render(<Wrap path="/about"><Navbar /></Wrap>)
    const aboutLinks = screen.getAllByText('About')
    const active = aboutLinks.find(el => el.closest('a')?.className?.includes('text-f3-red'))
    expect(active).toBeTruthy()
  })
})

/* ─── Footer ─────────────────────────────────────────────────────── */
describe('Footer', () => {
  it('renders without crashing', () => {
    expect(() => render(<Wrap><Footer /></Wrap>)).not.toThrow()
  })
  it('renders footer landmark', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
  it('renders F3 logo', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByAltText('F3')).toBeInTheDocument()
  })
  it('renders navigation column headings', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getAllByText('Pages').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0)
  })
  it('renders email address', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getAllByText(/train@f3fitness.com/i).length).toBeGreaterThan(0)
  })
  it('renders phone number', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByText(/\+91/)).toBeInTheDocument()
  })
  it('renders current year in copyright', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument()
  })
  it('renders social media icon links', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })
  it('renders Join F3 Now CTA', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByText('Join F3 Now')).toBeInTheDocument()
  })
  it('renders business hours block', () => {
    render(<Wrap><Footer /></Wrap>)
    expect(screen.getByText('Hours')).toBeInTheDocument()
    expect(screen.getByText('Mon – Fri')).toBeInTheDocument()
  })
})
