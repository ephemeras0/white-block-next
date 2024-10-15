import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Select from './select.vue'

export function useSelect(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Select, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
