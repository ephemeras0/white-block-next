<template>
  <div m="b-8" flex items="center" :class="propsClasses" :style="propsStyles">
    <div
      v-if="label"
      ref="FormItemRef"
      p="r-4"
      :style="{ width: `${labelWidthResolve}px` }"
    >
      {{ label }}
    </div>
    <div relative>
      <ContentNode />
      <div absolute top="100%" left="0" un-text="3">必填</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KEY_FORM_LABEL_WIDTH, KEY_FORM_RULES } from '@/components/keys'
import { useClasses, useNode, useStyles } from '@/composables'
import { computed, inject, onMounted, ref } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbFormItem' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()

const renderNode = useNode()
const ContentNode = () => renderNode('default')

const { formLabelWidth, labelWidth, setLabelWidth } =
  inject(KEY_FORM_LABEL_WIDTH) || {}
const FormItemRef = ref()
const labelWidthResolve = computed(() => {
  if (props.labelWidth) return props.labelWidth
  if (formLabelWidth) return formLabelWidth
  if (labelWidth?.value === 0) return null
  return labelWidth?.value
})

const { formRules, rules, setFormRules } = inject(KEY_FORM_RULES) || {}
if (props.rules && props.name) {
  setFormRules?.(props.name, rules)
}
const formItemRulesResolve = computed(() => [
  ...(props.rules || []),
  // @ts-ignore
  ...(formRules?.[props.name] || [])
])
console.log(formItemRulesResolve)

onMounted(() => {
  if (formLabelWidth || labelWidth?.value) return
  const { width } = FormItemRef.value.getBoundingClientRect()
  setLabelWidth?.(width)
})
</script>
