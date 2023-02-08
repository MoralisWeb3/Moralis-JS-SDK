import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@moralisweb3/react'],
  },
  define: {
    'process.env': {},
    global: {},
  },
});
