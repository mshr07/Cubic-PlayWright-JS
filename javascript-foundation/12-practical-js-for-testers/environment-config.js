// Topic: environment config basics

export const environmentConfig = {
  baseUrl: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
  browser: process.env.DEFAULT_BROWSER || 'chromium'
};

