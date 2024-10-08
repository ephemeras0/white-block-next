import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Toggle from './toggle.vue'

export function useToggle(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Toggle, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
