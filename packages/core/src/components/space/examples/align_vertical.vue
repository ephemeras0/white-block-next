<template>
  <wb-space>
    <wb-button
      v-for="item in 3"
      :key="item"
      :style="{ width: `${item}rem`, height: `${item}rem` }"
    >
      {{ item }}
    </wb-button>
  </wb-space>
</template>
