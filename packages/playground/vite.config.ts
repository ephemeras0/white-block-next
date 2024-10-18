import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { copyFileSync } from 'fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig, Plugin, Alias } from 'vite'
import { version } from './package.json'

function toPath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}
function copyDependencies(): Plugin {
  return {
    name: 'copy-dependencies',

    buildStart() {
      copyFileSync(
        toPath('../core/dist/es/components/index.js'),
        toPath('./public/white-block.js')
      )
      copyFileSync(
        toPath('../core/dist/styles/index.css'),
        toPath('./public/white-block.css')
      )
    }
  }
}

const alias: Alias[] = [
  { find: '@/', replacement: `${resolve(__dirname, '../core/src')}/` }
]
if (process.env.NODE_ENV !== 'production') {
  alias.push({
    find: /^white-block$/,
    replacement: resolve(__dirname, '../core/src/index.ts')
  })
}

export default defineConfig({
  define: { __VERSION__: JSON.stringify(version) },
  base: './',
  resolve: {
    alias
  },
  plugins: [Unocss(), vue(), vueJSX(), copyDependencies()],
  optimizeDeps: {
    exclude: ['@vue/repl']
  },
  build: {
    emptyOutDir: true,
    outDir: '../../docs/.vitepress/dist/playground'
  }
})
