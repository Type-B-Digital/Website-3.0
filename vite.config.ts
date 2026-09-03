import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  /**
   * Project Pages serve from `/<repo>/`, not the domain root, so asset URLs
   * need that prefix baked in. Set `BASE_PATH` in CI; local dev leaves it
   * unset and serves from `/`.
   */
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
