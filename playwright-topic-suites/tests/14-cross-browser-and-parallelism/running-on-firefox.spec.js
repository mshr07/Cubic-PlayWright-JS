import { test, expect } from '@playwright/test';

test('running on Firefox: project filter can target firefox only', async ({ page, browserName }) => {
  test.skip(browserName !== 'firefox', 'Firefox-specific training example');
  await page.goto('/');
  await expect(page.getByText('Playwright Training App')).toBeVisible();
});

