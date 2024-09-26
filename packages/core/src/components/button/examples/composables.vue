<template>
  <MyButton @click="handleClick">useButton</MyButton>
</template>

<script setup lang="ts">
// @ts-ignore
import { useButton } from 'white-block'

const { node: MyButton } = useButton({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
