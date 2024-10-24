<template>
  <div
    flex="~ none"
    w="8"
    h="8"
    rounded="full"
    overflow="hidden"
    select="none"
    style="
      background: #ffffff66;
      background-image: linear-gradient(
          45deg,
          #c5c5c5 25%,
          transparent 0,
          transparent 75%,
          #c5c5c5 0,
          #c5c5c5
        ),
        linear-gradient(
          45deg,
          #c5c5c5 25%,
          transparent 0,
          transparent 75%,
          #c5c5c5 0,
          #c5c5c5
        );
      background-size: 6px 6px;
      background-position: 0 0 3px 3px;
    "
  >
    <div
      w="full"
      h="full"
      overflow="hidden"
      text="white"
      :style="{ background: selectedColor }"
      flex
      justify="center"
      items="center"
      class="group"
      cursor="pointer"
      @click="handleCopyColor"
    >
      <i
        class="hidden !group-hover:block"
        :i="copyState ? 'tdesign-check' : 'mdi-content-copy'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'ColorPickerPreview' })
defineProps({
  selectedColor: { type: String, default: '#ff0000ff' }
})
const emits = defineEmits<{ copy: [] }>()

const copyState = ref(false)
function handleCopyColor() {
  copyState.value = true
  emits('copy')
  setTimeout(() => {
    copyState.value = false
  }, 500)
}
</script>
