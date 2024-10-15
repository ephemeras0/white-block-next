<template>
  <MyRadioGroup @click="handleClick"> button </MyRadioGroup>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRadioGroup } from 'white-block'

const { node: MyRadioGroup } = useRadioGroup({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
