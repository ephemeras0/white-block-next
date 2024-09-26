import vueJSX from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import type { Alias } from 'vite'
import { defineConfig } from 'vite'
import { version } from './package.json'

const alias: Alias[] = [
  { find: '~/', replacement: `${resolve(__dirname, './.vitepress')}/` },
  { find: '@/', replacement: `${resolve(__dirname, '../packages/core/src')}/` }
]

if (process.env.NODE_ENV !== 'production') {
  alias.push({
    find: /^white-block$/,
    replacement: resolve(__dirname, '../packages/core/src/index.ts')
  })
  alias.unshift({
    find: /^@white-block\/types$/,
    replacement: resolve(__dirname, '../packages/types/src/index.ts')
  })
}

export default defineConfig({
  define: { __VERSION__: JSON.stringify(version) },
  resolve: {
    alias
  },
  plugins: [UnoCSS() as any, vueJSX()],
  optimizeDeps: {
    exclude: ['vitepress']
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      overlay: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          'white-block': ['white-block', '@white-block/types']
        }
      }
    },
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false,
    sourcemap: false
  }
})
