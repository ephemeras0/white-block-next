import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import FormItem from './form-item.vue'

export function useFormItem(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(FormItem, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
