import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NETLIFY ? '/' : '/lavyoga.com/',
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./chi-sono.html', import.meta.url)),
        courses: fileURLToPath(new URL('./corsi.html', import.meta.url)),
      },
    },
  },
})
