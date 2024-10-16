<template>
  <Popup
    v-model="showOptions"
    :size="size"
    placement="bottom-start"
    pure
    :class="propsClasses"
    @show="$emit('show')"
    @hide="handleHideSelect"
    @keydown="togglePopup"
  >
    <Input
      :size="size"
      v-bind="{ ...$attrs, ...inputProps }"
      :value="currentValue?.label"
      readonly
      class="wb-select-input"
    >
      <!-- @change="emits('change', selectedValue)" -->
      <!-- TODO: 加载数据效果 -->
      <!-- TODO: loading -->
      <template #suffix>
        <i
          w="$wb-select-arrow"
          h="$wb-select-arrow"
          color="$wb-color-text-5"
          i="heroicons-chevron-down-20-solid"
        />
        <!-- pointer-events-none -->
      </template>
    </Input>
    <template #content="{ trigger }">
      <div :class="propsClasses">
        <ul
          p="$wb-select-padding"
          bg="$wb-select-background"
          rounded="$wb-select-radius"
          ring="1 $wb-select-border"
          flex="~ col"
          gap="$wb-select-gap"
          class="wb-select-content scrollable"
          :style="{ minWidth: `${trigger.width}px`, ...propsStyles }"
          @click.stop="
            clickDelegate($event, 'wb-select-option', handleSelectOptionItem)
          "
        >
          <template v-if="options.length">
            <li
              v-for="(item, index) in options"
              :key="item.value"
              :data-index="index"
              relative
              w="full"
              h="$wb-select-height"
              bg="hover:$wb-select-option-hover-background"
              p="x-$wb-select-padding"
              rounded="$wb-select-radius"
              flex
              items="center"
              cursor="pointer"
              class="wb-select-option"
              :class="{
                'wb-select-option--hover': currentIndex === index,
                'wb-select-option--active': selectedIndex === index
              }"
            >
              <span>{{ item.label }}</span>
            </li>
          </template>
          <div v-else w="full" p="1" flex justify-center>
            <div text="sm $wb-color-text-5">暂无数据</div>
          </div>
        </ul>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useState, useVModel } from '@/composables'
import { EventCenter, GlobalEventCenter, clickDelegate } from '@/utils'
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import Input from '../input'
import Popup from '../popup'
import { DefaultProps, Emits, Props, Slots } from './config'
import type { SelectOptionsItem } from './types'

defineOptions({ name: 'WbSelect', inheritAttrs: false })

// prettier-ignore
// @ts-ignore
const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses({
  valueProps: ['size', 'theme'],
  nameProps: ['arrow']
})
const propsStyles = useStyles(() => {
  if (props.maxContentHeight) {
    return { '--wb-select-max-content-height': props.maxContentHeight }
  }
})

// const { globalConfig } = useConfig()
const [selectValue, setSelectValue] = useVModel<any>({
  props: toRefs(props)
})
const [showOptions, setShowOptions] = useState(false)

const optionsDataMap: any = {}
const optionsIndexMap: any = {}
if (props.options) {
  props.options.forEach((item, index) => {
    optionsDataMap[item.value] = item
    optionsIndexMap[item.value] = index
  })
}

// value
const selectedIndex = ref<number>(optionsIndexMap[selectValue.value] ?? -1)
const selectedValue = ref<SelectOptionsItem>(optionsDataMap[selectValue.value])
// operation
const currentIndex = ref<number>(optionsIndexMap[selectValue.value] ?? -1)
const currentValue = ref<SelectOptionsItem>(optionsDataMap[selectValue.value])

function setSelectedData(index: number, finish = false) {
  if (!props.options) return
  currentIndex.value = index
  currentValue.value = props.options[index]
  selectedIndex.value = currentIndex.value
  selectedValue.value = currentValue.value
  setSelectValue(currentValue.value?.value)
  if (finish) {
    setShowOptions(false)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.options) return
  if (!showOptions.value) return
  switch (e.code) {
    case 'ArrowUp': {
      e.preventDefault()
      if (currentIndex.value <= 0) {
        currentIndex.value = -1
        return
      }
      currentIndex.value -= 1
      emits('select', props.options[currentIndex.value].value)
      break
    }
    case 'ArrowDown': {
      e.preventDefault()
      if (currentIndex.value >= props.options.length) {
        currentIndex.value = props.options.length
        return
      }
      currentIndex.value += 1
      emits('select', props.options[currentIndex.value].value)
      break
    }
    case 'Escape':
      setShowOptions(false)
      break
    case 'Tab':
      setShowOptions(false)
      break
  }
}
const BodyEvents = GlobalEventCenter.get('body') as EventCenter
onMounted(() => {
  BodyEvents.on('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  BodyEvents.off('keydown', handleKeydown)
})

function handleSelectOptionItem(dataset: Record<string, any>) {
  const { index } = dataset
  if (index) {
    setSelectedData(index - 0, true)
    setShowOptions(false)
  }
}

function togglePopup(e: any) {
  switch (e.code) {
    case 'Enter': {
      if (!showOptions.value) {
        setShowOptions(true)
        return
      }
      selectedIndex.value = currentIndex.value
      selectedValue.value = currentValue.value
      setSelectedData(currentIndex.value, true)
      break
    }
    case 'Space': {
      e.preventDefault()
      if (!showOptions.value) {
        setShowOptions(true)
      }
      break
    }
  }
}

function handleHideSelect() {
  if (!props.options) return
  currentIndex.value = selectedIndex.value
  currentValue.value = selectedValue.value
  emits('select', props.options[currentIndex.value].value)
  emits('hide')
}
</script>
