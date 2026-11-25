import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Run independent API tests in parallel
    fullyParallel: true,

    // Prevent accidental test.only from being pushed to CI
    forbidOnly: !!process.env.CI,

    // Retry failed tests only in CI
    retries: process.env.CI ? 2 : 0,

    // Use one worker in CI for predictable execution
    ...(process.env.CI ? { workers: 1 } : {}),

    // Generate an HTML test report
    reporter: 'html',

    use: {
        // Read API base URL from environment variables
        baseURL: process.env.API_BASE_URL || 'https://dummyjson.com',
    },
});
