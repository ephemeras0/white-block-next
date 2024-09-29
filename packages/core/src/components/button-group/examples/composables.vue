<template>
  <MyButtonGroup @click="handleClick" />
</template>

<script setup lang="ts">
// @ts-ignore
import { useButtonGroup } from 'white-block'

const { node: MyButtonGroup } = useButtonGroup({
  type: 'plain',
  options: [
    { key: '1', content: 'button1' },
    { key: '2', content: 'button2' },
    { key: '3', content: 'button3' }
  ]
})

function handleClick(key: string) {
  console.log('click button:', key)
}
</script>
