import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: '.qa/test-results',
  use: { baseURL: 'http://localhost:4173', channel: 'chrome', headless: true },
  webServer: { command: 'node server.js', url: 'http://localhost:4173', reuseExistingServer: true },
});
