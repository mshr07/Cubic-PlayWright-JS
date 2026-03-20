import { test, expect } from '@playwright/test';

test('running on Chromium: project filter can target chromium only', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Chromium-specific training example');
  await page.goto('/');
  await expect(page.getByText('Playwright Training App')).toBeVisible();
});

