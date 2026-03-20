// Topic: reference types
// Why it matters for Playwright:
// Objects and arrays are used for test data, environment config, locators, and API payloads.

const credentials = {
  email: 'trainee@example.com',
  password: 'Password123'
};

const browsers = ['chromium', 'firefox', 'webkit'];
const copiedCredentials = credentials;

copiedCredentials.email = 'updated@example.com';

console.log('Updated original object:', credentials);
console.log('Supported browsers:', browsers);

