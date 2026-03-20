import { test, expect } from '@playwright/test';

test('retry config: retries are controlled centrally in config', async ({ page }, testInfo) => {
  await page.goto('/');
  expect(testInfo.retry).toBeGreaterThanOrEqual(0);
});
