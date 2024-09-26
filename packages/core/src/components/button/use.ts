import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { DisabledProps, SizeProps } from '../api'
import { Props } from './api'
import Button from './button.vue'

export function useButton(
  options?: Partial<Props & SizeProps & DisabledProps>
) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Button, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
