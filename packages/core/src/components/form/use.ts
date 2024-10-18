import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Form from './form.vue'

export function useForm(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Form, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
