<template>
  <wb-space vertical>
    <wb-input @change="handleChange" placeholder="@change" />
    <wb-input :onChange="handleChange" placeholder="onChange" />
  </wb-space>
</template>

<script setup lang="ts">
function handleChange(text: string) {
  console.log(text)
}
</script>
