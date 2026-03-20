// Frames, tabs, and dialog method reference
// These methods help switch context when the UI is split across frames or pages.

// ==============================
// METHOD: page.frame()
// ==============================
// Description:
// Returns a frame matching name or URL criteria.
//
// Why:
// Useful when you must access iframe content through the frame object.
//
// When to use:
// Prefer `frameLocator()` for most element work, but `page.frame()` is still useful for direct frame access.
//
// Example:
export async function pageFrameExample(page) {
  await page.goto('http://127.0.0.1:3000/iframe-host.html');
  return page.frame({ url: /iframe-content\.html/ });
}

// ==============================
// METHOD: frame.locator()
// ==============================
// Description:
// Creates a locator inside a frame.
//
// Why:
// Frame content must be queried inside the frame context.
//
// Example:
export async function frameLocatorExample(page) {
  await page.goto('http://127.0.0.1:3000/iframe-host.html');
  const frame = page.frame({ url: /iframe-content\.html/ });
  return frame.locator('#frame-button');
}

// ==============================
// METHOD: page.context().newPage()
// ==============================
// Description:
// Creates another page in the same browser context.
//
// Why:
// Useful for multi-tab flows with shared session state.
//
// Example:
export async function pageContextNewPageExample(page) {
  const secondPage = await page.context().newPage();
  await secondPage.goto('http://127.0.0.1:3000/dashboard.html');
  return secondPage;
}

// ==============================
// METHOD: page.waitForEvent('popup')
// ==============================
// Description:
// Waits for a popup window triggered from the current page.
//
// Why:
// Important for flows that open new tabs or windows.
//
// Common mistake:
// Clicking first and waiting later, which can miss the popup.
//
// Example:
export async function pageWaitForPopupExample(page) {
  await page.goto('http://127.0.0.1:3000/popup-source.html');
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#open-popup').click();
  return popupPromise;
}

// ==============================
// METHOD: page.waitForEvent('dialog')
// ==============================
// Description:
// Waits for a browser dialog like alert, confirm, or prompt.
//
// Why:
// Needed when the browser blocks interaction until the dialog is handled.
//
// Example:
export async function pageWaitForDialogExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Show alert' }).click();
  return dialogPromise;
}

