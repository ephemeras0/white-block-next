<template>
  <MySelect @click="handleClick"> button </MySelect>
</template>

<script setup lang="ts">
// @ts-ignore
import { useSelect } from 'white-block'

const { node: MySelect } = useSelect({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
