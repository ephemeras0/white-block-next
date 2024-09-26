import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Button from './button.vue'

export function useButton(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Button, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
