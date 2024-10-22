<template>
  <div :class="propsClasses" :style="propsStyles">
    Loading
    <ContentNode />
  </div>
</template>

<script setup lang="ts">
import { useClasses, useNode, useStyles } from '@/composables'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbLoading' })

withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()

const renderNode = useNode()
const ContentNode = () => renderNode('default')
</script>
