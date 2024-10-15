<template>
  <div
    relative
    w="$wb-input-number-width"
    :p="theme === 'side' ? '1px' : '0'"
    rounded="$wb-input-number-radius"
    ring="1 inset $wb-input-number-border"
    overflow="hidden"
    :focus-within="
      theme === 'side' ? '' : 'outline outline-2 outline-$wb-color-primary'
    "
    flex="~ inline"
    items="center"
    gap="$wb-input-number-gap"
    :class="propsClasses"
    :style="propsStyles"
    @click.stop="clickDelegate($event, 'wb-button', handleChangeNumber)"
  >
    <template v-if="theme === 'side'">
      <wb-button
        tabindex="-1"
        data-key="sub"
        type="outline"
        theme="default"
        shape="square"
        :size="size"
        :disabled="min !== undefined && min >= inputValue"
      >
        <i i="tdesign-minus" />
      </wb-button>
    </template>
    <PrefixNode v-else />

    <!-- TODO: 无法输入 -->
    <input
      ref="InputRef"
      :value="formatInputValue"
      :readonly="readonly"
      :disabled="disabled"
      :step="step"
      :placeholder="placeholder"
      maxlength="15"
      flex="1"
      h="$wb-input-number-height"
      p="x-$wb-input-number-padding"
      bg="$wb-input-number-background"
      :ring="theme === 'side' ? '1 inset $wb-input-number-border' : ''"
      rounded="$wb-input-number-radius"
      text="$wb-input-number-text"
      overflow="hidden"
      :focus-visible="
        theme === 'side' ? 'outline outline-2 outline-$wb-color-primary' : ''
      "
      @input="handleInputChange"
      @keydown="changeInputValue"
    />
    <SuffixNode />
    <template v-if="theme === 'side'">
      <wb-button
        tabindex="-1"
        data-key="add"
        type="outline"
        theme="default"
        shape="square"
        :size="size"
        :disabled="max !== undefined && max <= inputValue"
      >
        <i i="tdesign-add" />
      </wb-button>
    </template>
    <template v-else-if="theme === 'inner'">
      <div
        h="[calc(var(--wb-input-number-height)-3px)]"
        m="r-px"
        p="b-px"
        bg="$wb-color-soft"
        flex="~ none col"
        gap="1px"
        class="wb-input-number-options"
      >
        <wb-button
          :size="size"
          :disabled="max !== undefined && max <= inputValue"
          theme="default"
          tabindex="-1"
          data-key="add"
          w="full"
          h="[calc(50%)]"
          rounded="rt-$wb-input-number-radius"
          focus-visible="outline-0 bg-$wb-color-primary"
        >
          <i i="tdesign-chevron-up" />
        </wb-button>
        <wb-button
          :size="size"
          theme="default"
          :disabled="min !== undefined && min >= inputValue"
          tabindex="-1"
          data-key="sub"
          w="full"
          h="[calc(50%)]"
          rounded="rb-$wb-input-number-radius"
          focus-visible="outline-0 bg-$wb-color-primary"
        >
          <i i="tdesign-chevron-down" />
        </wb-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode, useVModel } from '@/composables'
import { clickDelegate, off, on } from '@/utils'
import { Ref, onBeforeUnmount, onMounted, ref, toRefs, watchEffect } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbInputNumber' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['type', 'align', 'theme', 'size'],
  nameProps: ['disabled', 'readonly']
})
const propsStyles = useStyles()

const renderNode = useNode()
const PrefixNode = () => renderNode('prefix')
const SuffixNode = () => renderNode('suffix')

const [inputValue, setInputValue] = useVModel<number>({ props: toRefs(props) })

// watch(
//   () => inputValue.value,
//   () => {
//     // TODO: v-model
//     formatInputValue.value = inputValue.value.toString()
//   }
// )
function getFormatValue(val: number) {
  return parseFloat(val.toFixed(props.decimal))
}
function getLimitValue(val?: any) {
  if (!val) return val
  let result = val
  if (typeof props.max === 'number' && result > props.max) {
    result = Math.min(result, props.max)
  }
  if (typeof props.min === 'number' && result < props.min) {
    result = Math.max(result, props.min)
  }
  return result
}

const InputRef = ref()
const isInputFocus = ref(false)
function changeFocusState(e: any) {
  isInputFocus.value = e.type === 'focus'
}

function changeInputValue(e: KeyboardEvent) {
  e.preventDefault()
  let result = inputValue.value || 0
  switch (e.code) {
    case 'ArrowUp': {
      result += props.step
      break
    }
    case 'ArrowDown': {
      result -= props.step
      break
    }
  }
  const value = getLimitValue(result)
  // eslint-disable-next-line no-use-before-define
  originInputValue.value = value
  setInputValue(value)
}
onMounted(() => {
  if (props.format) {
    on(InputRef.value, 'focus', changeFocusState)
    on(InputRef.value, 'blur', changeFocusState)
  }
})
onBeforeUnmount(() => {
  if (props.format) {
    off(InputRef.value, 'focus', changeFocusState)
    off(InputRef.value, 'blur', changeFocusState)
  }
})

const formatInputValue: Ref<string | undefined> = ref('')
const originInputValue: Ref<number | undefined> = ref(inputValue.value)
watchEffect(() => {
  if (!originInputValue.value) {
    formatInputValue.value = originInputValue.value?.toString()
    return
  }
  const toFixedValue = getLimitValue(originInputValue.value)?.toFixed(
    props.decimal
  )
  if (isInputFocus.value) {
    formatInputValue.value = toFixedValue
    return
  }
  if (props.format) {
    formatInputValue.value = props.format(
      getLimitValue(originInputValue.value),
      toFixedValue
    )
    return
  }
  if (props.separator) {
    formatInputValue.value = toFixedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  formatInputValue.value = toFixedValue
})

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  const resolveTarget = target.value
  // const resolveTarget = target.value.replace(/[^0-9+\-.eE]/g, '')
  const value = resolveTarget ? parseFloat(resolveTarget) || 0 : undefined
  originInputValue.value = value
  setInputValue(getLimitValue(value))
}

function handleChangeNumber(dataset: Record<string, string>) {
  const { key } = dataset
  let result = inputValue.value || 0
  switch (key) {
    case 'add':
      result += props.step
      break
    case 'sub': {
      result -= props.step
      break
    }
  }
  const value = getFormatValue(getLimitValue(result))
  originInputValue.value = value
  setInputValue(value)
}
</script>
