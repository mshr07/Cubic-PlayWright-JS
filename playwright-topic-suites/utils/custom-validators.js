import { expect } from '@playwright/test';

export function expectSuccessResponse(responseBody) {
  expect(responseBody).toHaveProperty('data');
}

export function expectUserShape(user) {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String)
    })
  );
}

