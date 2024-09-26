<template>
  <div p="x-2 y-3" bg="$wb-color-container" rounded="2" flex="~ col" gap="2">
    <div>
      <div m="b-2">Primary Color</div>
      <!-- Status Color -->
      <!-- Common Color -->
      <div flex="~ col" gap="2">
        <div
          flex
          gap="2"
          @click="clickDelegate($event, 'color-item', setPrimaryColor)"
        >
          <div
            v-for="item in PRIMARY_COLORS"
            :key="item.value"
            :data-value="item.value"
            w="14"
            h="14"
            rounded="2"
            cursor="pointer"
            class="color-item"
            :style="{ background: item.value }"
          />
        </div>
        <wb-popup
          trigger="click"
          placement="left-start"
          :z-index="100"
          destroy-on-hide
          arrow
        >
          <div
            h="16"
            p="1 hover:1.5"
            overflow="hidden"
            bg="$wb-color-layer"
            rounded="2.5"
            transition="all duration-150 ease-in-out"
            flex
          >
            <div
              w="full"
              p="y-2 x-3"
              bg="$wb-color-primary"
              rounded="2"
              text="sm"
              op="80"
            >
              <div>--wb-color-primary</div>
              <div w="full" flex justify="between" items="center">
                <div>{{ primaryColor }}</div>
                <i w="4" h="4" i="tdesign-edit" />
              </div>
            </div>
          </div>
          <template #content>
            <wb-color-picker
              v-model="primaryColor"
              size="lg"
              pure
              @change="changePrimaryColor"
            />
          </template>
        </wb-popup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Color from 'color'
import { ref } from 'vue'
import { clickDelegate } from '@/utils'

defineOptions({ name: 'ThemeEditorColor' })

const PRIMARY_COLORS = [
  { label: '#00dc82', value: '#00dc82' },
  { label: '#0052d9', value: '#0052d9' },
  { label: '#0894fa', value: '#0894fa' },
  { label: '#f3b814', value: '#f3b814' }
]

const primaryColor = ref('#00dc82')
function changePrimaryColor(data: string) {
  primaryColor.value = data
  const palette: any = Color(data)
  const { color } = palette.rgb()
  document.documentElement.style.setProperty('--wb-vc-primary', color.join(' '))
}
function setPrimaryColor(dataset: Record<string, string>) {
  const { value } = dataset
  changePrimaryColor(value)
}
</script>
