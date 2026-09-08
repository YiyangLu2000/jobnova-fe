import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project at /jobnova-fe/; dev stays at root.
  base: command === 'build' ? '/jobnova-fe/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/components': r('./src/components'),
      '@/hooks': r('./src/hooks'),
      '@/lib': r('./src/lib'),
      '@/types': r('./src/types'),
      '@': r('./src'),
    },
  },
}))
