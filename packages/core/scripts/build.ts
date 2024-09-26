import { fileURLToPath, resolve } from 'node:url'
import { copyFile, rename } from 'node:fs/promises'
import { build } from 'vite'
import type { SupportFormat } from './vite'
import { getBundleConfig, getComponentEntries } from './vite'

async function run() {
  const BUILD_FORMATS: SupportFormat[] = ['es', 'cjs']
  for (const format of BUILD_FORMATS) {
    // all & utils & composables
    const BUILD_MODULES = [
      { entry: 'src/index.ts', module: 'components' },
      { entry: 'src/utils/index.ts', module: 'utils' },
      { entry: 'src/composables/index.ts', module: 'composables' }
    ]
    for (const item of BUILD_MODULES) {
      const config = getBundleConfig(item.entry, {
        format,
        module: item.module
      })
      await build(config)
    }

    // components
    const components = getComponentEntries()
    for (const component in components) {
      const compConfig = getBundleConfig(
        `src/components/${component}/index.ts`,
        {
          format,
          module: component,
          isComponent: true
        }
      )
      await build(compConfig)
    }
  }
  await copyFile(
    resolve(fileURLToPath(import.meta.url), '../src/components/styles.css'),
    resolve(fileURLToPath(import.meta.url), '../dist/styles/base.css')
  )
  await rename(
    resolve(
      fileURLToPath(import.meta.url),
      '../dist/styles/components/index.css'
    ),
    resolve(fileURLToPath(import.meta.url), '../dist/styles/index.css')
  )
}

run()
