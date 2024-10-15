import { defineComponent, h } from 'vue'
import { getRawSlots } from '../../utils'
import { Props } from './config'
import Slider from './slider.vue'

export function useSlider(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () => h(Slider, { ...(options || {}) }, getRawSlots(slots))
    }
  })
  return { node }
}
