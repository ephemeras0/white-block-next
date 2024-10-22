<template>
  <MyLoading @click="handleClick"> button </MyLoading>
</template>

<script setup lang="ts">
// @ts-ignore
import { useLoading } from 'white-block'

const { node: MyLoading } = useLoading({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
