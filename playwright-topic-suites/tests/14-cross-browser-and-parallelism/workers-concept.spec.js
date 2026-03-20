import { test, expect } from '@playwright/test';

test('workers concept: tests run on workers for concurrency', async ({ page }, testInfo) => {
  await page.goto('/');
  expect(testInfo.workerIndex).toBeGreaterThanOrEqual(0);
});

