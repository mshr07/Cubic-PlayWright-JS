// Request and response method reference
// These methods use Playwright's API request support for backend validation.

// ==============================
// METHOD: page.request
// ==============================
// Description:
// Provides access to Playwright's APIRequestContext from a page fixture.
//
// Why:
// Useful when UI and API work need to happen in the same test.
//
// Example:
export async function pageRequestExample(page) {
  const response = await page.request.get('http://127.0.0.1:3000/api/users');
  return response.status();
}

// ==============================
// METHOD: request.get()
// ==============================
// Description:
// Sends a GET request.
//
// Why:
// Used to fetch resources from APIs.
//
// Example:
export async function requestGetExample(request) {
  return request.get('http://127.0.0.1:3100/api/users');
}

// ==============================
// METHOD: request.post()
// ==============================
// Description:
// Sends a POST request.
//
// Why:
// Used for resource creation, login, and command-style endpoints.
//
// Example:
export async function requestPostExample(request) {
  return request.post('http://127.0.0.1:3100/api/users', {
    data: { name: 'API User', email: 'api.user@example.com', role: 'tester' }
  });
}

// ==============================
// METHOD: request.put()
// ==============================
// Description:
// Sends a PUT request.
//
// Why:
// Often used for full resource updates.
//
// Example:
export async function requestPutExample(request) {
  return request.put('http://127.0.0.1:3100/api/users/1', {
    data: { name: 'Updated User', email: 'updated@example.com', role: 'lead' }
  });
}

// ==============================
// METHOD: request.delete()
// ==============================
// Description:
// Sends a DELETE request.
//
// Why:
// Used for delete flows and cleanup operations.
//
// Example:
export async function requestDeleteExample(request) {
  return request.delete('http://127.0.0.1:3100/api/users/1');
}

// ==============================
// METHOD: response.json()
// ==============================
// Description:
// Parses a JSON response body.
//
// Why:
// Needed for API assertions on structured payloads.
//
// Example:
export async function responseJsonExample(request) {
  const response = await request.get('http://127.0.0.1:3100/api/users');
  return response.json();
}

// ==============================
// METHOD: response.status()
// ==============================
// Description:
// Returns the numeric HTTP status code.
//
// Why:
// One of the most important API checks.
//
// Example:
export async function responseStatusExample(request) {
  const response = await request.get('http://127.0.0.1:3100/api/users');
  return response.status();
}

// ==============================
// METHOD: response.text()
// ==============================
// Description:
// Reads the response body as plain text.
//
// Why:
// Useful for text, HTML, XML, CSV, and debugging.
//
// Example:
export async function responseTextExample(request) {
  const response = await request.get('http://127.0.0.1:3100/api/validation/xml');
  return response.text();
}

