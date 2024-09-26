<template>
  <wb-space :gap="0">
    <wb-button type="ghost" color="orange" @click="clickHandler">
      <div w="5" h="5" class="i-heroicons-sun-20-solid" />
    </wb-button>
    <wb-button type="ghost" color="blue" :onClick="clickHandler">
      <div w="5" h="5" class="i-heroicons-moon-20-solid" />
    </wb-button>
  </wb-space>
</template>

<script setup lang="ts">
// @ts-ignore
import { useData } from 'vitepress'

const { isDark } = useData()
function clickHandler(e: MouseEvent) {
  isDark.value = !isDark.value
  console.log(`Dark Mode: ${isDark.value}`, e)
}
</script>
