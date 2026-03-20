import { test, expect } from '../../fixtures/auth-fixture.js';

test('authenticated fixture: start from an already logged-in state', async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL(/dashboard\.html/);
});

