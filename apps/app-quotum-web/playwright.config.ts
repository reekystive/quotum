import { defineConfig } from '@playwright/test';

export default defineConfig({
  // look for test files in the "tests" directory, relative to this configuration file
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], [process.env.CI ? 'github' : 'null'], ['html', { open: 'never' }]],
  use: {
    // base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:9100',
    // collect trace when retrying the failed test
    trace: 'on-first-retry',
  },
  // run local server before starting the tests
  webServer: {
    command: 'pnpm run preview --port 9100',
    url: 'http://localhost:9100',
    reuseExistingServer: !process.env.CI,
  },
});
