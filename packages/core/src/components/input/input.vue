<template>
  <div
    relative
    w="$wb-input-width"
    h="$wb-input-height"
    p="x-$wb-input-padding y-2px"
    bg="$wb-input-background"
    rounded="$wb-input-radius"
    ring="1 $wb-input-border"
    overflow="hidden"
    focus-within="outline outline-2 outline-$wb-color-primary"
    flex="inline"
    items="center"
    gap="$wb-input-gap"
    :class="propsClasses"
    :style="propsStyles"
    @click="setFocus"
  >
    <PrefixNode />
    <input
      ref="InputRef"
      v-bind="$attrs"
      :value="inputValue"
      :maxlength="maxLength"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder ?? 'Please input'"
      border="none"
      flex="1"
      w="full"
      h="full"
      color="$wb-input-text"
      class="wb-input-content"
      @input="setInputValue(($event as any).target.value)"
      @enter="emits('enter')"
      @blur="emits('blur')"
    />
    <button
      v-if="icon || $slots.icon || loading || clearable"
      tabindex="-1"
      flex="~ shrink-0"
      items="center"
      justify="center"
      color="$wb-color-text-placeholder"
    >
      <i v-if="loading" w="1em" h="1em" i="svg-spinners-180-ring" />
      <i
        v-else-if="clearable && inputValue"
        w="1.25em"
        h="1.25em"
        i="mdi-close-circle"
        class="wb-input-clear"
        @click.stop="handleClear"
      />
      <IconNode v-else />
    </button>
    <SuffixNode />
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode, useVModel } from '@/composables'
import { ref, toRefs } from 'vue'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbInput' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses({
  valueProps: ['type', 'align', 'shape', 'size'],
  nameProps: ['loading', 'disabled', 'readonly', 'clearable']
})
const propsStyles = useStyles()

const renderNode = useNode()
const PrefixNode = () => renderNode('prefix')
const SuffixNode = () => renderNode('suffix')
const IconNode = () => renderNode('icon')

const [inputValue, setInputValue] = useVModel<string>({ props: toRefs(props) })

const InputRef = ref()
function setFocus() {
  InputRef.value?.focus()
}

function handleClear() {
  setInputValue('')
  emits('clear')
}
</script>
