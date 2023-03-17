import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9753/e2e/webpack/public/',
    video: false,
  },
});
