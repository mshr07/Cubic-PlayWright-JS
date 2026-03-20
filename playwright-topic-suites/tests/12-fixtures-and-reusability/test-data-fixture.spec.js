import { test, expect } from '../../fixtures/test-data-fixture.js';

test('test data fixture: inject shared JSON-like data', async ({ usersData }) => {
  expect(usersData.length).toBeGreaterThan(0);
});

