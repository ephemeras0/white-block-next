import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { fileURLToPath, resolve } from 'node:url'
import type { ModuleFormat, WatcherOptions } from 'rollup'
import Unocss from 'unocss/vite'
import type { UserConfig } from 'vite'
import { version } from '../package.json'

export { ModuleFormat }

export function getComponentEntries() {
  const components = glob.sync(['src/components/*/index.ts'])
  const regex = /^src\/components\/(.+)\/index\.ts$/
  const result: Record<string, string> = {}

  for (const file of components) {
    const match = file.match(regex)
    if (match) {
      result[match[1]] = file
    }
  }
  return result
}

export type SupportFormat = 'cjs' | 'es'
const FORMAT_DIR_MAP: Record<SupportFormat, { dir: string; ext: string }> = {
  cjs: { dir: 'lib', ext: 'cjs' },
  es: { dir: 'es', ext: 'js' }
}

const plugins = [Unocss(), vue(), vueJSX()]
export interface GetBundleConfigOptions {
  module?: string
  isComponent?: boolean
  format: SupportFormat
  sourcemap?: boolean
  watch?: WatcherOptions
  minify?: boolean
  cssMinify?: boolean
}
export function getBundleConfig(
  entry: string,
  options: GetBundleConfigOptions
) {
  const {
    module: moduleName,
    isComponent = false,
    format,
    sourcemap = true,
    watch = false,
    minify = false,
    cssMinify = false
  } = options
  const { dir, ext } = FORMAT_DIR_MAP[format]
  const jsExt = minify ? `min.${ext}` : ext
  const cssExt = cssMinify ? 'min.css' : 'css'

  const outputFileNames = isComponent
    ? `components/${moduleName}/index.${jsExt}`
    : `${moduleName}/index.${jsExt}`
  const outputAssetFileNames = isComponent
    ? `components/${moduleName}.${cssExt}`
    : `${moduleName}/index.${cssExt}`

  return {
    define: {
      __VERSION__: JSON.stringify(version)
    },
    configFile: false,
    plugins,
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: `${resolve(fileURLToPath(import.meta.url), '../src')}/`
        }
      ]
    },
    build: {
      emptyOutDir: false,
      minify,
      cssMinify,
      sourcemap,
      watch,
      lib: { entry },
      rollupOptions: {
        output: [
          {
            // banner,
            dir: 'dist',
            format,
            assetFileNames: `styles/${outputAssetFileNames}`,
            entryFileNames: `${dir}/${outputFileNames}`,
            chunkFileNames: `${dir}/_chunks/${moduleName}/dep-[hash].${jsExt}`
          }
        ],
        external: ['vue']
      }
    }
  } as UserConfig
}
