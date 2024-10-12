<template>
  <demo-box w="72">
    <template #top>
      <wb-radio-group
        v-model="align"
        :options="options"
        type="tab"
        shape="round"
      />
    </template>
    <wb-space :align="align">
      <wb-button
        v-for="item in 3"
        :key="item"
        :style="{ width: `${item}rem`, height: `${item}rem` }"
      >
        {{ item }}
      </wb-button>
    </wb-space>
  </demo-box>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' }
]
const align = ref('md')
</script>
