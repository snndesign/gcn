// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        private: path.resolve(__dirname, 'private.html'),
        business: path.resolve(__dirname, 'business.html'),
        contract: path.resolve(__dirname, 'contract.html'),
        payment: path.resolve(__dirname, 'payment.html'),
        wifi: path.resolve(__dirname, 'wifi.html'),
        quality: path.resolve(__dirname, 'quality.html'),
        iptv: path.resolve(__dirname, 'iptv.html'),
      }
    }
  }
})