import { test, expect } from '@playwright/test';

test('tags and annotations help suite selection @smoke', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'topic', description: 'runner-metadata' });
  await page.goto('/');
  await expect(page.getByText('stable training examples')).toBeVisible();
});

