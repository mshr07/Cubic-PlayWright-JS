// Wait method reference
// These methods help synchronize the test with UI and network state.

// ==============================
// METHOD: page.waitForSelector()
// ==============================
// Description:
// Waits for an element matching a selector to appear or reach a state.
//
// Why:
// Useful when explicit selector-based waiting is needed.
//
// When to use:
// Use for targeted cases, though locator assertions are often cleaner.
//
// Example:
export async function pageWaitForSelectorExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await page.waitForSelector('#details-panel');
}

// ==============================
// METHOD: locator.waitFor()
// ==============================
// Description:
// Waits for the locator to reach a specific state.
//
// Why:
// Useful when waiting on visibility, attachment, or hidden state.
//
// Example:
export async function locatorWaitForExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await page.locator('#details-panel').waitFor({ state: 'visible' });
}

// ==============================
// METHOD: page.waitForURL()
// ==============================
// Description:
// Waits until the current page URL matches a pattern.
//
// Why:
// Great after login or redirect flows.
//
// Example:
export async function pageWaitForUrlExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard.html');
}

// ==============================
// METHOD: page.waitForLoadState()
// ==============================
// Description:
// Waits for a document load state such as `domcontentloaded`, `load`, or `networkidle`.
//
// Why:
// Useful when navigation timing matters.
//
// Common mistake:
// Overusing `networkidle` when the app has background polling.
//
// Example:
export async function pageWaitForLoadStateExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await page.waitForLoadState('domcontentloaded');
}

// ==============================
// METHOD: page.waitForResponse()
// ==============================
// Description:
// Waits for a matching network response.
//
// Why:
// Useful when a UI action triggers a specific API call.
//
// Example:
export async function pageWaitForResponseExample(page) {
  await page.goto('http://127.0.0.1:3000/network-playground.html');
  const responsePromise = page.waitForResponse('**/api/slow');
  await page.getByRole('button', { name: 'Load slow response' }).click();
  await responsePromise;
}

// ==============================
// METHOD: page.waitForTimeout()
// ==============================
// Description:
// Waits for a fixed number of milliseconds.
//
// Why:
// Usually it should not be used in production tests.
//
// When to use:
// Only for debugging, demos, or temporary investigation.
//
// Common mistake:
// Using hard waits in real tests instead of waiting for real app signals.
//
// Example:
export async function pageWaitForTimeoutAntiPatternExample(page) {
  await page.goto('http://127.0.0.1:3000/');
  await page.waitForTimeout(1_000);
}

