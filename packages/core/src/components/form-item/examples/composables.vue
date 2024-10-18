<template>
  <MyFormItem @click="handleClick"> button </MyFormItem>
</template>

<script setup lang="ts">
// @ts-ignore
import { useFormItem } from 'white-block'

const { node: MyFormItem } = useFormItem({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
