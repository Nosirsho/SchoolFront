import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  //раскоментировать при запуске в docker
  // server: {
  //   watch: {
  //     usePolling: true
  //   },
  //   host: true,
  //   strictPort: true,
  //   port: 5173
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '&': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  }
})
