import { Props } from '@/components/input/config'
import Input from '@/components/input/input.vue'
import { getRawSlots } from '@/utils'
import { defineComponent, h, ref } from 'vue'

export function useInput(options?: Partial<Props>) {
  const inputValue = ref('')
  const node = defineComponent({
    setup(_, { slots }) {
      return () =>
        h(
          Input,
          {
            'modelValue': inputValue.value,
            'onUpdate:modelValue': (val: string) => {
              inputValue.value = val
            },
            ...(options || {})
          },
          getRawSlots(slots)
        )
    }
  })
  return { node, value: inputValue }
}
