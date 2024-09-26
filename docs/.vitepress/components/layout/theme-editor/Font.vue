<template>
  <div
    p="x-2"
    flex="~ row wrap"
    gap="2"
    @click="clickDelegate($event, 'font-item', setPresetTheme)"
  >
    <div
      v-for="item in FONT_LIST"
      :key="item.value"
      :data-value="item.value"
      w="full"
      p="x-4 y-3"
      bg="$wb-color-soft"
      rounded="2"
      flex
      justify="between"
      items="center"
      cursor="pointer"
      class="font-item action-ghost--default"
    >
      <div flex="~ col" gap="2" :style="{ fontFamily: item.value }">
        <div>
          {{ item.lable }}
        </div>
        <div color="$wb-color-text-secondly">
          <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div>abcdefghijklmnopqrstuvwxyz</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clickDelegate } from '@/utils'

defineOptions({ name: 'ThemeEditorPreset' })

const FONT_LIST = [
  {
    lable: 'Inter',
    value: 'Inter'
  },
  {
    lable: 'DM Sans',
    value: 'DM Sans'
  },
  {
    lable: 'Roboto',
    value: 'Roboto',
    font: `Roboto`
  },
  {
    lable: 'New Amsterdam',
    value: 'New Amsterdam'
  }
]

function setPresetTheme(dataset: Record<string, string>) {
  const { value } = dataset
  if (!value) return
  document.documentElement.style.setProperty(
    '--vp-font-family-base',
    `${value}, sans-serif`
  )
}
</script>
