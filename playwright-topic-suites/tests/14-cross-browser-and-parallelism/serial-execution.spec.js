import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('serial execution: step one', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Run smoke suite')).toBeVisible();
});

test('serial execution: step two', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.locator('#task-list li')).toHaveCount(3);
});

