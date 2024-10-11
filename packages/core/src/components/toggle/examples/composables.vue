<template>
  <MyToggle @change="handleChange" />
</template>

<script setup lang="ts">
// @ts-ignore
import { useToggle } from 'white-block'

const { node: MyToggle, value } = useToggle({
  defaultValue: true,
  shape: 'rectangle'
})

function handleChange(data: boolean) {
  console.log('change:', data, value.value)
}
</script>
