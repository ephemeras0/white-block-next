<template>
  <MySlider @click="handleClick"> button </MySlider>
</template>

<script setup lang="ts">
// @ts-ignore
import { useSlider } from 'white-block'

const { node: MySlider } = useSlider({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
