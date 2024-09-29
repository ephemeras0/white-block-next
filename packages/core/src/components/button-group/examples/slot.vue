<template>
  <wb-button-group @click="clickHandler">
    <wb-button key="1" type="plain">button1</wb-button>
    <wb-button key="2">button2</wb-button>
    <wb-button key="3" type="plain">button3</wb-button>
  </wb-button-group>
</template>

<script setup lang="ts">
function clickHandler(key: string) {
  console.log(`click: button${key}`)
}
</script>
