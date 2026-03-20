import { test, expect } from '@playwright/test';

test('@cross-browser cross-browser suite organization: same test runs across browser projects', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByText('Playwright Training App')).toBeVisible();
  expect(['chromium', 'firefox', 'webkit']).toContain(testInfo.project.name);
});

