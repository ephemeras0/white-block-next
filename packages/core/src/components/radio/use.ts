import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Radio from './radio.vue'

export function useRadio(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Radio, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
