// Page method reference
// These methods work on the browser page as a whole.

// ==============================
// METHOD: page.goto()
// ==============================
// Description:
// Navigates to a given URL.
//
// Why:
// Most UI tests start by opening a page.
//
// When to use:
// At the beginning of a test or before a new flow starts.
//
// Common mistake:
// Using raw URLs everywhere instead of a shared base URL.
//
// Example:
export async function pageGotoExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
}

// ==============================
// METHOD: page.reload()
// ==============================
// Description:
// Reloads the current page.
//
// Why:
// Useful when validating refresh behavior or after state changes.
//
// When to use:
// Use when the app behavior depends on a browser refresh.
//
// Example:
export async function pageReloadExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await page.reload();
}

// ==============================
// METHOD: page.goBack()
// ==============================
// Description:
// Navigates to the previous page in browser history.
//
// Why:
// Useful for history-based navigation checks.
//
// Example:
export async function pageGoBackExample(page) {
  await page.goto('http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.goBack();
}

// ==============================
// METHOD: page.goForward()
// ==============================
// Description:
// Navigates forward in browser history.
//
// Why:
// Useful when validating browser history navigation.
//
// Example:
export async function pageGoForwardExample(page) {
  await page.goto('http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.goBack();
  await page.goForward();
}

// ==============================
// METHOD: page.title()
// ==============================
// Description:
// Returns the current page title.
//
// Why:
// Good for quick metadata checks.
//
// Example:
export async function pageTitleExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  const title = await page.title();
  return title;
}

// ==============================
// METHOD: page.url()
// ==============================
// Description:
// Returns the current page URL.
//
// Why:
// Helpful for debug logs and navigation validation.
//
// Example:
export async function pageUrlExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  return page.url();
}

// ==============================
// METHOD: page.close()
// ==============================
// Description:
// Closes the current page.
//
// Why:
// Useful in multi-tab flows or manual page creation.
//
// Example:
export async function pageCloseExample(context) {
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await page.close();
}

// ==============================
// METHOD: page.screenshot()
// ==============================
// Description:
// Captures a screenshot of the page.
//
// Why:
// Useful for debugging, reporting, and visual evidence.
//
// When to use:
// Use for diagnostics or important checkpoints.
//
// Common mistake:
// Taking too many screenshots and slowing the suite unnecessarily.
//
// Example:
export async function pageScreenshotExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await page.screenshot({ path: 'playwright-api-reference/page/dashboard-example.png' });
}

// ==============================
// METHOD: page.setViewportSize()
// ==============================
// Description:
// Sets the browser viewport size.
//
// Why:
// Helps test responsive behavior or stable screenshot output.
//
// Example:
export async function pageSetViewportSizeExample(page) {
  await page.setViewportSize({ width: 1280, height: 720 });
}

// ==============================
// METHOD: page.bringToFront()
// ==============================
// Description:
// Brings the page to the front when multiple pages are open.
//
// Why:
// Helpful in multi-tab or popup scenarios.
//
// Example:
export async function pageBringToFrontExample(context) {
  const firstPage = await context.newPage();
  const secondPage = await context.newPage();
  await firstPage.goto('http://127.0.0.1:3000/');
  await secondPage.goto('http://127.0.0.1:3000/dashboard.html');
  await firstPage.bringToFront();
}

// ==============================
// METHOD: page.content()
// ==============================
// Description:
// Returns the full HTML content of the current page.
//
// Why:
// Useful for diagnostics and artifact attachment.
//
// Example:
export async function pageContentExample(page) {
  await page.goto('http://127.0.0.1:3000/');
  return page.content();
}

// ==============================
// METHOD: page.setContent()
// ==============================
// Description:
// Replaces the page with a custom HTML string.
//
// Why:
// Good for tiny isolated demos without depending on a real page.
//
// When to use:
// Use for local DOM experiments or fast proof-of-concept checks.
//
// Example:
export async function pageSetContentExample(page) {
  await page.setContent('<button id="demo-button">Demo button</button>');
}

