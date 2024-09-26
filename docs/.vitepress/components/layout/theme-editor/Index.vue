<template>
  <div
    w="96"
    h="screen"
    p="x-3 y-5"
    bg="$wb-color-background"
    border="0 l-1 solid $wb-color-border-soft"
    shadow="lg"
    flex="~ col"
    gap="4"
  >
    <div w="full" flex justify="between" items="center">
      <div>Theme Editor</div>
      <wb-button type="ghost" theme="default" @click="emits('close')">
        <div w="5" h="5" class="i-heroicons-x-mark"></div>
      </wb-button>
    </div>
    <div w="full" h="[calc(100%-6rem)]" text="sm" flex gap="2">
      <div
        w="14"
        h="full"
        flex="~ col"
        gap="2"
        @click.stop="
          clickDelegate($event, 'category-item', handleSelectCategory)
        "
      >
        <div
          v-for="item in THEME_CATEGORY"
          :key="item.value"
          :data-value="item.value"
          :bg="
            currentCategory === item.value
              ? '$wb-color-container'
              : 'hover:$wb-color-container'
          "
          p="1"
          rounded="3"
          flex="~ col"
          gap="1"
          items="center"
          cursor="pointer"
          class="category-item"
        >
          <div overflow="hidden" rounded="3">
            <img w="12" aspect-ratio="1" :src="item.img" />
          </div>
          <div fw="400">{{ item.lable }}</div>
        </div>
      </div>
      <div h="full" flex="1 ~ col" gap="6" class="scrollable">
        <component :is="THEME_CATEGORY_COMP[currentCategory]" />
      </div>
    </div>
    <div w="full" h="14" flex="~ row" items="center" gap="2">
      <wb-button flex="1">Reset All</wb-button>
      <wb-button flex="1">Export</wb-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { clickDelegate } from '@/utils'
import ThemeColor from './Color.vue'
import ThemeSize from './Size.vue'
import ThemePreset from './Preset.vue'
import ThemeFont from './Font.vue'

defineOptions({ name: 'ThemeEditor' })
const emits = defineEmits(['close'])

const THEME_CATEGORY = [
  { lable: 'Preset', value: 'preset', img: '/assets/img/theme/preset.svg' },
  { lable: 'Color', value: 'color', img: '/assets/img/theme/color.svg' },
  { lable: 'Size', value: 'size', img: '/assets/img/theme/size.svg' },
  { lable: 'Font', value: 'font', img: '/assets/img/theme/font.svg' }
]

const THEME_CATEGORY_COMP = {
  preset: ThemePreset,
  color: ThemeColor,
  size: ThemeSize,
  font: ThemeFont
}

const currentCategory = ref('preset')
function handleSelectCategory(dataset: Record<string, string>) {
  const { value } = dataset
  currentCategory.value = value
}
</script>
