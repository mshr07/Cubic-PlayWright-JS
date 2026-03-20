import { test, expect } from '@playwright/test';
import { AuthFlow } from '../../pages/AuthFlow.js';

test('composing reusable flows: combine multiple page objects or actions', async ({ page }) => {
  const authFlow = new AuthFlow(page);
  await authFlow.loginAsValidUser();
  await expect(page.getByText('Welcome to the SDET dashboard')).toBeVisible();
});

