import { test, expect } from '../../fixtures/base-test.js';

test('shared setup fixture: appBaseUrl comes from shared config', async ({ appBaseUrl }) => {
  expect(appBaseUrl).toContain('127.0.0.1');
});

