<template>
  <component
    :is="tag || 'button'"
    :disabled="loading || disabled"
    :aria-disabled="loading || disabled"
    h="$wb-button-height"
    p="x-$wb-button-padding"
    bg="$wb-button-background hover:$wb-button-background-hover active:$wb-button-background-active"
    color="$wb-button-text hover:$wb-button-text-hover active:$wb-button-text-active"
    ring="1 inset $wb-button-border hover:$wb-button-border-hover active:$wb-button-border-active"
    rounded="$wb-button-radius"
    flex="inline row nowrap shrink-0"
    justify="center"
    items="center"
    gap="$wb-button-gap"
    cursor="pointer"
    select="none"
    outline="none"
    focus-visible="outline outline-2 outline-offset-2 outline-$wb-color-primary"
    transition="all ease duration-200"
    box="border"
    v-bind="$attrs"
    :class="propsClasses"
    :style="propsStyles"
    @click="propEmits('click', $event)"
  >
    <div
      v-if="prefix || $slots.prefix || loading"
      name="prefix"
      h="full"
      flex="~ row"
      items="center"
      justify="center"
    >
      <i v-if="loading" w="1em" h="1em" i="svg-spinners-180-ring" />
      <PrefixNode v-else />
    </div>
    <ContentNode v-if="!(loading && ['circle', 'square'].includes(shape))" />
    <SuffixNode />
  </component>
</template>

<script setup lang="ts">
import Color from 'color'
import {
  useClasses,
  useNode,
  useNodes,
  useStyles,
  usePropEmits
} from '@/composables'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbButton' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: ['type', 'theme', 'shape', 'size'],
  nameProps: ['block', 'loading', 'disabled']
})
const propsStyles = useStyles(() => {
  if (props.color) {
    const palette: any = Color(props.color)
    const { color, valpha } = palette.rgb()
    return {
      '--wb-button-color-main': `rgb(${color.join(' ')} / ${valpha})`,
      '--wb-button-vc-main': color.join(' ')
    }
  }
})

const renderNodes = useNodes()
const ContentNode = () => renderNodes(['content', 'default'])

const renderNode = useNode()
const PrefixNode = () => renderNode('prefix')
const SuffixNode = () => renderNode('suffix')

const propEmits = usePropEmits()
</script>
