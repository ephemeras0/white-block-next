<template>
  <div :class="propsClasses" :style="propsStyles">Slider</div>
</template>

<script setup lang="ts">
import { useClasses, useStyles } from '@/composables'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbSlider' })

withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()
</script>
