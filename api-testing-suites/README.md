# API Testing Suites

This folder is a dedicated API testing learning track for freshers preparing for Test Engineer and SDET roles.

It is separate from the UI-focused Playwright folder because API testing deserves its own space, structure, and progression.

## What This Folder Covers

- API testing fundamentals
- HTTP methods and semantics
- Request building patterns
- Response validation
- Stateful flows and CRUD scenarios
- Negative testing and error handling
- Advanced API topics
- API test design and maintenance practices

## Why API Testing Matters

- It is faster than UI testing
- It helps isolate backend issues early
- It improves test coverage for business logic
- It supports contract and integration validation
- It is a core skill for SDET interviews and real projects

## Major Topics Included

- GET, POST, PUT, PATCH, DELETE
- HEAD and OPTIONS
- headers, auth, tokens, and cookies
- query params and path params
- JSON, form, and binary payload styles
- schema-like validation
- pagination, filtering, sorting, and search
- async job polling
- redirect handling
- caching and ETag validation
- optimistic concurrency control
- bulk APIs
- file upload and file download
- XML response basics
- rate limiting and retry handling
- correlation IDs and observability headers
- versioned APIs
- webhook-style payload testing
- clean API client abstraction
- data-driven API testing

## How To Run

From repository root:

```bash
npx playwright test -c api-testing-suites/playwright.api.config.js
```

Useful commands:

```bash
npm run test:api-suites
npx playwright test -c api-testing-suites/playwright.api.config.js api-testing-suites/tests/04-response-validation
```

## Learning Outcome

By the end of this folder, learners should be able to:

- understand what good API test coverage looks like
- build API requests cleanly
- validate responses beyond status codes
- design negative and edge-case coverage
- structure API tests like a production automation engineer

