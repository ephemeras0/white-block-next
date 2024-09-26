/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { version } from './package.json'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(version)
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${resolve(__dirname, 'src')}/`
      }
    ]
  },
  plugins: [Unocss(), vue(), vueJSX()],
  build: {
    sourcemap: true,
    emptyOutDir: false,
    minify: false,
    cssMinify: false,
    lib: {
      entry: 'src/index.ts'
    },
    rollupOptions: {
      output: [
        {
          dir: 'dist',
          format: 'es',
          assetFileNames: 'styles/components/index.css',
          entryFileNames: `es/components/index.js`,
          chunkFileNames: `es/_chunks/components/dep-[hash].js`,
          exports: 'named'
        }
      ],
      external: ['vue']
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src', 'src/**/*.tsx'],
      exclude: [
        'src/index.ts',
        'src/components/index.ts',
        'src/components/*/index.ts',
        'src/components/*/api.*.ts'
      ]
    }
  }
})
