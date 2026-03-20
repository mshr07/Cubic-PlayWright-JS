import { test, expect } from '@playwright/test';
import fs from 'fs';

test('storageState(): save browser state to a file', async ({ page, context }) => {
  const statePath = new URL('../../reports/auth-state.json', import.meta.url).pathname;
  await page.goto('/login.html');
  await page.evaluate(() => localStorage.setItem('training-state', 'saved'));
  await context.storageState({ path: statePath });
  expect(fs.existsSync(statePath)).toBeTruthy();
});
