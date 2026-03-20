import { test, expect } from '@playwright/test';

test('running on WebKit: project filter can target webkit only', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'WebKit-specific training example');
  await page.goto('/');
  await expect(page.getByText('Playwright Training App')).toBeVisible();
});

