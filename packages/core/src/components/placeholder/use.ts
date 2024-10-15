import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Placeholder from './placeholder.vue'

export function usePlaceholder(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Placeholder, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
