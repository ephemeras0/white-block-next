<template>
  <div
    ref="ColorHueRef"
    relative
    w="full"
    h="1"
    bg="$wb-color-layer"
    rounded="full"
    select="none"
  >
    <div absolute inset="0" w="full" h="full" p="x-2" rounded="full">
      <div
        absolute
        top="0"
        left="0"
        h="full"
        bg="$wb-color-primary"
        rounded="full"
        :style="{ width: `${offsetXPercent}%` }"
      ></div>
      <div
        ref="ColorHueContentRef"
        w="full"
        h="full"
        flex="1"
        select="none"
        cursor="pointer"
      />
    </div>
    <div
      ref="ColorHueHandlerRef"
      absolute
      top="50%"
      left="0"
      w="4"
      h="4"
      bg="$wb-color-primary"
      rounded="full"
      shadow="sm black"
      cursor="pointer"
      select="none"
      transform="translate-x--50% translate-y--50%"
      :style="{ left: `${offsetXPercent}%` }"
    >
      <Popup
        ref="SliderValuePopupRef"
        trigger="hover"
        placement="top"
        v-bind="popupProps"
        :animate="false"
      >
        <div w="4" h="4" rounded="full" ring="2 inset $wb-color-foreground" />
        <template #content>
          <div>{{ sliderValue }}</div>
        </template>
      </Popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@/composables'
import { DefaultProps, Emits, Props, Slots } from './config'
import { off, on, throttle, debounce } from '@/utils'
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import Popup from '../popup'

defineOptions({ name: 'WbSlider' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
defineEmits<Emits>()
defineSlots<Slots>()

const ColorHueRef = ref()
const ColorHueContentRef = ref()
const ColorHueHandlerRef = ref()
const SliderValuePopupRef = ref()

let HueBarClientRect: any = null
let isSelecting = false
let startX = 0
let prevOffsetX = 0
let offsetX = 0
const offsetXPercent = ref(0)
const [sliderValue, setSliderValue] = useVModel<number>({
  props: toRefs(props)
})

function getLimitOffsetPercent(offset: number) {
  if (offset < 0) return 0
  if (offset > HueBarClientRect.width) return 100
  return Math.round((offset / HueBarClientRect.width) * 100)
}

function selectHueColorStart(e: MouseEvent) {
  e.stopPropagation()
  isSelecting = true
  startX = e.clientX
  offsetX = e.clientX - HueBarClientRect.left
  prevOffsetX = offsetX
  offsetXPercent.value = getLimitOffsetPercent(offsetX)
  SliderValuePopupRef.value?.updatePopup()
  setSliderValue(offsetXPercent.value)
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
  offsetX = offset
  offsetXPercent.value = getLimitOffsetPercent(offsetX)
  SliderValuePopupRef.value?.updatePopup()
  setSliderValue(offsetXPercent.value)
}
const throttleSelectHueChange = throttle(selectHueColorChange, 18)
function selectHueColorEnd() {
  isSelecting = false
  prevOffsetX = offsetX
  off(document.body, 'mousemove', throttleSelectHueChange)
}

function updateClientRect() {
  HueBarClientRect = ColorHueContentRef.value.getBoundingClientRect()
}
const debounceUpdateClientRect = debounce(updateClientRect, 300)

onMounted(() => {
  updateClientRect()
  watch(
    () => sliderValue.value,
    () => {
      if (sliderValue.value) {
        offsetX = (HueBarClientRect.width * sliderValue.value) / 100
        offsetXPercent.value = getLimitOffsetPercent(offsetX)
        SliderValuePopupRef.value?.updatePopup()
      }
    },
    { immediate: true }
  )
  on(ColorHueRef.value, 'mousedown', selectHueColorStart)
  on(document.body, 'mouseup', selectHueColorEnd)
  on(window, 'resize', debounceUpdateClientRect)
})
onBeforeUnmount(() => {
  off(ColorHueRef.value, 'mousedown', selectHueColorStart)
  off(window, 'resize', debounceUpdateClientRect)
})
</script>
