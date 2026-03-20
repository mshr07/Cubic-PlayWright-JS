# JavaScript + Playwright SDET Training Repository

This repository is a production-grade learning project for freshers preparing for a Test Engineer or SDET role using JavaScript and Playwright.

It is intentionally split into two tracks:

1. `javascript-foundation/`
2. `playwright-topic-suites/`
3. `api-testing-suites/`

JavaScript comes first because Playwright is easiest to learn when core language ideas already feel natural. That includes functions, objects, async code, modules, JSON handling, and DOM basics. Once those are clear, Playwright concepts become much easier to understand and debug.

## Who This Repo Is For

- Freshers moving into testing or automation
- Manual testers transitioning to automation
- Java developers learning JavaScript-based UI and API automation
- Python learners who need JavaScript fluency for Playwright

## Repository Goals

- Teach JavaScript topics required for Playwright
- Teach Playwright topic by topic with JavaScript only
- Provide runnable examples, not just theory
- Show production-grade structure, naming, and reusable utilities
- Keep code readable for beginners without making it toy-like

## Recommended Learning Sequence

1. JavaScript foundation
2. Playwright fundamentals
3. UI automation topics
4. API and network testing
5. Page Object Model and fixtures
6. Debugging and reporting
7. Smoke, regression, and end-to-end suite organization
8. Post-Playwright SDET topics

## Suggested Teaching Path

1. Week 1: Teach `javascript-foundation/01-basics` through `javascript-foundation/06-scope-and-hoisting`
2. Week 2: Teach modules, errors, async JavaScript, DOM, and JSON handling
3. Week 3: Start `playwright-topic-suites/01-playwright-fundamentals` through `05-assertions`
4. Week 4: Cover waits, browser context, complex UI, and network testing
5. Week 5: Cover data-driven testing, POM, fixtures, debugging, and reporting
6. Week 6: Cover cross-browser execution, smoke/regression/E2E organization, and mini framework discussions

## How To Run

```bash
npm install
npx playwright install
npm test
```

Useful commands:

```bash
npx playwright test --headed
npm run test:headed
npm run test:debug
npm run test:locators
npm run test:api
npm run test:api-suites
npm run test:smoke
npm run foundation:run
npm run report
```

## Testing Types Covered

### UI Testing

- Definition: Verifies page elements, interactions, and user-visible behavior
- Used when validating forms, tables, modals, navigation, and visual flows
- Why it matters: Most product defects are first noticed through the UI
- Example: [`playwright-topic-suites/tests/04-user-actions/click-action.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/04-user-actions/click-action.spec.js)

### End-to-End Testing

- Definition: Validates a realistic user journey across multiple steps
- Used for checkout, login-to-dashboard, and task completion flows
- Why it matters: Confirms important business journeys still work
- Example: [`playwright-topic-suites/tests/15-smoke-regression-e2e-structure/end-to-end-journey.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/15-smoke-regression-e2e-structure/end-to-end-journey.spec.js)

### Regression Testing

- Definition: Re-runs broader coverage after changes
- Used before release or after large feature changes
- Why it matters: Helps detect functionality that broke elsewhere
- Example: [`playwright-topic-suites/tests/15-smoke-regression-e2e-structure/regression-suite.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/15-smoke-regression-e2e-structure/regression-suite.spec.js)

### Smoke Testing

- Definition: A fast set of critical checks
- Used after deployment or in CI
- Why it matters: Quickly answers "is the build basically healthy?"
- Example: [`playwright-topic-suites/tests/15-smoke-regression-e2e-structure/smoke-suite.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/15-smoke-regression-e2e-structure/smoke-suite.spec.js)

### Negative Testing

- Definition: Validates invalid input, error messages, and guard rails
- Used for bad credentials, empty fields, and invalid payloads
- Why it matters: Real users make mistakes and systems must respond safely
- Example: [`playwright-topic-suites/tests/15-smoke-regression-e2e-structure/negative-testing-suite.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/15-smoke-regression-e2e-structure/negative-testing-suite.spec.js)

### API Testing

- Definition: Validates service behavior without the UI
- Used for CRUD flows, auth headers, schema checks, and contract validation
- Why it matters: APIs are faster to validate and help isolate backend defects
- Example: [`playwright-topic-suites/tests/09-network-and-api-testing/get-request.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/09-network-and-api-testing/get-request.spec.js)

### Cross-Browser Testing

- Definition: Confirms behavior across Chromium, Firefox, and WebKit
- Used for high-risk user journeys and UI compatibility checks
- Why it matters: Users do not all run the same browser engine
- Example: [`playwright-topic-suites/tests/14-cross-browser-and-parallelism/running-on-chromium.spec.js`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/tests/14-cross-browser-and-parallelism/running-on-chromium.spec.js)

## After Playwright, What To Learn Next For This Role

- API testing deeper: status codes, contract testing, service virtualization, and auth flows
- SQL / database testing: joins, validation queries, and data integrity checks
- JIRA / defect lifecycle: writing useful bug reports and triage collaboration
- Agile / Scrum basics: ceremonies, stories, estimation, and testing in sprint flow
- CI/CD basics: pipelines, quality gates, scheduled runs, and deployment awareness
- Git and branching: pull requests, rebasing basics, reviewing, and conflict handling
- Debugging and root cause analysis: logs, traces, network calls, and reproduction discipline
- Test design techniques: boundary value analysis, equivalence partitioning, state transitions
- GenAI tools for testing: prompt-assisted test design, debugging support, and data generation
- Framework design principles: maintainability, separation of concerns, config, and reuse

## Repository Highlights

- JavaScript only, not TypeScript
- Stable local training app and local API
- Topic-wise focused files
- Playwright best practices and local-first examples
- Reusable page objects, fixtures, utilities, and data files
- CI-ready GitHub Actions example

Read these next:

- [`javascript-foundation/README.md`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/javascript-foundation/README.md)
- [`javascript-foundation/index.md`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/javascript-foundation/index.md)
- [`playwright-topic-suites/README.md`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/playwright-topic-suites/README.md)
- [`api-testing-suites/README.md`](/Users/srihemanthreddy/Documents/Ajay%20LLM/Playwright/api-testing-suites/README.md)
