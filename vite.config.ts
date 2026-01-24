import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import expressPlugin from './express-plugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), expressPlugin()],
});
