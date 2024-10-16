<template>
  <div w="full" flex gap="2" select="none">
    <wb-select
      w="16.5"
      flex="~ 1"
      :options="COLOR_FORMAT_OPTIONS"
      size="sm"
      default-value="hex"
      select="none"
    />
    <div class="wb-input-number-group" w="full" flex gap="1">
      <wb-input
        w="full"
        flex="~ 1"
        size="sm"
        theme="none"
        :value="selectedColor.hex"
      />
      <wb-input-number
        w="14"
        flex="~"
        size="sm"
        align="center"
        theme="none"
        :default-value="selectedColor.hexAlpha"
        :format="formatPercent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

interface SelectedColor {
  hex: string
  hexAlpha: number
}

defineOptions({ name: 'ColorPickerValue' })
defineProps({
  selectedColor: {
    type: Object as PropType<SelectedColor>,
    default: () => ({
      hex: '',
      hexAlpha: 100
    })
  }
})

const COLOR_FORMAT_OPTIONS = [
  { label: 'HEX', value: 'hex' }
  // { label: 'RGB', value: 'rgb' },
  // { label: 'HSL', value: 'hsl' },
  // { label: 'HWB', value: 'hwb' }
]

function formatPercent(val: number, toFixedValue: string) {
  return `${toFixedValue}%`
}
</script>
