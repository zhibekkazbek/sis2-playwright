import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: isCI
    ? [
        ['list'],
        ['blob'],
        ['junit', { outputFile: 'reports/junit.xml' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
      ],

  use: {
    baseURL:
      process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: isCI ? 'on' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});