import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
      customDomId: 'svg-sprite',
      svgoOptions: {
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
        ]
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
