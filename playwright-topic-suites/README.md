# Playwright Topic Suites

This folder is a production-grade Playwright learning project in JavaScript only.

## What This Folder Teaches

- Playwright fundamentals
- Runner and config structure
- Locator strategies
- User actions
- Assertions
- Waits and synchronization
- Browser contexts and session state
- Complex UI handling
- Network and API testing
- Data-driven patterns
- Page Object Model
- Fixtures and reusability
- Debugging and reporting
- Cross-browser execution and parallelism
- Smoke, regression, and end-to-end organization

## Why This Project Uses A Local App

Many training repositories depend too heavily on public demo sites. Those are useful, but not always stable. This project includes a local training app and local API so learners can practice without flaky external dependencies.

## Folder Structure

- `tests/`: topic-wise specs
- `pages/`: page objects
- `fixtures/`: custom fixtures
- `utils/`: shared helpers
- `test-data/`: reusable datasets
- `api-clients/`: API abstraction examples
- `local-app/`: stable local UI and API
- `reports/`: generated reports

## Key Commands

```bash
npm test
npm run test:headed
npm run test:debug
npm run report
```

## CLI Examples

```bash
npx playwright test -c playwright-topic-suites/playwright.config.js
npx playwright test -c playwright-topic-suites/playwright.config.js --project=chromium
npx playwright test -c playwright-topic-suites/playwright.config.js --grep @smoke
npx playwright test -c playwright-topic-suites/playwright.config.js playwright-topic-suites/tests/03-locators-and-selectors/get-by-role.spec.js
```

## Learning Outcomes

After completing this folder, learners should be able to:

- build UI and API tests with Playwright
- select stable locators
- handle waits correctly
- structure frameworks with fixtures and page objects
- debug failures with traces, logs, and reports
- organize suites for smoke, regression, and end-to-end coverage

## Sharding Concept

Sharding means splitting the test suite into multiple CI machines to reduce total execution time. Example:

```bash
npx playwright test --shard=1/3
```

Use it later when the suite becomes large enough to benefit from distribution.

