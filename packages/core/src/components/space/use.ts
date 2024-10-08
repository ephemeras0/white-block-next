import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Space from './space.vue'

export function useSpace(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Space, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
