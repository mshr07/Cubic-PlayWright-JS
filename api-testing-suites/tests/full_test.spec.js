import { test, expect, request } from "@playwright/test";

/**
 * COMPLETE API TESTING REFERENCE IN ONE FILE
 * ------------------------------------------
 * Covers:
 * - APIRequestContext creation
 * - GET / POST / PUT / PATCH / DELETE / HEAD
 * - query params
 * - headers
 * - auth header usage
 * - response validations
 * - response.json(), response.text(), response.body()
 * - status and statusText checks
 * - schema-like validation helpers
 * - negative testing
 * - reusable helper methods
 *
 * Public demo APIs used:
 * - https://jsonplaceholder.typicode.com
 * - https://reqres.in
 * - https://httpbin.org
 *
 * Note:
 * Some public APIs may behave slightly differently over time.
 * This file is written to demonstrate API testing patterns in Playwright.
 */

// ---------------------------------------------
// CONFIG
// ---------------------------------------------
const BASE_URL_JSONPLACEHOLDER = "https://jsonplaceholder.typicode.com";
const BASE_URL_REQRES = "https://reqres.in";
const BASE_URL_HTTPBIN = "https://httpbin.org";

// Reqres may require an API key on some plans/setups.
// Put yours here if needed, otherwise some tests may fail.
// You can also remove reqres tests if your environment blocks them.
const REQRES_API_KEY = process.env.REQRES_API_KEY || "reqres-free-v1";

// ---------------------------------------------
// REUSABLE HELPERS
// ---------------------------------------------
function validateUserShape(user) {
  expect(user).toBeTruthy();
  expect(typeof user).toBe("object");

  expect(user).toHaveProperty("id");
  expect(user).toHaveProperty("name");
  expect(user).toHaveProperty("username");
  expect(user).toHaveProperty("email");

  expect(typeof user.id).toBe("number");
  expect(typeof user.name).toBe("string");
  expect(typeof user.username).toBe("string");
  expect(typeof user.email).toBe("string");
}

function validatePostShape(post) {
  expect(post).toBeTruthy();
  expect(typeof post).toBe("object");

  expect(post).toHaveProperty("userId");
  expect(post).toHaveProperty("id");
  expect(post).toHaveProperty("title");
  expect(post).toHaveProperty("body");

  expect(typeof post.userId).toBe("number");
  expect(typeof post.id).toBe("number");
  expect(typeof post.title).toBe("string");
  expect(typeof post.body).toBe("string");
}

function validateHeaderObject(headers) {
  expect(headers).toBeTruthy();
  expect(typeof headers).toBe("object");
}

function validateEmail(email) {
  expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

async function logResponseDetails(response) {
  const headers = response.headers();
  console.log("STATUS:", response.status());
  console.log("STATUS TEXT:", response.statusText());
  console.log("HEADERS:", headers);
}

async function expectStatus(response, expectedStatus) {
  expect(
    response.status(),
    `Expected status ${expectedStatus} but got ${response.status()}`,
  ).toBe(expectedStatus);
}

async function expectJsonResponse(response) {
  const contentType = response.headers()["content-type"] || "";
  expect(contentType.toLowerCase()).toContain("application/json");
}

async function createIsolatedApiContext(extraHTTPHeaders = {}) {
  return await request.newContext({
    extraHTTPHeaders: {
      Accept: "application/json",
      ...extraHTTPHeaders,
    },
  });
}

// ---------------------------------------------
// SHARED CONTEXTS
// ---------------------------------------------
let apiContext;
let authApiContext;

test.beforeAll(async () => {
  apiContext = await createIsolatedApiContext();

  authApiContext = await createIsolatedApiContext({
    Authorization: "Bearer dummy-token-for-demo",
    "x-api-key": REQRES_API_KEY,
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
  await authApiContext.dispose();
});

// ---------------------------------------------
// BASIC CONTEXT TESTS
// ---------------------------------------------
test.describe("API Context Basics", () => {
  test("should create and use API request context", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
    );

    await expectStatus(response, 200);
    await expectJsonResponse(response);

    const data = await response.json();
    validatePostShape(data);
  });

  test("should create ad hoc context inside a test", async () => {
    const tempContext = await request.newContext({
      extraHTTPHeaders: {
        Accept: "application/json",
        "x-demo-header": "playwright-api-test",
      },
    });

    const response = await tempContext.get(`${BASE_URL_HTTPBIN}/headers`);

    await expectStatus(response, 200);
    const data = await response.json();

    expect(data).toHaveProperty("headers");
    await tempContext.dispose();
  });
});

// ---------------------------------------------
// GET REQUESTS
// ---------------------------------------------
test.describe("GET Requests", () => {
  test("GET single resource", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/users/1`,
    );

    await logResponseDetails(response);
    await expectStatus(response, 200);

    const user = await response.json();
    validateUserShape(user);
    validateEmail(user.email);
  });

  test("GET collection resource", async () => {
    const response = await apiContext.get(`${BASE_URL_JSONPLACEHOLDER}/posts`);

    await expectStatus(response, 200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    validatePostShape(posts[0]);
  });

  test("GET with query parameters using params option", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/comments`,
      {
        params: {
          postId: 1,
        },
      },
    );

    await expectStatus(response, 200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);

    for (const comment of comments) {
      expect(comment.postId).toBe(1);
    }
  });

  test("GET and validate response body as text", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
    );

    await expectStatus(response, 200);

    const text = await response.text();
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('"id": 1');
  });

  test("GET and validate raw response body buffer", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
    );

    await expectStatus(response, 200);

    const bodyBuffer = await response.body();
    expect(bodyBuffer).toBeTruthy();
    expect(bodyBuffer.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------
// POST REQUESTS
// ---------------------------------------------
test.describe("POST Requests", () => {
  test("POST with JSON payload", async () => {
    const payload = {
      title: "Playwright API Testing",
      body: "This is a demo post created during API automation.",
      userId: 101,
    };

    const response = await apiContext.post(
      `${BASE_URL_JSONPLACEHOLDER}/posts`,
      {
        data: payload,
      },
    );

    await expectStatus(response, 201);
    await expectJsonResponse(response);

    const data = await response.json();

    expect(data.title).toBe(payload.title);
    expect(data.body).toBe(payload.body);
    expect(data.userId).toBe(payload.userId);
    expect(data).toHaveProperty("id");
  });

  test("POST with custom headers", async () => {
    const response = await apiContext.post(`${BASE_URL_HTTPBIN}/post`, {
      headers: {
        "x-test-suite": "api-complete-spec",
        "x-test-case": "custom-headers-post",
      },
      data: {
        feature: "headers validation",
      },
    });

    await expectStatus(response, 200);
    const data = await response.json();

    expect(data).toHaveProperty("headers");
    validateHeaderObject(data.headers);
  });

  test("POST using fake auth header context", async () => {
    const response = await authApiContext.post(`${BASE_URL_HTTPBIN}/post`, {
      data: {
        action: "authenticated-demo-request",
      },
    });

    await expectStatus(response, 200);
    const data = await response.json();

    expect(data).toHaveProperty("headers");
    expect(data.headers).toBeTruthy();
  });
});

// ---------------------------------------------
// PUT REQUESTS
// ---------------------------------------------
test.describe("PUT Requests", () => {
  test("PUT full update", async () => {
    const updatedPayload = {
      id: 1,
      title: "Updated Title",
      body: "Updated Body",
      userId: 999,
    };

    const response = await apiContext.put(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
      {
        data: updatedPayload,
      },
    );

    await expectStatus(response, 200);

    const data = await response.json();
    expect(data.id).toBe(1);
    expect(data.title).toBe(updatedPayload.title);
    expect(data.body).toBe(updatedPayload.body);
    expect(data.userId).toBe(updatedPayload.userId);
  });
});

// ---------------------------------------------
// PATCH REQUESTS
// ---------------------------------------------
test.describe("PATCH Requests", () => {
  test("PATCH partial update", async () => {
    const response = await apiContext.patch(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
      {
        data: {
          title: "Partially Updated Title",
        },
      },
    );

    await expectStatus(response, 200);

    const data = await response.json();
    expect(data.id).toBe(1);
    expect(data.title).toBe("Partially Updated Title");
  });
});

// ---------------------------------------------
// DELETE REQUESTS
// ---------------------------------------------
test.describe("DELETE Requests", () => {
  test("DELETE resource", async () => {
    const response = await apiContext.delete(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
    );

    // jsonplaceholder returns 200 for delete mock
    await expectStatus(response, 200);
  });
});

// ---------------------------------------------
// HEAD REQUESTS
// ---------------------------------------------
test.describe("HEAD Requests", () => {
  test("HEAD request should validate metadata without full body need", async () => {
    const response = await apiContext.head(`${BASE_URL_HTTPBIN}/get`);

    await expectStatus(response, 200);

    const headers = response.headers();
    validateHeaderObject(headers);
  });
});

// ---------------------------------------------
// GENERIC FETCH REQUEST
// ---------------------------------------------
test.describe("Generic fetch()", () => {
  test("fetch() with GET", async () => {
    const response = await apiContext.fetch(
      `${BASE_URL_JSONPLACEHOLDER}/posts/2`,
      {
        method: "GET",
      },
    );

    await expectStatus(response, 200);

    const data = await response.json();
    validatePostShape(data);
    expect(data.id).toBe(2);
  });

  test("fetch() with custom method and headers", async () => {
    const response = await apiContext.fetch(`${BASE_URL_HTTPBIN}/anything`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-custom-fetch": "true",
      },
      data: {
        source: "playwright-fetch",
      },
    });

    await expectStatus(response, 200);
    const data = await response.json();

    expect(data.method).toBe("POST");
  });
});

// ---------------------------------------------
// RESPONSE VALIDATION METHODS
// ---------------------------------------------
test.describe("Response Methods", () => {
  test("validate ok(), status(), statusText(), headers()", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/3`,
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);
    expect(typeof response.statusText()).toBe("string");

    const headers = response.headers();
    validateHeaderObject(headers);

    const contentType = headers["content-type"] || "";
    expect(contentType).toContain("application/json");
  });

  test("validate headerValue()", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/4`,
    );

    const contentType = await response.headerValue("content-type");
    expect(contentType).toContain("application/json");
  });
});

// ---------------------------------------------
// NEGATIVE TESTING
// ---------------------------------------------
test.describe("Negative API Testing", () => {
  test("GET non-existing resource should return 404 or empty-like response based on API behavior", async () => {
    const response = await apiContext.get(
      `${BASE_URL_REQRES}/api/users/99999`,
      {
        headers: {
          "x-api-key": REQRES_API_KEY,
        },
      },
    );

    expect([404, 200]).toContain(response.status());

    if (response.status() === 404) {
      expect(response.ok()).toBe(false);
    }
  });

  test("POST invalid endpoint should fail", async () => {
    const response = await apiContext.post(`${BASE_URL_HTTPBIN}/status/404`, {
      data: { test: true },
    });

    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
  });

  test("send invalid data type shape and verify server response exists", async () => {
    const response = await apiContext.post(`${BASE_URL_HTTPBIN}/post`, {
      data: "plain string instead of object",
    });

    await expectStatus(response, 200);

    const data = await response.json();
    expect(data).toBeTruthy();
  });
});

// ---------------------------------------------
// AUTHENTICATION STYLE TESTS
// ---------------------------------------------
test.describe("Authentication Patterns", () => {
  test("send bearer token via headers", async () => {
    const token = "demo-bearer-token";

    const response = await apiContext.get(`${BASE_URL_HTTPBIN}/bearer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // httpbin /bearer behavior may vary by environment/proxy,
    // but generally it validates bearer auth.
    expect([200, 401]).toContain(response.status());

    if (response.status() === 200) {
      const data = await response.json();
      expect(data.authenticated).toBe(true);
      expect(data.token).toBe(token);
    }
  });

  test("basic auth style with http credentials via newContext", async () => {
    const basicAuthContext = await request.newContext({
      httpCredentials: {
        username: "user",
        password: "passwd",
      },
    });

    const response = await basicAuthContext.get(
      `${BASE_URL_HTTPBIN}/basic-auth/user/passwd`,
    );

    expect([200, 401]).toContain(response.status());

    if (response.status() === 200) {
      const data = await response.json();
      expect(data.authenticated).toBe(true);
      expect(data.user).toBe("user");
    }

    await basicAuthContext.dispose();
  });
});

// ---------------------------------------------
// FORM AND ENCODED DATA PATTERNS
// ---------------------------------------------
test.describe("Request Payload Styles", () => {
  test("POST form-like data", async () => {
    const response = await apiContext.post(`${BASE_URL_HTTPBIN}/post`, {
      form: {
        username: "demo_user",
        password: "demo_pass",
      },
    });

    await expectStatus(response, 200);

    const data = await response.json();
    expect(data).toHaveProperty("form");
    expect(data.form.username).toBe("demo_user");
    expect(data.form.password).toBe("demo_pass");
  });
});

// ---------------------------------------------
// QUERY PARAMS + HEADER VALIDATION
// ---------------------------------------------
test.describe("Headers and Params Validation", () => {
  test("GET with multiple query params", async () => {
    const response = await apiContext.get(`${BASE_URL_HTTPBIN}/get`, {
      params: {
        page: 2,
        limit: 10,
        search: "playwright",
      },
      headers: {
        "x-search-type": "api-demo",
      },
    });

    await expectStatus(response, 200);

    const data = await response.json();

    expect(data.args.page).toBe("2");
    expect(data.args.limit).toBe("10");
    expect(data.args.search).toBe("playwright");
    expect(data.headers).toBeTruthy();
  });
});

// ---------------------------------------------
// CHAINED API TESTING
// ---------------------------------------------
test.describe("Chained API Scenarios", () => {
  test("GET list then validate a specific item", async () => {
    const listResponse = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/users`,
    );
    await expectStatus(listResponse, 200);

    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);

    const firstUserId = users[0].id;
    expect(typeof firstUserId).toBe("number");

    const singleResponse = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/users/${firstUserId}`,
    );
    await expectStatus(singleResponse, 200);

    const singleUser = await singleResponse.json();
    validateUserShape(singleUser);
    expect(singleUser.id).toBe(firstUserId);
  });
});

// ---------------------------------------------
// SCHEMA-LIKE VALIDATION EXAMPLE
// ---------------------------------------------
test.describe("Schema-like Validation", () => {
  test("validate response structure manually using helper", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/5`,
    );
    await expectStatus(response, 200);

    const post = await response.json();
    validatePostShape(post);
  });

  test("validate users list structure", async () => {
    const response = await apiContext.get(`${BASE_URL_JSONPLACEHOLDER}/users`);
    await expectStatus(response, 200);

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);

    for (const user of users) {
      validateUserShape(user);
    }
  });
});

// ---------------------------------------------
// TIMEOUT AND RETRY STYLE PATTERN
// ---------------------------------------------
test.describe("Timeout and Request Options", () => {
  test("request with timeout option", async () => {
    const response = await apiContext.get(
      `${BASE_URL_JSONPLACEHOLDER}/posts/1`,
      {
        timeout: 10000,
      },
    );

    await expectStatus(response, 200);
  });

  test("request with failOnStatusCode false style behavior", async () => {
    const response = await apiContext.get(`${BASE_URL_HTTPBIN}/status/418`, {
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(418);
    expect(response.ok()).toBe(false);

    const text = await response.text();
    expect(typeof text).toBe("string");
  });
});

// ---------------------------------------------
// FULL PRACTICAL API SCENARIO
// ---------------------------------------------
test.describe("End-to-End API Style Scenario", () => {
  test("create-like update-like delete-like scenario using mock API", async () => {
    // Step 1: Create
    const createResponse = await apiContext.post(
      `${BASE_URL_JSONPLACEHOLDER}/posts`,
      {
        data: {
          title: "New Resource",
          body: "Created in API e2e demo",
          userId: 55,
        },
      },
    );

    await expectStatus(createResponse, 201);
    const created = await createResponse.json();

    expect(created.title).toBe("New Resource");
    expect(created.userId).toBe(55);
    expect(created).toHaveProperty("id");

    const createdId = created.id;

    // Step 2: Update
    const updateResponse = await apiContext.put(
      `${BASE_URL_JSONPLACEHOLDER}/posts/${createdId}`,
      {
        data: {
          id: createdId,
          title: "Updated Resource",
          body: "Updated body",
          userId: 55,
        },
      },
    );

    await expectStatus(updateResponse, 200);
    const updated = await updateResponse.json();

    expect(updated.title).toBe("Updated Resource");
    expect(updated.body).toBe("Updated body");

    // Step 3: Partial update
    const patchResponse = await apiContext.patch(
      `${BASE_URL_JSONPLACEHOLDER}/posts/${createdId}`,
      {
        data: {
          title: "Patched Resource",
        },
      },
    );

    await expectStatus(patchResponse, 200);
    const patched = await patchResponse.json();

    expect(patched.title).toBe("Patched Resource");

    // Step 4: Delete
    const deleteResponse = await apiContext.delete(
      `${BASE_URL_JSONPLACEHOLDER}/posts/${createdId}`,
    );
    await expectStatus(deleteResponse, 200);
  });
});
