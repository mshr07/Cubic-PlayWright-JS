import { test, expect } from '@playwright/test';

test('supported browser projects in config expose project names', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(['chromium', 'firefox', 'webkit']).toContain(testInfo.project.name);
});

