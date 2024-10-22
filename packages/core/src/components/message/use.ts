import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Message from './message.vue'

export function useMessage(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Message, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
