<template>
  <div
    ref="PlaceholderRef"
    w="full"
    h="full"
    overflow="hidden"
    ring="1 $wb-placeholder-border"
    rounded="$wb-placeholder-radius"
    flex="~ row"
    items="center"
    justify="center"
    :class="propsClasses"
    :style="propsStyles"
  >
    <div v-if="type === 'paragraph'" w="full" h="full">
      <div
        v-for="item in paragraphLines"
        :key="item"
        class="wb-placeholder--paragraph-item"
        h="[calc(var(--wb-placeholder-font-size)*1.25)]"
        m="b-[calc(var(--wb-placeholder-font-size)*1.25)] last:r-20%"
        bg="$wb-color-container"
        rounded="$wb-placeholder-radius"
      />
    </div>
    <div
      v-else
      max-w="85%"
      max-h="85%"
      overflow="hidden"
      p="x-$wb-placeholder-padding"
      select="none"
    >
      <ContentNode />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClasses, useNodes, useStyles } from '@/composables'
import { getComponentSize, getComponentSizeValue } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import Color from 'color'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbPlaceholder' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['type', 'size'],
  nameProps: []
})
const propsStyles = useStyles(() => {
  let result = {}
  let lineColor = '%2392ac96'
  if (props.color) {
    const palette: any = Color(props.color)
    const { color } = palette.rgb()
    lineColor = encodeURIComponent(palette.hex())
    result = {
      ...result,
      '--wb-placeholder-vc': color.join(' ')
    }
  }
  if (props.type === 'line') {
    result = {
      ...result,
      background: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${lineColor}' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
    }
  }
  return result
})

const renderNodes = useNodes()
const ContentNode = () => renderNodes(['content', 'default'])

const PlaceholderRef = ref()
const paragraphLines = ref(0)

function setParagraphLines() {
  if (props.type === 'paragraph') {
    const { height } = PlaceholderRef.value.getBoundingClientRect()
    let fontSize = 0
    if (typeof props.size === 'string') {
      fontSize = getComponentSize(getComponentSizeValue(props.size)).fontSize
    } else {
      fontSize = getComponentSize(props.size).fontSize
    }
    paragraphLines.value = Math.floor(
      (height + fontSize * 1.25) / (fontSize * 2.5)
    )
  }
}
onMounted(() => {
  setParagraphLines()
  watch(() => props.type, setParagraphLines)
})
</script>
