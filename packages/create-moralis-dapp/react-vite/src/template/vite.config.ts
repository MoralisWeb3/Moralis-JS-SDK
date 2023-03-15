import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@moralisweb3/react', 'moralis'],
  },
  build: {
    commonjsOptions: {
      include: [
        // We require this to make this demo working with @moralisweb3/react in the monorepo
        /react\/\lib/,
        /node_modules/,
      ],
    },
  },
  define: {
    'process.env': {},
    global: {},
  },
});
