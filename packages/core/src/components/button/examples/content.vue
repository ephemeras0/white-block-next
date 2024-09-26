<template>
  <wb-space>
    <wb-button>slot</wb-button>
    <wb-button type="plain"><template #content>slot</template></wb-button>
    <wb-button content="content" />
    <wb-button type="plain" :content="() => 'content'" />
    <wb-button :content="ContentNode" />
    <wb-button type="plain" :content="() => ContentNode" />
  </wb-space>
</template>

<script setup lang="tsx">
const ContentNode = <div>vnode</div>
</script>
