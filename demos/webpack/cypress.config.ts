import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9753/demos/webpack/public/',
    video: false,
  },
});
