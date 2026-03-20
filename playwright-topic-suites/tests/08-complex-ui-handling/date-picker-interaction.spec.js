import { test, expect } from '@playwright/test';
import { getTodayAsInputValue } from '../../utils/date-utils.js';

test('date picker interaction: set and verify a date input', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const today = getTodayAsInputValue();
  await page.locator('#date-input').fill(today);
  await expect(page.locator('#date-input')).toHaveValue(today);
});

