<template>
  <MySpace>
    <wb-button v-for="item in 3" :key="item">
      {{ item }}
    </wb-button>
  </MySpace>
</template>

<script setup lang="ts">
// @ts-ignore
import { useSpace } from 'white-block'

const { node: MySpace } = useSpace({
  type: 'plain'
})

function handleClick(e: MouseEvent) {
  console.log('click:', e)
}
</script>
