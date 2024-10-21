<template>
  <wb-form
    ref="FormRef"
    :data="formData"
    :rules="FORM_RULES"
    @submit="onSubmit"
    @reset="onReset"
  >
    <wb-form-item label="Name" name="name">
      <wb-input v-model="formData.name" placeholder="Input name" w="full" />
    </wb-form-item>
    <wb-form-item label="Phone" name="phone">
      <wb-input v-model="formData.phone" placeholder="Input phone" w="full" />
    </wb-form-item>
    <wb-form-item label="Gender" name="gender">
      <wb-radio-group
        v-model="formData.gender"
        :options="GENDER_OPTIONS"
        w="full"
      />
    </wb-form-item>
    <wb-form-item>
      <wb-space>
        <wb-button form-type="submit" block>submit</wb-button>
        <wb-button form-type="reset" block>reset</wb-button>
        <wb-button type="default" block @click="onValidate">
          validate
        </wb-button>
        <wb-button type="default" block @click="onClearValidate">
          clearValidate
        </wb-button>
      </wb-space>
    </wb-form-item>
  </wb-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const GENDER_OPTIONS = [
  { label: 'male', value: '1' },
  { label: 'female', value: '2' }
]

const formData = ref({
  name: '',
  phone: '',
  gender: '1'
})

const FORM_RULES = {
  name: [{ required: true, message: '姓名必填', type: 'warning' }]
}

const FormRef = ref()
function onValidate() {
  FormRef.value.validate()
}
function onClearValidate() {
  FormRef.value.clearValidate()
}
function onReset() {
  formData.value = {
    name: '',
    phone: '',
    gender: '1'
  }
}
function onSubmit(result: any) {
  console.log(result)
}
</script>
