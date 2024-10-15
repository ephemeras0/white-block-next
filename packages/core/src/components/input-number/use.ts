import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import InputNumber from './input-number.vue'

export function useInputNumber(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(InputNumber, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
