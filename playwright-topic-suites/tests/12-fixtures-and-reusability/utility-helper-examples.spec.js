import { test, expect } from '@playwright/test';
import { logStep } from '../../utils/logger.js';

test('utility helper examples: centralize repeatable non-test logic', async ({ page }) => {
  logStep('Opening dashboard page');
  await page.goto('/dashboard.html');
  await expect(page.getByText('Review test report')).toBeVisible();
});

