import { test } from '@playwright/test';

test.skip('debug mode: run this file with --debug and optionally use page.pause()', async ({ page }) => {
  await page.goto('/');
  await page.pause();
});

