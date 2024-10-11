<template>
  <div
    h="$wb-toggle-height"
    flex="~ row"
    items="center"
    :class="propsClasses"
    :style="propsStyles"
  >
    <button
      w="[calc(var(--wb-toggle-height-content)*1.8)]"
      h="$wb-toggle-height-content"
      :bg="
        toggleValue ? '$wb-toggle-background-active' : '$wb-toggle-background'
      "
      rounded="$wb-toggle-radius"
      flex="inline shrink-0"
      border="2 solid transparent"
      cursor="disabled:not-allowed"
      op="disabled:50"
      focus-visible="rounded-full outline outline-2 outline-offset-2 outline-$wb-color-primary"
      transition="colors ease-in-out duration-200"
      @click.stop="toggleActive"
    >
      <span
        :flex="toggleValue ? '1' : '0'"
        pointer-events="none"
        transition="all ease-in-out duration-200"
      />
      <span
        inline-block
        w="[calc(var(--wb-toggle-height-content)-0.25rem)]"
        h="full"
        rounded="$wb-toggle-radius"
        bg="$wb-toggle-indicator"
        shadow="md"
        pointer-events="none"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import Color from 'color'
import { useClasses, useStyles, useVModel } from '@/composables'
import { toRefs, watch } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbToggle' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['theme', 'shape', 'size']
})
const propsStyles = useStyles(() => {
  if (props.color) {
    const palette: any = Color(props.color)
    const { color, valpha } = palette.rgb()
    return {
      '--wb-toggle-color': `rgb(${color.join(' ')} / ${valpha})`
    }
  }
})

const [toggleValue, setToggleValue] = useVModel<boolean>({
  props: toRefs(props)
})
function toggleActive() {
  setToggleValue(!toggleValue.value)
  emits('click', toggleValue.value)
}

watch(
  () => props.value,
  val => {
    setToggleValue(val)
  }
)
</script>
