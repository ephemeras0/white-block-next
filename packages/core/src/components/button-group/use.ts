import { defineComponent, h } from 'vue'
import ButtonGroup from '@/components/button-group/button-group.vue'
import { getRawSlots } from '@/utils'
import type { Props } from '@/components/button-group/config'

export function useButtonGroup(options?: Partial<Props>) {
  const node = defineComponent({
    setup(_, { slots }) {
      return () =>
        h(ButtonGroup, { ...(options || {}) } as any, getRawSlots(slots))
    }
  })
  return { node }
}
