import { compileFile, File, Repl, useStore, type ImportMap } from '@vue/repl'
import { computed, reactive, toRefs } from 'vue'
import type { VersionKey } from '../types'
import { getCdnLink, getDependenciesFile, getImportMap } from '../utils'
import {
  APP_FILE,
  APP_MAIN_FILE,
  DEFAULT_FILES,
  DEFAULT_VERSION_TYPESCRIPT,
  DEFAULT_VERSION_VUE,
  DEPENDENCIES_FILE,
  PRIORITY_FILES,
  TEMPLATE_CONFIG
} from './constant'

const query = new URLSearchParams(window.location.search)

const versions = reactive<Record<VersionKey, string>>({
  vue: '',
  wb: '',
  typescript: ''
})
const builtinImportMap = computed<ImportMap>(() => getImportMap(versions))

const store = useStore(
  toRefs(
    reactive({
      builtinImportMap,
      mainFile: APP_MAIN_FILE,
      activeFilename: APP_MAIN_FILE,
      vueVersion: DEFAULT_VERSION_VUE,
      typescriptVersion: DEFAULT_VERSION_TYPESCRIPT,
      template: TEMPLATE_CONFIG,
      showOutput: query.has('showOutput')
    } as any)
  ),
  window.location.hash
)

for (const item of DEFAULT_FILES) {
  if (PRIORITY_FILES.includes(item.name) || !store.files[item.name]) {
    store.addFile(new File(item.name, item.code, item.hidden))
  }
}

async function setVersion(key: any, version: string) {
  switch (key) {
    case 'vue':
      store.compiler = await import(
        /* @vite-ignore */
        getCdnLink(
          '@vue/compiler-sfc',
          version,
          '/dist/compiler-sfc.esm-browser.js'
        )
      )
      versions.vue = version
      store.vueVersion = version
      store.setActive(APP_FILE)
      break
    case 'white-block':
      versions.wb = version
      store.files[DEPENDENCIES_FILE].code = getDependenciesFile(version)
      compileFile(store, store.files[DEPENDENCIES_FILE]).then(
        // eslint-disable-next-line no-return-assign
        errs => (store.errors = errs)
      )
      break
    case 'typescript':
      versions.typescript = version
      store.typescriptVersion = version
      break
  }
}

export { Repl, store, setVersion }
