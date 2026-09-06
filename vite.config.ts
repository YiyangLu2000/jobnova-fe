import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
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
})
