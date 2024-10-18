<template>
  <form
    :class="propsClasses"
    :style="propsStyles"
    flex="~ col"
    @submit="handleSubmit"
  >
    <slot name="default" :label-width="labelWidth">
      <ContentNode />
    </slot>
  </form>
</template>

<script setup lang="ts">
import { KEY_FORM_LABEL_WIDTH, KEY_FORM_RULES } from '@/components/keys'
import { useClasses, useNode, useStyles, useVModel } from '@/composables'
import { provide, ref, toRefs } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbForm' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()

const renderNode = useNode()
const ContentNode = () =>
  renderNode('default', { allowNodeTypes: ['WbFormItem'] })

const [FormValue, setFormValue] = useVModel<Record<string, any>>({
  props: toRefs(props)
})
console.log(FormValue, setFormValue)

const labelWidth = ref(0)
provide(KEY_FORM_LABEL_WIDTH, {
  formLabelWidth: props.labelWidth,
  labelWidth,
  setLabelWidth(width: number) {
    labelWidth.value = Math.max(labelWidth.value, width)
  }
})
const formRules = ref([])
provide(KEY_FORM_RULES, {
  rules: props.rules ?? [],
  formRules,
  setFormRules(item: string, rules: any) {
    formRules.value[item] = rules
  }
})

function handleSubmit(e) {
  console.log(e)
  // TODO: validate
  emits('submit', {})
}
</script>
