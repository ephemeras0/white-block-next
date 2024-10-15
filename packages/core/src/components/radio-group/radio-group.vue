<template>
  <div
    p="$wb-radio-group-padding"
    bg="$wb-radio-group-background"
    rounded="$wb-radio-group-radius"
    ring="1 inset $wb-radio-group-border"
    color="$wb-radio-group-text"
    :class="propsClasses"
    :style="propsStyles"
  >
    <div relative flex="~ row nowrap">
      <wb-radio
        v-for="item in options"
        :key="item.value"
        rounded="$wb-radio-group-radius"
        ring="1 $wb-radio-group-item-border hover:$wb-radio-group-item-border-active"
        flex="inline 1"
        :class="{ 'wb-radio--checked': radioGroupValue === item.value }"
        :size="size"
        :type="type"
        :shape="shape"
        :cancelable="clearable"
        :content="item.label"
        v-bind="radioProps ?? {}"
        :value="radioGroupValue === item.value"
        :checked="radioGroupValue === item.value"
        @change="checked => handleItemChange(checked, item.value)"
      />
      <div
        v-if="type === 'tab' && radioGroupValue"
        absolute
        inset="0"
        h="full"
        bg="$wb-radio-group-indicator"
        rounded="$wb-radio-group-radius"
        class="active-indicator"
        :style="{
          width: `calc(100% / ${options?.length})`,
          transform: `translateX(calc(${100 * valueIndexMap[radioGroupValue]}%))`,
          transition: 'var(--transition-ease)'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useVModel } from '@/composables'
import { toRefs } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbRadioGroup' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['type', 'tabType', 'theme', 'shape', 'size', 'disabled'],
  nameProps: ['vertical']
})
const propsStyles = useStyles()

const [radioGroupValue, setRadioGroupValue] = useVModel<any>({
  props: toRefs(props)
})
const valueIndexMap: Record<string | number, number> = {}
if (props.options) {
  for (let i = 0; i < props.options.length; i++) {
    valueIndexMap[props.options[i].value] = i
  }
}
function handleItemChange(checked: boolean, value: any) {
  if (checked) {
    setRadioGroupValue(value)
    return
  }
  setRadioGroupValue('')
}
</script>
