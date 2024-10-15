<template>
  <MyPlaceholder @click="handleClick"> button </MyPlaceholder>
</template>

<script setup lang="ts">
// @ts-ignore
import { usePlaceholder } from 'white-block'

const { node: MyPlaceholder } = usePlaceholder({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
