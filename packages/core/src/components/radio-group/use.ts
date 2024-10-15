import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import RadioGroup from './radio-group.vue'

export function useRadioGroup(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(RadioGroup, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
