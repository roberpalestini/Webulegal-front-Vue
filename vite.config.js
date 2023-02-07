import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),

  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],

  },
  build: {
    rollupOptions: {
      external: "tinymce/tinymce-vue"
    }
  },
}
)
