<template>
  <MyRadio @click="handleClick"> button </MyRadio>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRadio } from 'white-block'

const { node: MyRadio } = useRadio({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
