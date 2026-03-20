// Topic: object destructuring, spread operator, and optional chaining
// Why it matters for Playwright:
// Helpful for config objects, response payloads, and default data overrides.

const envConfig = {
  envName: 'qa',
  retries: 1,
  api: {
    timeout: 3000
  }
};

const { envName, retries } = envConfig;
const updatedConfig = { ...envConfig, retries: 2 };

console.log(envName, retries);
console.log(updatedConfig.api?.timeout);
console.log(updatedConfig.auth?.token);

