<template>
  <form
    :class="propsClasses"
    :style="propsStyles"
    flex="~ col"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <slot name="default" :label-width="labelWidth">
      <ContentNode />
    </slot>
  </form>
</template>

<script setup lang="ts">
import { KEY_FORM_PROVIDE } from '@/components/keys'
import { useClasses, useNode, useNodeChildren, useStyles } from '@/composables'
import { provide, ref, Ref, watchEffect } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'
import type { FormRules, FormValidateResult, FormValidateError } from './types'

defineOptions({ name: 'WbForm' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['layout'],
  nameValueProps: ['labelAlign']
})
const propsStyles = useStyles()

const renderNode = useNode()
const ContentNode = () =>
  renderNode('default', { allowNodeTypes: props.allowTypes || ['WbFormItem'] })

const nodes = useNodeChildren()

function initFormRules() {
  const map: FormRules = {}
  const list: any = []
  for (const item of nodes) {
    const itemProps = item.props
    if (!itemProps?.name) continue
    const resolveRules = [
      ...(itemProps.rules || []),
      ...(props.rules?.[itemProps.name] || [])
    ]
    if (resolveRules.length) {
      list.push({
        ...itemProps,
        rules: resolveRules
      })
      map[itemProps.name] = resolveRules
    }
  }
  return { map, list }
}
const { list: formRulesList } = initFormRules()

const labelWidth = ref(0)

const FORM_VALIDATE_RESULT_DEFAULT = { pass: true, errors: [] }
const formValidate: Ref<FormValidateResult> = ref({
  ...FORM_VALIDATE_RESULT_DEFAULT
})

provide(KEY_FORM_PROVIDE, {
  labelWidthForm: props.labelWidth,
  labelWidth,
  formValidate
})

function handleSubmit(e: Event) {
  e.preventDefault()
  validate()
  cancelValidateWatcher = watchEffect(() => validate())
  emits('submit', { data: props.data, validate: formValidate.value })
}
function handleReset(e: Event) {
  e.preventDefault()
  clearValidate()
  emits('reset', { data: props.data })
}

let cancelValidateWatcher: any
function validate() {
  const errors: FormValidateError[] = []
  for (const item of formRulesList) {
    item.rules.some((rule: any) => {
      if (rule.required && !props.data?.[item.name]) {
        errors.push({
          prop: item.name,
          type: rule.type,
          message: rule.message
        })
        return true
      }
      return false
    })
  }
  formValidate.value = {
    pass: errors.length === 0,
    errors
  }
}
function clearValidate() {
  cancelValidateWatcher?.()
  formValidate.value = { ...FORM_VALIDATE_RESULT_DEFAULT }
}
defineExpose({
  validate,
  clearValidate
})
</script>
