import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    // We expect the dev server to be running at localhost:3000
    await page.goto('/');
  });

  test('should display the main headline', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Let AI Be Your Kanban Collaborator');
  });

  test('should navigate to pricing section', async ({ page }) => {
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/.*#pricing/);
    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeVisible();
  });

  test('should have a working "Get Started" button in Hero', async ({ page }) => {
    const getStartedHero = page.locator('section').filter({ hasText: 'Let AI Be Your Kanban Collaborator' }).getByRole('link', { name: /Get Started/i });
    await expect(getStartedHero).toBeVisible();
    // Verify it points to the app URL (we can check the href)
    const href = await getStartedHero.getAttribute('href');
    expect(href).toContain('vercel.app'); // Based on current constants
  });

  test('should show mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
  });
});
