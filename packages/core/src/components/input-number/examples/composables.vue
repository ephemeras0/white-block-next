<template>
  <MyInputNumber @click="handleClick"> button </MyInputNumber>
</template>

<script setup lang="ts">
// @ts-ignore
import { useInputNumber } from 'white-block'

const { node: MyInputNumber } = useInputNumber({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
