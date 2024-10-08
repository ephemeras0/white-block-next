<template>
  <div :class="propsClasses" :style="propsStyles">
    Toggle
    <ContentNode />
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode, useVModel } from '@/composables'
import { toRefs } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbToggle' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()



// const [toggleValue, setToggleValue] = useVModel<string>({ props: toRefs(props) })
</script>
