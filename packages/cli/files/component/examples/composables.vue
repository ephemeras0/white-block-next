<template>
  <My{{ COMPONENT_PASCAL }} @click="handleClick"> button </My{{ COMPONENT_PASCAL }}>
</template>

<script setup lang="ts">
// @ts-ignore
import { use{{ COMPONENT_PASCAL }} } from 'white-block'

const { node: My{{ COMPONENT_PASCAL }} } = use{{ COMPONENT_PASCAL }}({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
