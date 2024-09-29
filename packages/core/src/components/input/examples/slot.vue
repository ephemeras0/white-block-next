<template>
  <wb-space vertical>
    <wb-input placeholder="prefix">
      <template #prefix>
        <SearchIconNode />
      </template>
    </wb-input>
    <wb-input prefix="pre" placeholder="prefix" />
    <wb-input :prefix="SearchIconNode" placeholder="prefix">
      <span>prefix</span>
    </wb-input>
    <wb-input placeholder="suffix">
      <template #suffix>
        <EditIconNode />
      </template>
    </wb-input>
    <wb-input suffix="suf" placeholder="suffix" />
    <wb-input :suffix="EditIconNode" placeholder="suffix">
      <span>suffix</span>
    </wb-input>
  </wb-space>
</template>

<script setup lang="tsx">
// @ts-ignore
const SearchIconNode = <i class="i-tdesign:search" />
// @ts-ignore
const EditIconNode = <i class="i-tdesign:edit" />
</script>
