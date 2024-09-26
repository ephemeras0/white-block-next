<template>
  <div flex="~ col" gap="2">
    <slot v-if="$slots.top" name="top" />
    <div w="full" gap="2">
      <slot v-if="$slots.left" name="left" />
      <div
        min-h="40"
        p="1"
        bg="$wb-color-background"
        rounded="2"
        flex
        items="center"
        justify="center"
      >
        <slot name="default" />
      </div>
      <slot v-if="$slots.right" name="right" />
    </div>
    <slot v-if="$slots.bottom" name="bottom" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DemoBox' })
</script>
