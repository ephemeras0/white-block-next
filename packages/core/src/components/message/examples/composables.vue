<template>
  <MyMessage @click="handleClick"> button </MyMessage>
</template>

<script setup lang="ts">
// @ts-ignore
import { useMessage } from 'white-block'

const { node: MyMessage } = useMessage({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
