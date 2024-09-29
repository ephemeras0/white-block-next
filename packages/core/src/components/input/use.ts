import { SizeProps, DisabledProps, ValueProps } from '@/components/api'
import { Props } from '@/components/input/api'
import Input from '@/components/input/input.vue'
import { getRawSlots } from '@/utils'
import { defineComponent, h, ref } from 'vue'

export function useInput(
  options?: Partial<Props & SizeProps & ValueProps<string> & DisabledProps>
) {
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
