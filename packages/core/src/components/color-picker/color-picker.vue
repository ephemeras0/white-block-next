<template>
  <div
    w="$wb-color-picker-width"
    p="[calc(var(--wb-color-picker-padding)+0.125rem)]"
    bg="$wb-color-picker-background"
    ring="1 inset $wb-color-picker-border"
    rounded="$wb-color-picker-radius"
    flex="~ col"
    gap="3"
    select="none"
    :class="propsClasses"
  >
    <ColorPickerSaturation
      :default-value="{
        x: 100 - selectedColorSaturation,
        y: 100 - selectedColorValue
      }"
      :selected-color="selectedColor.hex"
      :panel-color="saturationBackgroundColor"
      @change="handleSaturationChange"
    />
    <div flex items="center" gap="2">
      <ColorPickerPreview
        flex="none"
        :selected-color="selectedColor.hexa"
        @copy="copyToClipboard(selectedColor.hexa)"
      />
      <div w="44" flex="~ col 1" gap="2.5">
        <ColorPickerHue
          :default-value="selectedColorHue"
          :selected-color="selectedColor.hex"
          @change="handleHueChange"
        />
        <ColorPickerAlpha
          :default-value="selectedColorAlpha"
          :selected-color="selectedColor.hex"
          @change="handleAlphaChange"
        />
      </div>
      <ColorPickerDropper v-if="dropper" />
    </div>
    <!-- <ColorPickerValue :selected-color="selectedColor" /> -->
  </div>
</template>

<script setup lang="ts">
import { useClasses, useVModel } from '@/composables'
import { copyToClipboard } from '@/utils'
import Color from 'color'
import { computed, ref, toRefs, watch } from 'vue'
import ColorPickerAlpha from './color-picker-alpha.vue'
import ColorPickerDropper from './color-picker-dropper.vue'
import ColorPickerHue from './color-picker-hue.vue'
import ColorPickerPreview from './color-picker-preview.vue'
import ColorPickerSaturation from './color-picker-saturation.vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbColorPicker' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['size'],
  nameProps: ['disabled', 'pure']
})

const [colorPickerValue] = useVModel<string>({
  props: toRefs(props)
})

const selectedColorHue = ref(0)
const selectedColorSaturation = ref(100)
const selectedColorValue = ref(100)
const selectedColorAlpha = ref(100)

watch(
  () => colorPickerValue.value,
  () => {
    const color = Color(colorPickerValue.value)
    selectedColorHue.value = color.hue()
    selectedColorSaturation.value = color.saturationv()
    selectedColorValue.value = color.value()
    selectedColorAlpha.value = color.alpha()
  },
  {
    immediate: true
  }
)

const selectedColor = computed(() => {
  const color = Color({
    h: selectedColorHue.value,
    s: selectedColorSaturation.value,
    v: selectedColorValue.value
  })
  return {
    color,
    hex: color.hex(),
    hexAlpha: color.alpha(),
    hexa: color.alpha(selectedColorAlpha.value).hexa()
  }
})
const saturationBackgroundColor = computed(() => {
  const color = Color({
    h: selectedColorHue.value,
    s: 100,
    v: 100
  })
  return color.hex()
})

function handleHueChange(hue: number) {
  selectedColorHue.value = hue
  emits('change', selectedColor.value.hex)
}
function handleAlphaChange(hue: number) {
  selectedColorAlpha.value = hue
  emits('change', selectedColor.value.hex)
}
function handleSaturationChange(data: { x: number; y: number }) {
  selectedColorSaturation.value = 100 - data.x
  selectedColorValue.value = 100 - data.y
  emits('change', selectedColor.value.hex)
}
</script>
