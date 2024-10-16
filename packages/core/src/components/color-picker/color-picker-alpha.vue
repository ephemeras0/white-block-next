<template>
  <div ref="ColorAlphaRef" relative w="full" h="2.5" select="none">
    <div
      absolute
      inset="0"
      w="full"
      h="full"
      rounded="full"
      overflow="hidden"
      style="
        background: #ffffff66;
        background-image: linear-gradient(
            45deg,
            #c5c5c5 25%,
            transparent 0,
            transparent 75%,
            #c5c5c5 0,
            #c5c5c5
          ),
          linear-gradient(
            45deg,
            #c5c5c5 25%,
            transparent 0,
            transparent 75%,
            #c5c5c5 0,
            #c5c5c5
          );
        background-size: 6px 6px;
        background-position: 0 0 3px 3px;
      "
    />
    <div absolute inset="0" flex items="center">
      <div
        w="2"
        h="full"
        rounded="l-2"
        flex="none"
        :style="{ background: selectedColor }"
      />
      <div
        ref="ColorAlphaContentRef"
        w="full"
        h="full"
        flex="1"
        select="none"
        cursor="pointer"
        :style="{
          background: `linear-gradient(90deg, ${selectedColor}ff, ${selectedColor}00)`
        }"
      ></div>
      <div w="2" h="full" rounded="r-2" flex="none" />
    </div>
    <div
      ref="ColorAlphaHandlerRef"
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

defineOptions({ name: 'ColorPickerAlpha' })
const props = defineProps({
  defaultValue: { type: Number, default: 1 },
  selectedColor: { type: String, default: '#ff0000' }
})
const emits = defineEmits<{
  change: [percent: number]
}>()
const ColorAlphaRef = ref()
const ColorAlphaContentRef = ref()
const ColorAlphaHandlerRef = ref()

let AlphaBarClientRect: any = null
let isSelecting = false
let startX = 0
let prevOffsetX = 0
const offsetX = ref(0)

function selectAlphaColorStart(e: MouseEvent) {
  e.stopPropagation()
  isSelecting = true
  startX = e.clientX
  offsetX.value = e.clientX - AlphaBarClientRect.left
  prevOffsetX = offsetX.value
  emits('change', 1 - offsetX.value / AlphaBarClientRect.width)
  // eslint-disable-next-line no-use-before-define
  on(document.body, 'mousemove', throttleSelectAlphaChange)
}
function selectAlphaColorChange(e: MouseEvent) {
  if (!isSelecting) return
  isSelecting = true
  let offset = e.clientX - startX + prevOffsetX
  if (offset < 0) {
    offset = 0
  } else if (offset > AlphaBarClientRect.width) {
    offset = AlphaBarClientRect.width
  }
  offsetX.value = offset
  emits('change', 1 - offsetX.value / AlphaBarClientRect.width)
}
const throttleSelectAlphaChange = throttle(selectAlphaColorChange, 18)
function selectAlphaColorEnd() {
  isSelecting = false
  prevOffsetX = offsetX.value
  off(document.body, 'mousemove', throttleSelectAlphaChange)
}

function updateClientRect() {
  AlphaBarClientRect = ColorAlphaContentRef.value.getBoundingClientRect()
}
const debounceUpdateClientRect = debounce(updateClientRect, 300)

onMounted(() => {
  updateClientRect()
  if (props.defaultValue) {
    offsetX.value = AlphaBarClientRect.width * (1 - props.defaultValue)
    prevOffsetX = offsetX.value
  }
  on(ColorAlphaRef.value, 'mousedown', selectAlphaColorStart)
  on(document.body, 'mouseup', selectAlphaColorEnd)
  on(window, 'resize', debounceUpdateClientRect)
})
onBeforeUnmount(() => {
  off(ColorAlphaRef.value, 'mousedown', selectAlphaColorStart)
  off(window, 'resize', debounceUpdateClientRect)
})
</script>
