<template>
  <wb-space :gap="0">
    <wb-button type="ghost" color="orange" @click="clickHandler('')">
      <div w="5" h="5" class="i-heroicons-sun-20-solid" />
    </wb-button>
    <wb-button type="ghost" color="blue" @click="clickHandler('dark')">
      <div w="5" h="5" class="i-heroicons-moon-20-solid" />
    </wb-button>
  </wb-space>
</template>

<script setup lang="ts">
function clickHandler(theme: string) {
  document.documentElement.setAttribute('class', theme)
}
</script>
