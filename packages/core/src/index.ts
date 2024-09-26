import 'virtual:uno.css'
import type { App } from 'vue'
import * as components from './components'
import './components/styles.css'

export * from './components'
export * from './composables'
export * from './utils'

export function install(app: App): void {
  for (const key in components) {
    const component = components[key]
    if (component.install) {
      app.use(component)
    }
  }
}

export default {
  install,
  version: __VERSION__
}
