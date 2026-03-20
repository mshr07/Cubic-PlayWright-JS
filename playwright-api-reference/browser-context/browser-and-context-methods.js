// Browser and context methods reference
// These methods control browser lifecycle and test session isolation.

// ==============================
// METHOD: browser.newContext()
// ==============================
// Description:
// Creates a new isolated browser context.
//
// Why:
// Contexts let tests run with separate cookies, storage, and session state.
//
// When to use:
// Use it when simulating separate users or keeping tests isolated.
//
// Common mistake:
// Reusing one context for unrelated tests and leaking state between them.
//
// Example:
export async function browserNewContextExample(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/login.html');
  await context.close();
}

// ==============================
// METHOD: browser.close()
// ==============================
// Description:
// Closes the browser instance.
//
// Why:
// Frees resources and ends the session.
//
// When to use:
// Usually in manual browser launch examples, not in standard Playwright Test fixtures.
//
// Common mistake:
// Calling it inside fixture-managed tests and accidentally breaking later steps.
//
// Example:
export async function browserCloseExample(browser) {
  await browser.close();
}

// ==============================
// METHOD: context.newPage()
// ==============================
// Description:
// Opens a new page within the current browser context.
//
// Why:
// Lets one user session open additional tabs or pages.
//
// When to use:
// Use when testing multiple pages in the same logged-in session.
//
// Example:
export async function contextNewPageExample(context) {
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/dashboard.html');
}

// ==============================
// METHOD: context.close()
// ==============================
// Description:
// Closes the current browser context and all its pages.
//
// Why:
// Cleans up session-level resources.
//
// When to use:
// Manual cleanup for context-based examples or multi-user flows.
//
// Example:
export async function contextCloseExample(browser) {
  const context = await browser.newContext();
  await context.close();
}

// ==============================
// METHOD: context.storageState()
// ==============================
// Description:
// Captures cookies and local storage for reuse.
//
// Why:
// Useful for authenticated-state reuse and faster test setup.
//
// When to use:
// After a successful login or when snapshotting browser state.
//
// Common mistake:
// Saving state before the important cookies or local storage entries exist.
//
// Example:
export async function contextStorageStateExample(context, page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.evaluate(() => localStorage.setItem('training-key', 'saved'));
  await context.storageState({ path: 'playwright-api-reference/browser-context/state-example.json' });
}

// ==============================
// METHOD: context.addCookies()
// ==============================
// Description:
// Adds cookies directly to the browser context.
//
// Why:
// Helps simulate logged-in or feature-enabled scenarios quickly.
//
// When to use:
// Use when a flow depends on cookie state and you want faster setup.
//
// Example:
export async function contextAddCookiesExample(context) {
  await context.addCookies([
    {
      name: 'training-cookie',
      value: 'enabled',
      url: 'http://127.0.0.1:3000'
    }
  ]);
}

// ==============================
// METHOD: context.clearCookies()
// ==============================
// Description:
// Removes all cookies from the browser context.
//
// Why:
// Helps reset session state between phases of a test.
//
// When to use:
// Use when validating logout-like behavior or cookie cleanup.
//
// Example:
export async function contextClearCookiesExample(context) {
  await context.clearCookies();
}

