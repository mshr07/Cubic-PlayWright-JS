import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.API_TESTING_PORT || 3100);
const baseURL = process.env.API_TESTING_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  timeout: 30_000,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(__dirname, 'reports/html'), open: 'never' }]
  ],
  outputDir: path.join(__dirname, 'reports/test-results'),
  use: {
    baseURL,
    extraHTTPHeaders: {
      'X-Training-Suite': 'api-testing-suites'
    }
  },
  webServer: {
    command: 'node api-testing-suites/local-api/server.js',
    url: `${baseURL}/health`,
    cwd: path.resolve(__dirname, '..'),
    reuseExistingServer: !process.env.CI
  }
});

