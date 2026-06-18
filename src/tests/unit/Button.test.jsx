import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ButtonPrimary, ButtonOutline, ButtonGhost, MagneticButton } from '../../components/ui/Button'

const Wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>

describe('ButtonPrimary', () => {
  it('renders with children text', () => {
    render(<Wrapper><ButtonPrimary>Click Me</ButtonPrimary></Wrapper>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders as a Link when "to" prop is given', () => {
    render(<Wrapper><ButtonPrimary to="/contact">Join Now</ButtonPrimary></Wrapper>)
    const link = screen.getByRole('link', { name: /join now/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders as an anchor when "href" prop is given', () => {
    render(<Wrapper><ButtonPrimary href="https://example.com">External</ButtonPrimary></Wrapper>)
    const link = screen.getByRole('link', { name: /external/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders as a button and handles click', () => {
    const handleClick = vi.fn()
    render(<Wrapper><ButtonPrimary onClick={handleClick}>Submit</ButtonPrimary></Wrapper>)
    fireEvent.click(screen.getByText('Submit'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Wrapper><ButtonPrimary className="custom-class">Test</ButtonPrimary></Wrapper>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('hides icon when icon=false', () => {
    const { container } = render(<Wrapper><ButtonPrimary icon={false}>No Icon</ButtonPrimary></Wrapper>)
    expect(container.querySelector('svg')).toBeNull()
  })
})

describe('ButtonOutline', () => {
  it('renders correctly', () => {
    render(<Wrapper><ButtonOutline>Outline</ButtonOutline></Wrapper>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has border styling', () => {
    render(<Wrapper><ButtonOutline>Border</ButtonOutline></Wrapper>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})

describe('ButtonGhost', () => {
  it('renders with line decoration', () => {
    const { container } = render(<Wrapper><ButtonGhost>Ghost</ButtonGhost></Wrapper>)
    expect(screen.getByText('Ghost')).toBeInTheDocument()
    // Should have horizontal line element
    expect(container.querySelector('span.w-8')).toBeTruthy()
  })
})

describe('MagneticButton', () => {
  it('renders children inside wrapper', () => {
    render(
      <MagneticButton>
        <button>Magnetic</button>
      </MagneticButton>
    )
    expect(screen.getByRole('button', { name: 'Magnetic' })).toBeInTheDocument()
  })

  it('wraps content in a div', () => {
    const { container } = render(
      <MagneticButton><span>Inner</span></MagneticButton>
    )
    expect(container.firstChild.tagName).toBe('DIV')
  })
})
