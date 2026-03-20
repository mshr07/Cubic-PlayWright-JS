// Locator creation method reference
// These methods create Playwright locators from page-level queries.

// ==============================
// METHOD: page.locator()
// ==============================
// Description:
// Creates a locator using CSS, XPath, or Playwright selector engines.
//
// Why:
// It is the generic fallback when better semantic locators are not available.
//
// When to use:
// Use when role, label, or test id is not available.
//
// Common mistake:
// Overusing brittle CSS chains when semantic locators would be better.
//
// Example:
export async function pageLocatorExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('#primary-action');
}

// ==============================
// METHOD: page.getByRole()
// ==============================
// Description:
// Finds elements by accessibility role and name.
//
// Why:
// This is usually the best locator for stable, user-facing UI.
//
// When to use:
// Prefer it for buttons, links, headings, checkboxes, and inputs.
//
// Example:
export async function pageGetByRoleExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.getByRole('button', { name: 'Save changes' });
}

// ==============================
// METHOD: page.getByText()
// ==============================
// Description:
// Finds elements by visible text.
//
// Why:
// Helpful for quick assertions or static content.
//
// When to use:
// Use when the visible text is stable and meaningful.
//
// Common mistake:
// Using text locators for dynamic content that changes frequently.
//
// Example:
export async function pageGetByTextExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  return page.getByText('Run smoke suite');
}

// ==============================
// METHOD: page.getByLabel()
// ==============================
// Description:
// Finds form elements using their accessible label.
//
// Why:
// Excellent for readable, stable form automation.
//
// Example:
export async function pageGetByLabelExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  return page.getByLabel('Email');
}

// ==============================
// METHOD: page.getByPlaceholder()
// ==============================
// Description:
// Finds inputs by placeholder text.
//
// Why:
// Useful when labels are unavailable but placeholders are stable.
//
// Example:
export async function pageGetByPlaceholderExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  return page.getByPlaceholder('Enter email');
}

// ==============================
// METHOD: page.getByTestId()
// ==============================
// Description:
// Finds elements by test id attribute.
//
// Why:
// Good for stable selectors when teams intentionally expose test ids.
//
// Example:
export async function pageGetByTestIdExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.getByTestId('save-button');
}

