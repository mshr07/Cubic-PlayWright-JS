import { test, expect } from '../../fixtures/base-test.js';

test('environment-specific config usage: read environment-based values once', async ({ page, appBaseUrl }) => {
  await page.goto(appBaseUrl);
  await expect(page.getByText('Playwright Training App')).toBeVisible();
});

