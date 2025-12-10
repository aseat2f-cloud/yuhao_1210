
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Declare process to fix TS error in config
declare const process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Polyfill process.env for the existing code structure
    define: {
      'process.env': env
    }
  }
})
