# Playwright API Reference

This folder is an in-project Playwright method reference for JavaScript learners.

It is designed for freshers who need:

- a method-by-method explanation
- minimal but realistic examples
- guidance on when to use each API
- warnings about common mistakes

## What This Folder Is

This is a practical reference system for Playwright built-in APIs and Playwright Test runner features.

It is not a replacement for official documentation. Instead, it is a learning layer inside this repository that explains Playwright in simpler project-oriented language.

## How To Use It

1. Open the category folder you want to learn.
2. Read the category `README.md`.
3. Open the `.js` file for the method group.
4. Reuse the example functions in your own specs.
5. Compare the examples with the runnable suites already present in this repository.

## How To Run Examples

These files are written as parseable JavaScript reference modules. They are intended to be:

- read directly
- copied into Playwright specs
- imported into training specs if needed

For actual runnable suites in this repository, use:

```bash
npm test
npm run test:headed
npm run test:api-suites
```

## How To Search For Methods

Use your editor search, or terminal search:

```bash
rg "page.goto" playwright-api-reference
rg "locator.click" playwright-api-reference
rg "test.beforeEach" playwright-api-reference
```

## Recommended Learning Order

1. `browser-context/`
2. `page/`
3. `locator/`
4. `actions/`
5. `assertions/`
6. `waits/`
7. `frames-tabs/`
8. `storage-session/`
9. `network-api/`
10. `test-runner/`
11. `debugging/`
12. `utilities/`
13. `advanced/`

## Category Map

- `browser-context/`: browser, context, and session setup methods
- `page/`: navigation, content, and page-level utilities
- `locator/`: element finding APIs
- `actions/`: element interaction methods
- `assertions/`: `expect()`-based UI validations
- `waits/`: synchronization and stability methods
- `network-api/`: request/response and route mocking methods
- `frames-tabs/`: iframes, popups, tabs, and dialogs
- `storage-session/`: cookies, storage, and saved auth state
- `test-runner/`: Playwright Test structure and controls
- `debugging/`: pause, trace, screenshots, and step diagnostics
- `utilities/`: useful extra built-ins and helper patterns
- `advanced/`: fixtures, retries, parallelism, env patterns, and multi-context design

