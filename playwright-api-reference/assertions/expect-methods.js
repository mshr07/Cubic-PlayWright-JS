// Assertion method reference
// These examples use Playwright's built-in expect assertions.

import { expect } from '@playwright/test';

// ==============================
// METHOD: expect(locator).toBeVisible()
// ==============================
// Description:
// Verifies that an element is visible.
//
// Why:
// One of the most common UI assertions.
//
// Example:
export async function toBeVisibleExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await expect(page.getByText('Welcome to the SDET dashboard')).toBeVisible();
}

// ==============================
// METHOD: expect(locator).toBeHidden()
// ==============================
// Description:
// Verifies that an element is hidden.
//
// Why:
// Useful for modals, loaders, and collapsed sections.
//
// Example:
export async function toBeHiddenExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await expect(page.locator('#details-panel')).toBeHidden();
}

// ==============================
// METHOD: expect(locator).toHaveText()
// ==============================
// Description:
// Verifies exact text content.
//
// Why:
// Best when full text should match exactly.
//
// Example:
export async function toHaveTextExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await expect(page.locator('#welcome-banner')).toHaveText('Welcome to the SDET dashboard');
}

// ==============================
// METHOD: expect(locator).toContainText()
// ==============================
// Description:
// Verifies that text contains a partial value.
//
// Why:
// Useful when surrounding text may vary.
//
// Example:
export async function toContainTextExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await expect(page.locator('#welcome-banner')).toContainText('SDET dashboard');
}

// ==============================
// METHOD: expect(locator).toHaveValue()
// ==============================
// Description:
// Verifies the value of an input-like field.
//
// Why:
// Important for forms and data-entry flows.
//
// Example:
export async function toHaveValueExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  const emailInput = page.getByLabel('Email');
  await emailInput.fill('student1@example.com');
  await expect(emailInput).toHaveValue('student1@example.com');
}

// ==============================
// METHOD: expect(locator).toHaveAttribute()
// ==============================
// Description:
// Verifies a specific HTML attribute.
//
// Why:
// Useful for href, aria attributes, type, and state markers.
//
// Example:
export async function toHaveAttributeExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
}

// ==============================
// METHOD: expect(locator).toBeChecked()
// ==============================
// Description:
// Verifies checkbox or radio state.
//
// Why:
// Safer than checking raw DOM properties manually.
//
// Example:
export async function toBeCheckedExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  const checkbox = page.locator('#subscribe');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
}

// ==============================
// METHOD: expect(page).toHaveURL()
// ==============================
// Description:
// Verifies current page URL.
//
// Why:
// Important after navigation or redirects.
//
// Example:
export async function toHaveUrlExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await expect(page).toHaveURL(/login\.html/);
}

// ==============================
// METHOD: expect(page).toHaveTitle()
// ==============================
// Description:
// Verifies page title.
//
// Why:
// Good for simple navigation confirmation and metadata checks.
//
// Example:
export async function toHaveTitleExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await expect(page).toHaveTitle('Dashboard');
}

