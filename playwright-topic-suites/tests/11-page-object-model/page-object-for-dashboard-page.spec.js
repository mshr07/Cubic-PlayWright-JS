import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage.js';

test('page object for dashboard page exposes read-only dashboard areas', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await page.goto('/dashboard.html');
  await expect(dashboardPage.banner).toContainText('dashboard');
});

