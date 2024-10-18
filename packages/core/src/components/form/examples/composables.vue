<template>
  <MyForm @click="handleClick"> button </MyForm>
</template>

<script setup lang="ts">
// @ts-ignore
import { useForm } from 'white-block'

const { node: MyForm } = useForm({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
