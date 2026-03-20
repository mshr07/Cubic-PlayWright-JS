import { test, expect } from '../../fixtures/base-test.js';

test('custom fixture basics: consume a shared sample user', async ({ sampleUser }) => {
  expect(sampleUser.email).toBe('student1@example.com');
});

