<template>
  <MyInput @change="handleChange" />
</template>

<script setup lang="ts">
// @ts-ignore
import { useInput } from 'white-block'

const { node: MyInput, value } = useInput({
  placeholder: 'maxlength 5',
  maxLength: 5
})

function handleChange(text: string) {
  console.log('change:', text, value.value)
}
</script>
