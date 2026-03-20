// Storage and session method reference
// These methods help save and restore authenticated state.

// ==============================
// METHOD: context.storageState()
// ==============================
// Description:
// Saves cookies and local storage to a JSON file.
//
// Why:
// Useful for reusing authenticated sessions across tests.
//
// Example:
export async function storageStateSaveExample(context, page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.evaluate(() => localStorage.setItem('auth-token', 'saved-token'));
  await context.storageState({ path: 'playwright-api-reference/storage-session/auth-state.json' });
}

// ==============================
// METHOD: browser.newContext({ storageState })
// ==============================
// Description:
// Creates a new browser context preloaded with saved state.
//
// Why:
// Useful for skipping login in repeated tests.
//
// When to use:
// After creating a trusted storage state file.
//
// Common mistake:
// Using stale state that no longer matches the application.
//
// Example:
export async function browserNewContextWithStorageStateExample(browser, statePath) {
  const context = await browser.newContext({ storageState: statePath });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await context.close();
}

