import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import {{ COMPONENT_PASCAL }} from './{{ COMPONENT }}.vue'

export function use{{ COMPONENT_PASCAL }}(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h({{ COMPONENT_PASCAL }}, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
