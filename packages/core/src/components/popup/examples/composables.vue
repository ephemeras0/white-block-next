<template>
  <MyPopup @click="handleClick"> button </MyPopup>
</template>

<script setup lang="ts">
// @ts-ignore
import { usePopup } from 'white-block'

const { node: MyPopup } = usePopup({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
