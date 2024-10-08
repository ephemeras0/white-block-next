<template>
  <MyToggle @click="handleClick"> button </MyToggle>
</template>

<script setup lang="ts">
// @ts-ignore
import { useToggle } from 'white-block'

const { node: MyToggle } = useToggle({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
