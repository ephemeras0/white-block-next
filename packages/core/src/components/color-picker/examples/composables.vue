<template>
  <MyColorPicker @click="handleClick"> button </MyColorPicker>
</template>

<script setup lang="ts">
// @ts-ignore
import { useColorPicker } from 'white-block'

const { node: MyColorPicker } = useColorPicker({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
