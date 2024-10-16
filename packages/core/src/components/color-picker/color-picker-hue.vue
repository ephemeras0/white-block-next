<template>
  <div ref="ColorHueRef" relative w="full" h="2.5" select="none">
    <div
      absolute
      inset="0"
      w="full"
      h="full"
      rounded="full"
      flex
      items="center"
    >
      <div w="2" h="full" bg="#f00" rounded="l-2" flex="none" />
      <div
        ref="ColorHueContentRef"
        w="full"
        h="full"
        flex="1"
        select="none"
        cursor="pointer"
        style="
          background: linear-gradient(
            90deg,
            #f00,
            #ff0 17%,
            #0f0 33%,
            #0ff 50%,
            #00f 67%,
            #f0f 83%,
            #f00
          );
        "
      />
      <div w="2" h="full" bg="#f00" rounded="r-2" flex="none" />
    </div>
    <div
      ref="ColorHueHandlerRef"
      absolute
      top="50%"
      left="0"
      w="4"
      h="4"
      rounded="full"
      shadow="sm black"
      cursor="pointer"
      select="none"
      :style="{
        background: selectedColor,
        transform: `translate3d(${offsetX}px, -50%, 0)`
      }"
    >
      <div
        w="full"
        h="full"
        rounded="full"
        ring="2 inset $wb-color-foreground"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { off, on, throttle, debounce } from '@/utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'ColorPickerHue' })
const props = defineProps({
  defaultValue: { type: Number, default: 1 },
  selectedColor: { type: String, default: '#ff0000' }
})
const emits = defineEmits<{
  change: [hue: number]
}>()

const ColorHueRef = ref()
const ColorHueContentRef = ref()
const ColorHueHandlerRef = ref()

let HueBarClientRect: any = null
let isSelecting = false
let startX = 0
let prevOffsetX = 0
const offsetX = ref(0)

function selectHueColorStart(e: MouseEvent) {
  e.stopPropagation()
  isSelecting = true
  startX = e.clientX
  offsetX.value = e.clientX - HueBarClientRect.left
  prevOffsetX = offsetX.value
  emits('change', (offsetX.value / HueBarClientRect.width) * 360)
  // eslint-disable-next-line no-use-before-define
  on(document.body, 'mousemove', throttleSelectHueChange)
}
function selectHueColorChange(e: MouseEvent) {
  if (!isSelecting) return
  isSelecting = true
  let offset = e.clientX - startX + prevOffsetX
  if (offset < 0) {
    offset = 0
  } else if (offset > HueBarClientRect.width) {
    offset = HueBarClientRect.width
  }
  offsetX.value = offset
  emits('change', (offsetX.value / HueBarClientRect.width) * 360)
}
const throttleSelectHueChange = throttle(selectHueColorChange, 18)
function selectHueColorEnd() {
  isSelecting = false
  prevOffsetX = offsetX.value
  off(document.body, 'mousemove', throttleSelectHueChange)
}

function updateClientRect() {
  HueBarClientRect = ColorHueContentRef.value.getBoundingClientRect()
}
const debounceUpdateClientRect = debounce(updateClientRect, 300)

onMounted(() => {
  updateClientRect()
  if (props.defaultValue) {
    offsetX.value = (HueBarClientRect.width * props.defaultValue) / 360
    prevOffsetX = offsetX.value
  }
  on(ColorHueRef.value, 'mousedown', selectHueColorStart)
  on(document.body, 'mouseup', selectHueColorEnd)
  on(window, 'resize', debounceUpdateClientRect)
})
onBeforeUnmount(() => {
  off(ColorHueRef.value, 'mousedown', selectHueColorStart)
  off(window, 'resize', debounceUpdateClientRect)
})
</script>
