import {
  File,
  Repl,
  useStore,
  compileFile,
  mergeImportMap,
  type StoreState,
  type ImportMap
} from '@vue/repl'
import { reactive, toRefs, watch, watchEffect, computed, ref } from 'vue'
import {
  APP_FILE,
  DEFAULT_FILES,
  APP_MAIN_FILE,
  PRIORITY_FILES,
  HIDDEN_FILES,
  TEMPLATE_CONFIG,
  DEPENDENCIES_FILE
} from './constant'
import { getCdnLink, getImportMap, getDependeciesFile } from '../utils'

const query = new URLSearchParams(location.search)

const files: Record<string, File> = {}
for (const item of DEFAULT_FILES) {
  files[item.name] = new File(item.name, item.code, item.hidden)
}

export type VersionKey = 'vue' | 'wb' | 'typescript'
const versions = reactive<Record<VersionKey, string>>({
  vue: '',
  wb: '',
  typescript: ''
})
const builtinImportMap = computed<ImportMap>(() => getImportMap(versions))

const store = useStore(
  toRefs(
    reactive({
      // files,
      builtinImportMap,
      vueVersion: 'latest',
      mainFile: APP_MAIN_FILE,
      activeFilename: APP_MAIN_FILE,
      template: TEMPLATE_CONFIG,
      typescriptVersion: 'latest',
      showOutput: query.has('showOutput')
    } as any)
  ),
  location.hash
)

for (const item of DEFAULT_FILES) {
  if (PRIORITY_FILES.includes(item.name) || !store.files[item.name]) {
    store.addFile(new File(item.name, item.code, item.hidden))
  }
}

watch(
  () => store.loading,
  loading => {
    if (!loading) {
      store.setActive(APP_FILE)
      for (const file of HIDDEN_FILES) {
        store.files[file].hidden = true
      }
    }
  }
)

watchEffect(() => history.replaceState({}, '', store.serialize()))

async function setVueVersion(version: string) {
  store.compiler = await import(
    getCdnLink(
      '@vue/compiler-sfc',
      version,
      '/dist/compiler-sfc.esm-browser.js'
    )
  )
  versions.vue = version
  store.vueVersion = version
}
function setVersion(key: any, version: string) {
  switch (key) {
    case 'vue':
      setVueVersion(version)
      break
    case 'white-block':
      versions.wb = version
      store.files[DEPENDENCIES_FILE].code = getDependeciesFile(version)
      compileFile(store, store.files[DEPENDENCIES_FILE]).then(
        errs => (store.errors = errs)
      )
      break
    case 'typescript':
      store.typescriptVersion = version
      break
  }
}

watch(
  () => [store.typescriptVersion, store.vueVersion],
  () => store.reloadLanguageTools?.(),
  { deep: true }
)

export { Repl, store, setVersion }
