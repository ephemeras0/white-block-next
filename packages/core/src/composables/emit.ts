import { getCurrentInstance } from 'vue'
import { pascal, title } from 'radash'

/**
 * Handle action by emits or props.
 *
 * Usage:
 *
 *```
 * const propEmits = usePropEmits()
 * propEmits('click', payload)
 */
export function usePropEmits() {
  const instance = getCurrentInstance()

  return function (action: string, ...params: any[]) {
    const propsEmitName = `on${pascal(title(action))}`
    if (instance?.props[propsEmitName]) {
      ;(instance?.props[propsEmitName] as any)?.(...params)
    } else {
      instance?.emit(action, ...params)
    }
  }
}
