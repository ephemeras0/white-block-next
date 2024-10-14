<template>
  <label
    h="$wb-radio-height"
    p="x-$wb-radio-padding"
    rounded="$wb-radio-radius"
    cursor="pointer"
    select="none"
    flex="inline"
    items="center"
    gap="$wb-radio-gap"
    :color="radioValue ? '$wb-radio-text-active' : '$wb-radio-text'"
    :class="propsClasses"
    :style="propsStyles"
    tabindex="0"
  >
    <input
      type="radio"
      tabindex="-1"
      :disabled="disabled"
      :checked="radioValue"
      w="$wb-radio-size"
      h="$wb-radio-size"
      overflow="hidden"
      m="0"
      cursor="pointer"
      @click.stop="onClick"
    />
    <div
      w="full"
      truncate
      flex
      items="center"
      gap="$wb-radio-gap"
      class="wb-radio-content"
    >
      <component :is="ContentNode" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { useClasses, useNodes, useStyles, useVModel } from '@/composables'
import Color from 'color'
import { toRefs } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbRadio' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['theme', 'size'],
  nameProps: ['disabled', 'readonly', 'clearable']
})
const propsStyles = useStyles(() => {
  if (props.color) {
    const palette: any = Color(props.color)
    const { color, valpha } = palette.rgb()
    return {
      '--wb-button-color-main': `rgb(${color.join(' ')} / ${valpha})`,
      '--wb-button-vc-main': color.join(' ')
    }
  }
})

const renderNodes = useNodes()
const ContentNode = () => renderNodes(['content', 'default'])

const [radioValue, setRadioValue] = useVModel<boolean>({ props: toRefs(props) })

function onClick(e: Event) {
  if (props.readonly || props.disabled) {
    e.preventDefault()
    return
  }
  const { checked } = e.target as HTMLInputElement
  if (props.clearable) {
    setRadioValue(!radioValue.value)
  } else if (checked !== radioValue.value) {
    setRadioValue(checked)
  }
  emits('click', radioValue.value)
}
</script>
