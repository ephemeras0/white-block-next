<template>
  <wb-space>
    <wb-button v-for="item in 3" :key="item">
      {{ item }}
    </wb-button>
  </wb-space>
</template>
