import { test, expect } from '@playwright/test';

test('headless vs headed execution: runner controls mode through config or CLI', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Playwright Training App')).toBeVisible();
});

