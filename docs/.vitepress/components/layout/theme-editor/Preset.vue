<template>
  <div
    p="x-2"
    flex="~ row wrap"
    gap="2"
    @click="clickDelegate($event, 'preset-item', setPresetTheme)"
  >
    <div
      v-for="item in PTESET_THEME"
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
      class="preset-item action-ghost--default"
    >
      <div flex items="center" gap="3">
        <img max-w="10" h="10" :src="item.img" />
        <div>{{ item.lable }}</div>
      </div>
      <div
        v-if="item.value !== 'white-block'"
        w="5"
        h="5"
        class="i-tdesign-download"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { clickDelegate } from '@/utils'

defineOptions({ name: 'ThemeEditorPreset' })

const PTESET_THEME = [
  {
    lable: 'White Block',
    value: 'white-block',
    img: '/assets/img/theme/white-block.svg'
  },
  { lable: 'VSCode', value: 'vscode', img: '/assets/img/theme/vscode.svg' },
  { lable: 'TDesign', value: 'tdesign', img: '/assets/img/theme/tdesign.svg' },
  {
    lable: 'Tailwind',
    value: 'tailwind',
    img: '/assets/img/theme/tailwind.svg'
  }
]

let currentPresetTheme = ''
function setPresetTheme(dataset: Record<string, string>) {
  const { value } = dataset
  if (!value) return

  const head = document.getElementsByTagName('head')[0]
  if (currentPresetTheme) {
    const preLink = document.querySelector(
      `link[href="/assets/css/${currentPresetTheme}/index.css"]`
    )
    if (preLink) {
      head.removeChild(preLink)
    }
  }

  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = `/assets/css/${value}/index.css`
  head.appendChild(link)

  currentPresetTheme = value
}
</script>
