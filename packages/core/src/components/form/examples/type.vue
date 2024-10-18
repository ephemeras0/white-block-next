<template>
  <wb-form :label-width="100">
    <wb-form-item label="Name">
      <wb-input placeholder="Input name" />
    </wb-form-item>
    <wb-form-item label="Phone">
      <wb-input placeholder="Input phone" />
    </wb-form-item>
    <wb-form-item label="Gender" :label-width="96">
      <wb-radio-group :options="GENDER_OPTIONS" />
    </wb-form-item>
    <wb-form-item>
      <wb-button type="submit" block>Submit</wb-button>
    </wb-form-item>
  </wb-form>
</template>

<script setup lang="ts">
const GENDER_OPTIONS = [
  { label: 'male', value: '1' },
  { label: 'female', value: '2' }
]
</script>
