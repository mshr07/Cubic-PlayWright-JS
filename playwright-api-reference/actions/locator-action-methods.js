// Locator action method reference
// These methods simulate realistic user interactions on elements.

// ==============================
// METHOD: locator.click()
// ==============================
// Description:
// Clicks an element.
//
// Why:
// Used for buttons, links, toggles, and many common flows.
//
// When to use:
// Use for normal click interactions after locating a stable element.
//
// Example:
export async function locatorClickExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.getByRole('button', { name: 'Save changes' }).click();
}

// ==============================
// METHOD: locator.fill()
// ==============================
// Description:
// Replaces the current value of an input, textarea, or editable field.
//
// Why:
// Faster and cleaner than typing character by character.
//
// Example:
export async function locatorFillExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
}

// ==============================
// METHOD: locator.type()
// ==============================
// Description:
// Types text into an element.
//
// Why:
// Useful for older examples or when key-by-key typing behavior matters.
//
// When to use:
// Use rarely. In modern Playwright, `fill()` is usually preferred for standard forms.
//
// Common mistake:
// Using `type()` when `fill()` would be simpler and more stable.
//
// Example:
export async function locatorTypeExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.getByLabel('Notes').type('Typing text into notes');
}

// ==============================
// METHOD: locator.clear()
// ==============================
// Description:
// Clears the value of an editable element.
//
// Why:
// Useful before re-entering text or validating field reset behavior.
//
// Example:
export async function locatorClearExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  const input = page.getByLabel('Full name');
  await input.fill('Temporary');
  await input.clear();
}

// ==============================
// METHOD: locator.check()
// ==============================
// Description:
// Checks a checkbox or radio button.
//
// Why:
// Safer than clicking because it targets the desired checked state.
//
// Example:
export async function locatorCheckExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#subscribe').check();
}

// ==============================
// METHOD: locator.uncheck()
// ==============================
// Description:
// Unchecks a checkbox.
//
// Why:
// Safer than toggling with click when unchecked state matters.
//
// Example:
export async function locatorUncheckExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  const checkbox = page.locator('#subscribe');
  await checkbox.check();
  await checkbox.uncheck();
}

// ==============================
// METHOD: locator.selectOption()
// ==============================
// Description:
// Selects an option in a `<select>` element.
//
// Why:
// Preferred for native dropdowns.
//
// Example:
export async function locatorSelectOptionExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#department').selectOption('dev');
}

// ==============================
// METHOD: locator.hover()
// ==============================
// Description:
// Moves the mouse over an element.
//
// Why:
// Needed for hover menus, tooltips, and hover-only UI states.
//
// Example:
export async function locatorHoverExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#primary-action').hover();
}

// ==============================
// METHOD: locator.dblclick()
// ==============================
// Description:
// Double-clicks an element.
//
// Why:
// Useful for components that react only to double-click behavior.
//
// Example:
export async function locatorDoubleClickExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#double-click-button').dblclick();
}

// ==============================
// METHOD: locator.press()
// ==============================
// Description:
// Sends a keyboard key or shortcut to the focused element.
//
// Why:
// Useful for Enter, Escape, shortcuts, and special key flows.
//
// Example:
export async function locatorPressExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  const input = page.getByLabel('Notes');
  await input.fill('Sample text');
  await input.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
}

// ==============================
// METHOD: locator.dragTo()
// ==============================
// Description:
// Drags one element to another.
//
// Why:
// Useful for drag-and-drop interfaces.
//
// Example:
export async function locatorDragToExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#drag-source').dragTo(page.locator('#drop-target'));
}

// ==============================
// METHOD: locator.setInputFiles()
// ==============================
// Description:
// Uploads one or more files into a file input.
//
// Why:
// Essential for upload workflows.
//
// Common mistake:
// Trying to click native OS file pickers instead of setting files directly.
//
// Example:
export async function locatorSetInputFilesExample(page, filePath) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  await page.locator('#file-input').setInputFiles(filePath);
}

