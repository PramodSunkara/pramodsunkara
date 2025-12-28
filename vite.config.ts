import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pramodsunkara/', // 🔴 THIS MUST MATCH REPO NAME
})
