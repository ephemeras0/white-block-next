<template>
  <div
    ref="ColorSaturationRef"
    relative
    w="full"
    h="40"
    rounded="$comp-radius-sm"
    overflow="hidden"
    select="none"
    :style="{ background: panelColor }"
  >
    <div
      absolute
      inset="0"
      w="full"
      h="full"
      style="background: linear-gradient(90deg, #fff, transparent)"
    />
    <div
      absolute
      inset="0"
      w="full"
      h="full"
      style="background: linear-gradient(0deg, #000, transparent)"
    />
    <div
      ref="ColorSaturationHandlerRef"
      absolute
      top="-2"
      right="-2"
      shadow="sm black"
      rounded="full"
      select="none"
      :style="{
        transform: `translate3d(${resolveOffsetX}px, ${resolveOffsetY}px, 0)`
      }"
    >
      <div
        w="4"
        h="4"
        rounded="full"
        ring="2 inset $wb-color-foreground"
        cursor="pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { off, on, throttle, debounce } from '@/utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'ColorPickerSaturation' })
const props = defineProps({
  defaultValue: { type: Object, default: () => ({ x: 0, y: 0 }) },
  selectedColor: { type: String, default: '#ff0000' },
  panelColor: { type: String, default: '#ff0000' }
})
const emits = defineEmits<{
  change: [percent: { x: number; y: number }]
}>()

const ColorSaturationRef = ref()
const ColorSaturationHandlerRef = ref()

let HubBarClientRect: any = null
let isSelecting = false
let startX = 0
let startY = 0
let prevOffsetX = 0
let prevOffsetY = 0
const resolveOffsetX = ref(0)
const resolveOffsetY = ref(0)

function selectSaturationColorStart(e: MouseEvent) {
  e.stopPropagation()
  isSelecting = true
  startX = e.clientX
  startY = e.clientY
  resolveOffsetX.value = e.clientX - HubBarClientRect.right
  resolveOffsetY.value = e.clientY - HubBarClientRect.top
  prevOffsetX = resolveOffsetX.value
  prevOffsetY = resolveOffsetY.value
  emits('change', {
    x: -(resolveOffsetX.value / HubBarClientRect.width) * 100,
    y: (resolveOffsetY.value / HubBarClientRect.height) * 100
  })
  // eslint-disable-next-line no-use-before-define
  on(document.body, 'mousemove', throttleSelectSaturationChange)
}
function selectSaturationColorChange(e: MouseEvent) {
  if (!isSelecting) return
  isSelecting = true
  let offsetX = e.clientX - startX + prevOffsetX
  let offsetY = e.clientY - startY + prevOffsetY
  if (offsetX < -HubBarClientRect.width) {
    offsetX = -HubBarClientRect.width
  } else if (offsetX > 0) {
    offsetX = 0
  }
  if (offsetY < 0) {
    offsetY = 0
  } else if (offsetY > HubBarClientRect.height) {
    offsetY = HubBarClientRect.height
  }
  resolveOffsetX.value = offsetX
  resolveOffsetY.value = offsetY
  emits('change', {
    x: -(resolveOffsetX.value / HubBarClientRect.width) * 100,
    y: (resolveOffsetY.value / HubBarClientRect.height) * 100
  })
}
const throttleSelectSaturationChange = throttle(selectSaturationColorChange, 21)
function selectSaturationColorEnd() {
  isSelecting = false
  prevOffsetX = resolveOffsetX.value
  prevOffsetY = resolveOffsetY.value
  off(document.body, 'mousemove', throttleSelectSaturationChange)
}

function updateClientRect() {
  HubBarClientRect = ColorSaturationRef.value.getBoundingClientRect()
}
const debounceUpdateClientRect = debounce(updateClientRect, 300)

onMounted(() => {
  updateClientRect()
  if (props.defaultValue) {
    resolveOffsetX.value =
      -HubBarClientRect.width * (props.defaultValue.x / 100)
    prevOffsetX = resolveOffsetX.value
    resolveOffsetY.value =
      HubBarClientRect.height * (props.defaultValue.y / 100)
    prevOffsetY = resolveOffsetY.value
  }
  on(ColorSaturationRef.value, 'mousedown', selectSaturationColorStart)
  on(document.body, 'mouseup', selectSaturationColorEnd)
  on(window, 'resize', debounceUpdateClientRect)
})
onBeforeUnmount(() => {
  off(ColorSaturationRef.value, 'mousedown', selectSaturationColorStart)
  off(window, 'resize', debounceUpdateClientRect)
})
</script>
