export const isProd = !import.meta.env.DEV

export async function getPkgVersion(pkg: string) {
  const response: any = await fetch(
    `https://data.jsdelivr.com/v1/package/npm/${pkg}`
  )
  const res = await response.json()
  return res.versions
}

export function getCdnLink(
  pkg: string,
  version: string | undefined,
  path: string
) {
  const VERSION = version ? `@${version}` : ''
  return `https://cdn.jsdelivr.net/npm/${pkg}${VERSION}${path}`
}

export interface Dependency {
  pkg?: string
  version?: string
  path: string
}
export function getImportMap(versions: any) {
  return {
    imports: {
      'vue': getCdnLink(
        '@vue/runtime-dom',
        versions.vue,
        '/dist/runtime-dom.esm-browser.js'
      ),
      'white-block':
        !isProd && !versions.wb
          ? './white-block.js'
          : getCdnLink('white-block', versions.wb, '/dist/es/index.mjs')
      // 'white-block/': getCdnLink('white-block', versions.wb, '/')
    }
  }
}

export function getDependeciesFile(version: string) {
  return `
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
    link.href = '${!isProd && !version ? './white-block.css' : `https://cdn.jsdelivr.net/npm/white-block@${version}/dist/styles/index.css'`}
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
}
