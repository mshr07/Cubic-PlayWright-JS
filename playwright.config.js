import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiPort = Number(process.env.PLAYWRIGHT_PORT || 3000);
const uiBaseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${uiPort}`;
const apiPort = Number(process.env.API_TESTING_PORT || 3100);
const apiBaseURL = process.env.API_TESTING_BASE_URL || `http://127.0.0.1:${apiPort}`;

const sharedUiUse = {
  baseURL: uiBaseURL,
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
};

export default defineConfig({
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(__dirname, 'reports/html'), open: 'never' }]
  ],
  outputDir: path.join(__dirname, 'reports/test-results'),
  webServer: [
    {
      command: 'node playwright-topic-suites/local-app/server.js',
      url: uiBaseURL,
      cwd: __dirname,
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'node api-testing-suites/local-api/server.js',
      url: `${apiBaseURL}/health`,
      cwd: __dirname,
      reuseExistingServer: !process.env.CI
    }
  ],
  projects: [
    {
      name: 'chromium',
      testDir: path.join(__dirname, 'playwright-topic-suites/tests'),
      use: {
        ...devices['Desktop Chrome'],
        ...sharedUiUse
      }
    },
    {
      name: 'firefox',
      testDir: path.join(__dirname, 'playwright-topic-suites/tests'),
      use: {
        ...devices['Desktop Firefox'],
        ...sharedUiUse
      }
    },
    {
      name: 'webkit',
      testDir: path.join(__dirname, 'playwright-topic-suites/tests'),
      use: {
        ...devices['Desktop Safari'],
        ...sharedUiUse
      }
    },
    {
      name: 'api',
      testDir: path.join(__dirname, 'api-testing-suites/tests'),
      use: {
        baseURL: apiBaseURL,
        extraHTTPHeaders: {
          'X-Training-Suite': 'api-testing-suites'
        }
      }
    }
  ]
});

