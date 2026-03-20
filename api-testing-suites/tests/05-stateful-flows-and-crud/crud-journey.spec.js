import { test, expect } from '@playwright/test';
import { UsersClient } from '../../api-clients/UsersClient.js';

test('CRUD journey: create, read, update, and delete in one business flow', async ({ request }) => {
  const usersClient = new UsersClient(request);
  const createdResponse = await usersClient.create({
    name: 'CRUD User',
    email: 'crud.user@example.com',
    role: 'sdet'
  });
  const created = await createdResponse.json();
  expect(created.data.email).toBe('crud.user@example.com');

  const readResponse = await usersClient.getById(1);
  expect(readResponse.status()).toBe(200);

  const updatedResponse = await request.patch('/api/users/1', {
    data: { role: 'updated-role' }
  });
  expect(updatedResponse.ok()).toBeTruthy();

  const deletedResponse = await request.delete('/api/users/1');
  expect(deletedResponse.ok()).toBeTruthy();
});

