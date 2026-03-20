import { expect } from '@playwright/test';

export function expectJsonContentType(response) {
  expect(response.headers()['content-type']).toContain('application/json');
}

export function expectUserContract(user) {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String)
    })
  );
}

export function expectPaginationMeta(meta) {
  expect(meta).toEqual(
    expect.objectContaining({
      page: expect.any(Number),
      limit: expect.any(Number),
      total: expect.any(Number)
    })
  );
}

