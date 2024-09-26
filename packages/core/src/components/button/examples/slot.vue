<template>
  <wb-space>
    <wb-button>
      <template #prefix><i class="i-tdesign:search" /></template>
      <span>prefix</span>
    </wb-button>
    <wb-button type="plain" prefix="prefix" />
    <wb-button type="plain" :prefix="SearchIconNode">
      <span>prefix</span>
    </wb-button>
    <wb-button>
      <template #suffix><i class="i-tdesign:edit" /></template>
      <span>suffix</span>
    </wb-button>
    <wb-button type="plain" suffix="suffix" />
    <wb-button type="plain" :suffix="EditIconNode">
      <span>suffix</span>
    </wb-button>
  </wb-space>
</template>

<script setup lang="tsx">
const SearchIconNode = <i class="i-tdesign:search" />
const EditIconNode = <i class="i-tdesign:edit" />
</script>
