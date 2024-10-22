import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Loading from './loading.vue'

export function useLoading(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Loading, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
