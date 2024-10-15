import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Popup from './popup.vue'

export function usePopup(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Popup, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
