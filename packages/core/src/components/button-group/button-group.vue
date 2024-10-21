<template>
  <div
    rounded="$wb-radio-group-radius"
    flex="~ row nowrap"
    :gap="separate ? '$wb-button-group-gap' : ''"
    v-bind="$attrs"
    :class="propsClasses"
    :style="propsStyles"
    @click.stop="clickDelegateKey($event, 'wb-button', handleGroupClick)"
  >
    <component :is="ContentNode" v-if="!options?.length" />
    <template v-else>
      <wb-button
        v-for="(item, index) in options"
        :key="item.key || index"
        :type="type"
        :theme="theme"
        :shape="shape"
        :size="size"
        :tag="tag"
        :disabled="disabled"
        v-bind="{ ...(buttonProps || {}), ...item }"
        flex="1 inline"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useClasses, useNode, useStyles } from '@/composables'
import { clickDelegateKey } from '@/utils'
import WbButton from '../button/button.vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbButtonGroup' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses({
  valueProps: ['type', 'theme', 'size', 'shape'],
  nameProps: ['loading', 'disabled', 'separate'],
  nameValueProps: ['gap']
})
const propsStyles = useStyles(result => {
  if (props.gap && typeof props.gap === 'number') {
    return {
      ...result,
      '--wb-button-group-gap': `calc(${props.gap} / 16 * 1rem)`
    }
  }
})

const renderNode = useNode()
const ContentNode = () =>
  renderNode('default', { allowNodeTypes: props.allowTypes || ['WbButton'] })

function handleGroupClick(key: string, e?: MouseEvent) {
  if (key) {
    emits('click', key, e)
  }
}
</script>
