// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        private: './private.html',
        business: './business.html',
        contract: './contract.html',
        payment: './payment.html',
        wifi: './wifi.html',
        quality: './quality.html',
        iptv: './iptv.html',
      }
    }
  }
})