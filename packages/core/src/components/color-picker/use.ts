import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import ColorPicker from './color-picker.vue'

export function useColorPicker(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(ColorPicker, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
