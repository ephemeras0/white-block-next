export const isProd = !import.meta.env.DEV

// ------------------------------------------------------- static -----------------------------------------------------
export const VUE_RUNTIME_URL =
  'https://cdn.jsdelivr.net/npm/@vue/runtime-dom/dist/runtime-dom.esm-browser.js'
export const VUE_RUNTIME_PROD_URL =
  'https://cdn.jsdelivr.net/npm/@vue/runtime-dom/dist/runtime-dom.esm-browser.prod.js'
export const VUE_SERVER_RENDER_URL =
  'https://cdn.jsdelivr.net/npm/@vue/server-renderer/dist/server-renderer.esm-browser.js'

export const WHITE_BLOCK_URL = isProd
  ? 'https://cdn.jsdelivr.net/npm/white-block@0.0.17/dist/es/index.mjs'
  : './white-block.js'
export const WHITE_BLOCK_CSS_URL = isProd
  ? 'https://cdn.jsdelivr.net/npm/white-block@0.0.17/dist/styles/index.css'
  : './white-block.css'

// ------------------------------------------------------- files -----------------------------------------------------
export const IMPORT_MAP_FILE = 'import-map.json'
export const IMPORT_MAP_FILE_CONTENT = `
{
  "imports": {
    "vue": "${VUE_RUNTIME_URL}",
    "vue/server-renderer": "${VUE_SERVER_RENDER_URL}",
    "white-block": "${WHITE_BLOCK_URL}"
  },
  "scope": {}
}`

export const TSCONFIG_FILE = 'tsconfig.json'
export const TSCONFIG_FILE_CONTENT = `
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "allowImportingTsExtensions": true,
    "allowJs": true,
    "checkJs": true
  },
  "vueCompilerOptions": {
    "target": 3.3
  }
}`

export const APP_MAIN_FILE = 'src/AppMain.vue'
export const APP_MAIN_FILE_CONTENT = `
<script setup>
import App from './App.vue'
import { appendStyle, install } from './dependencies.js'

appendStyle()
install()
</script>

<template>
  <App />
</template>
`
export const DEPENDENCIES_FILE = 'src/dependencies.js'
export const DEPENDENCIES_FILE_CONTENT = `
import WhiteBlock from 'white-block'
import { getCurrentInstance } from 'vue'

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const style = document.createElement('style')
    style.innerHTML = \`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body, #app {
        width: 100%;
        height: 100%;
      }
      #app {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    \`
    document.head.appendChild(style)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '${WHITE_BLOCK_CSS_URL}'
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}

export function install() {
  const parentRootClasses = window.parent.document.documentElement.getAttribute('class') || ''
  document.documentElement.setAttribute('class', parentRootClasses)

  window.addEventListener('message', ({ data }) => {
    if (data.action === 'theme-change') {
      document.documentElement.setAttribute('class', data.value)
    }
  })

  document.addEventListener('click', () => {
    window.parent.document.dispatchEvent(new Event('click'))
  })

  const instance = getCurrentInstance()
  instance.appContext.app.use(WhiteBlock)
}
  `

export const APP_FILE = 'src/App.vue'
export const APP_FILE_CONTENT = `
<template>
  <wb-button>{{ msg }}</wb-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Try it')
</script>
`
export const MAIN_FILE = 'src/main.ts'
export const MAIN_FILE_CONTENT = `
import { createApp  } from 'vue'
import WhiteBlock from 'white-block'
import App from './App.vue'

const style = document.createElement('style')
style.innerHTML = \`
  html, body, #app {
    width: 100%;
    height: 100%;
  }
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
  }
\`
document.head.appendChild(style)

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '${WHITE_BLOCK_CSS_URL}'
document.head.appendChild(link)

const parentRootClasses = window.parent.document.documentElement.getAttribute('class') || ''
document.documentElement.setAttribute('class', parentRootClasses)

window.addEventListener('message', ({ data }) => {
  if (data.action === 'theme') {
    document.documentElement.setAttribute('class', data.value)
  }
})

document.addEventListener('click', () => {
  window.parent.document.dispatchEvent(new Event('click'))
})

createApp(App)
  .use(WhiteBlock)
  .mount('#app')
  `

export const TEMPLATE_FILE_CONTENT = `\
<template>
  <div>Comp</div>
</template>

<script setup lang="ts">
</script>
`

// ------------------------------------------------------ config -----------------------------------------------------
export const TEMPLATE_CONFIG = {
  newSFC: TEMPLATE_FILE_CONTENT
}

export const DEFAULT_FILES = [
  // {
  //   name: TSCONFIG_FILE,
  //   code: TSCONFIG_FILE_CONTENT,
  //   hidden: false
  // },
  // {
  //   name: IMPORT_MAP_FILE,
  //   code: IMPORT_MAP_FILE_CONTENT,
  //   hidden: false
  // },
  {
    name: DEPENDENCIES_FILE,
    code: DEPENDENCIES_FILE_CONTENT,
    hidden: isProd
  },
  {
    name: APP_FILE,
    code: APP_FILE_CONTENT,
    hidden: false
  },
  {
    name: APP_MAIN_FILE,
    code: APP_MAIN_FILE_CONTENT,
    hidden: false
  }
]

export const PREVIEW_OPTIONS = {
  headHTML: `
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-uno.global.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-wind.global.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-attributify.global.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/transformer-attributify-jsx/dist/index.mjs"><\/script>
    <script>
      window.__unocss = {
        rules: [],
        presets: [
          () => window.__unocss_runtime.presets.presetUno({}),
          () => window.__unocss_runtime.presets.presetWind({}),
          () => window.__unocss_runtime.presets.presetIcons({
            cdn: 'https://esm.sh/'
          }),
          () => window.__unocss_runtime.presets.presetAttributify({
            trueToNonValued: true
          })
        ],
        transformers: [
          () => window.__unocss__runtime.transformer.transformerAttributifyJsx()
        ]
      }
    <\/script>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"><\/script>
  `
}

export const HIDDEN_FILES = [DEPENDENCIES_FILE, APP_MAIN_FILE]
export const PRIORITY_FILES = [
  // TSCONFIG_FILE,
  IMPORT_MAP_FILE,
  APP_MAIN_FILE
]

export const DOWNLOAD_EXCLUDES_FILES = [
  IMPORT_MAP_FILE,
  MAIN_FILE.replace('src/', '')
]
