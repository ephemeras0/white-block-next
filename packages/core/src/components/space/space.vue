<template>
  <div
    flex="~ row wrap"
    gap="$wb-space-gap"
    items="$wb-space-align"
    :class="propsClasses"
    :style="propsStyles"
  >
    <ContentNode />
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode } from '@/composables'
import DefaultProps, { Props, Slots } from './api'

defineOptions({ name: 'WbSpace' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['align', 'gap'],
  nameProps: ['vertical']
})

const propsStyles = useStyles(() => {
  if (typeof props.gap === 'number') {
    return { '--wb-space-gap': `calc(${props.gap} / 16 * 1rem)` }
  }
})

const renderNode = useNode()
const ContentNode = () => renderNode('default')
</script>
