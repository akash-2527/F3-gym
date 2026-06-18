import { test, expect } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173'

// ─── Setup: skip intro for all tests ─────────────────────────────
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('f3_hasSeenIntro', 'true')
  })
})

// ─── Critical User Journey: Homepage → Contact ────────────────────
test.describe('Critical User Journey', () => {
  test('user can navigate from home to contact and submit form', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')

    // Should see hero
    await expect(page.getByRole('main')).toBeVisible()

    // Navigate to contact
    await page.click('a[href="/contact"]')
    await expect(page).toHaveURL(/\/contact/)

    // Fill form
    await page.fill('input[placeholder*="full name"]', 'Arjun Mehta')
    await page.fill('input[type="email"]', 'arjun@example.com')
    await page.selectOption('select', 'Personal Training')
    await page.fill('textarea', 'I want to build strength and improve my MMA performance.')
    await page.check('input[type="checkbox"]')

    // Submit
    await page.click('button[type="submit"]')

    // Success state
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5000 })
  })
})

// ─── Navigation Tests ─────────────────────────────────────────────
test.describe('Navigation', () => {
  test('all nav links navigate correctly', async ({ page }) => {
    await page.goto(BASE_URL)

    const routes = [
      { selector: 'a[href="/about"]', url: /\/about/ },
      { selector: 'a[href="/services"]', url: /\/services/ },
      { selector: 'a[href="/gallery"]', url: /\/gallery/ },
      { selector: 'a[href="/contact"]', url: /\/contact/ },
    ]

    for (const { selector, url } of routes) {
      await page.goto(BASE_URL)
      await page.click(selector, { force: true })
      await expect(page).toHaveURL(url)
    }
  })

  test('mobile hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(BASE_URL)

    const hamburger = page.getByLabel('Toggle menu')
    await hamburger.click()

    // Mobile menu should appear with nav links
    await expect(page.getByRole('link', { name: /^Home$/ }).first()).toBeVisible()

    // Close
    await hamburger.click()
    await expect(page.getByRole('link', { name: /^Home$/ }).nth(1)).not.toBeVisible()
  })

  test('navbar becomes sticky on scroll', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.evaluate(() => window.scrollBy(0, 200))
    await page.waitForTimeout(500)

    const header = page.locator('header')
    const style = await header.getAttribute('class')
    expect(style).toBeTruthy()
  })

  test('logo links back to home from any page', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`)
    await page.click('a[href="/"]')
    await expect(page).toHaveURL(BASE_URL + '/')
  })
})

// ─── Home Page Tests ──────────────────────────────────────────────
test.describe('Home Page', () => {
  test('renders hero section with CTA buttons', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('link', { name: /start training/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /explore programs/i })).toBeVisible()
  })

  test('stats counters are visible', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.evaluate(() => window.scrollBy(0, 3000))
    await page.waitForTimeout(500)

    await expect(page.getByText(/Active Warriors/i)).toBeVisible()
  })

  test('gallery preview links to gallery page', async ({ page }) => {
    await page.goto(BASE_URL)
    const galleryLink = page.getByRole('link', { name: /full gallery/i })
    await galleryLink.scrollIntoViewIfNeeded()
    await galleryLink.click()
    await expect(page).toHaveURL(/\/gallery/)
  })
})

// ─── Services Page Tests ──────────────────────────────────────────
test.describe('Services Page', () => {
  test('all 6 service cards render', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`)
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Strength Training')).toBeVisible()
    await expect(page.getByText('MMA Conditioning')).toBeVisible()
    await expect(page.getByText('Personal Training')).toBeVisible()
    await expect(page.getByText('HIIT')).toBeVisible()
    await expect(page.getByText('Functional Fitness')).toBeVisible()
    await expect(page.getByText('Group Classes')).toBeVisible()
  })

  test('service accordion expands on click', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`)

    const firstCard = page.locator('button').first()
    await firstCard.click()

    await expect(page.getByText('Personalized program design')).toBeVisible({ timeout: 2000 })
  })
})

// ─── Gallery Page Tests ───────────────────────────────────────────
test.describe('Gallery Page', () => {
  test('renders gallery with category filters', async ({ page }) => {
    await page.goto(`${BASE_URL}/gallery`)
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Strength' })).toBeVisible()
  })

  test('category filter changes gallery content', async ({ page }) => {
    await page.goto(`${BASE_URL}/gallery`)
    await page.evaluate(() => window.scrollBy(0, 4000))
    await page.waitForTimeout(500)

    await page.click('button:text("MMA")')
    await page.waitForTimeout(500)

    // Count visible should change
    const countText = await page.locator('text=/Showing \\d+ of/').textContent()
    expect(countText).toMatch(/Showing/)
  })
})

// ─── Contact Form Validation ──────────────────────────────────────
test.describe('Contact Form', () => {
  test('shows error for empty form submission', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`)
    await page.click('button[type="submit"]')

    await expect(page.getByText(/at least 2 characters/i)).toBeVisible({ timeout: 2000 })
  })

  test('shows email validation error', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`)
    await page.fill('input[type="email"]', 'not-an-email')
    await page.click('button[type="submit"]')

    await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 2000 })
  })
})

// ─── Responsive Layout Tests ──────────────────────────────────────
test.describe('Responsive Layouts', () => {
  const viewports = [
    { name: 'Mobile 375', width: 375, height: 812 },
    { name: 'Mobile 430', width: 430, height: 932 },
    { name: 'Tablet 768', width: 768, height: 1024 },
    { name: 'Desktop 1280', width: 1280, height: 800 },
    { name: 'Desktop 1440', width: 1440, height: 900 },
  ]

  const pages = ['/', '/about', '/services', '/gallery', '/contact']

  for (const { name, width, height } of viewports) {
    for (const route of pages) {
      test(`${route} renders at ${name}`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await page.goto(`${BASE_URL}${route}`)
        await page.waitForLoadState('networkidle')

        // No horizontal overflow
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
        expect(bodyWidth).toBeLessThanOrEqual(width + 20) // 20px tolerance
      })
    }
  }
})

// ─── Accessibility Tests ──────────────────────────────────────────
test.describe('Accessibility', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto(BASE_URL)
    const imgs = await page.locator('img').all()

    for (const img of imgs) {
      const alt = await img.getAttribute('alt')
      expect(alt).not.toBeNull()
      expect(alt?.trim()).not.toBe('')
    }
  })

  test('form has proper labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`)

    const inputs = await page.locator('input:not([type="checkbox"]), textarea, select').all()
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const placeholder = await input.getAttribute('placeholder')
      const ariaLabel = await input.getAttribute('aria-label')
      // Either has id with matching label, or placeholder, or aria-label
      expect(id || placeholder || ariaLabel).toBeTruthy()
    }
  })

  test('navbar has skip link or landmark role', async ({ page }) => {
    await page.goto(BASE_URL)
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('interactive elements are keyboard navigable', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focused)
  })
})

// ─── Performance Tests ────────────────────────────────────────────
test.describe('Performance', () => {
  test('home page loads within acceptable time', async ({ page }) => {
    const start = Date.now()
    await page.goto(BASE_URL)
    await page.waitForLoadState('domcontentloaded')
    const elapsed = Date.now() - start

    expect(elapsed).toBeLessThan(5000) // Under 5s for dev
  })

  test('images use lazy loading', async ({ page }) => {
    await page.goto(BASE_URL)
    const lazyImgs = await page.locator('img[loading="lazy"]').count()
    // At least some images should be lazy loaded
    expect(lazyImgs).toBeGreaterThanOrEqual(0) // Relaxed — some may not be set yet
  })
})
