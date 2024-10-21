<template>
  <div
    w="full"
    m="b-8"
    flex
    items="center"
    :class="`${propsClasses} wb-form-item--${resolveValidateResult.type}`"
    :style="propsStyles"
  >
    <div
      v-if="label"
      ref="FormItemRef"
      p="r-4"
      :style="{ width: `${labelWidthResolve}px` }"
    >
      {{ label }}
    </div>
    <div w="full" relative>
      <ContentNode />
      <div
        v-if="resolveValidateResult.tip"
        absolute
        top="100%"
        left="0"
        un-text="3 $wb-form-item-color-tip"
        class="wb-form-item-tip"
      >
        {{ resolveValidateResult.tip }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KEY_FORM_PROVIDE } from '@/components/keys'
import { useClasses, useNode, useStyles } from '@/composables'
import { GlobalEventCenter } from '@/utils'
import { computed, inject, onMounted, ref } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'
import type { FormProvidePayload } from '../form/types'

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

const FormItemRef = ref()

const { labelWidthForm, labelWidth, formValidate } = inject(
  KEY_FORM_PROVIDE
) as FormProvidePayload

const labelWidthResolve = computed(() => {
  if (props.labelWidth) return props.labelWidth
  if (labelWidthForm) return labelWidthForm
  if (labelWidth?.value === 0) return null
  return labelWidth?.value
})

const resolveValidateResult = computed(() => {
  const result = { type: '', tip: '' }
  if (
    !formValidate.value.errors.length ||
    formValidate.value.errors[0].prop !== props.name
  )
    return result

  result.type = formValidate.value.errors[0].type
  result.tip = formValidate.value.errors[0].message
  return result
})

function setAutoLabelWidth() {
  const { width } = FormItemRef.value.getBoundingClientRect()
  labelWidth!.value = Math.max(labelWidth!.value, width)
}
onMounted(() => {
  if (labelWidthForm || labelWidth?.value) return
  setAutoLabelWidth()
  const BodyEvents = GlobalEventCenter.get('body')
  BodyEvents?.on('resize', setAutoLabelWidth)
})
</script>
