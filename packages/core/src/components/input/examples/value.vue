<template>
  <wb-space vertical>
    <wb-input v-model="inputValue" />
    <wb-input v-model:value="inputValue" />
    <wb-button block @click="handleClick">changeValue</wb-button>
  </wb-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
function handleClick() {
  inputValue.value += '1'
}
</script>
