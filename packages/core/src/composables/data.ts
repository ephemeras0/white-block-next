import { ref } from 'vue'
import type { Ref } from 'vue'

export function useState<T = any>(
  defaultValue: T,
  onSetState?: (value: T) => void
) {
  const state = ref(defaultValue) as Ref<T>
  function setState(newValue: T) {
    state.value = newValue
    onSetState?.(newValue)
  }
  return [state, setState] as [Ref<T>, (value: T) => void]
}
