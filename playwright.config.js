// @ts-check
const { defineConfig } = require('@playwright/test')
require('dotenv').config()


module.exports = defineConfig({
  testDir: './tests',
  timeout: 50 * 1000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  headless:false,
  use: {
    trace: 'on-first-retry',
  },
  name: 'chromium',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        //headless:true,
        testIdAttribute: "data-test-id",
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        baseURL: process.env.URL
      }
    }
  ]
});

