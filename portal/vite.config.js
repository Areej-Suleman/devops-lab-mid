import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/devops-lab-mid/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    reporters: ['default', 'json'],
    outputFile: './test-results.json'
  }
})