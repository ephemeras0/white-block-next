<template>
  <!--
    title: Component Height
    item: height
    size: sm | md | lg
    value: 18 | 24
   -->
  <div
    v-for="item in COMPONENT_SIZE_ITEM"
    :key="`SIZE_ITEM_${item}`"
    flex="~ col"
    gap="2"
  >
    <div p="t-2">{{ item.label }}</div>
    <div rounded="2" text="sm" flex="~ col" gap="2">
      <wb-popup
        v-for="size in COMPONENT_SIZE_VALUE_MAP[item.value]"
        :key="`SIZE_ITEM_${size.label}`"
        trigger="click"
        placement="left-start"
        arrow
        :z-index="100"
        @show="
          currentOperationSize =
            changedVariables[`--wb-comp-${item.value}-${size.label}`]?.data ||
            size.value
        "
      >
        <div p="y-2 x-3" bg="$wb-color-container" rounded="2">
          <div text="$wb-color-text-2">
            {{ `--wb-comp-${item.value}-${size.label}` }}
          </div>
          <div w="full" flex justify="between" items="center">
            <div text="$wb-color-text-4">
              <span>{{ `--wb-size-${size.value}` }}</span>
              <span
                v-if="changedVariables[`--wb-comp-${item.value}-${size.label}`]"
                >:
                {{
                  changedVariables[`--wb-comp-${item.value}-${size.label}`]
                    .data
                }}px</span
              >
            </div>
            <div h="1em" flex="~ row shrink-0" items="center">
              <div
                relative
                h="1px"
                bg="$wb-color-primary"
                :style="{ width: `var(--wb-comp-${item.value}-${size.label})` }"
              >
                <div
                  absolute
                  top="-2px"
                  right="0"
                  w="1px"
                  h="5px"
                  bg="$wb-color-primary"
                />
                <div
                  absolute
                  top="-2px"
                  left="0"
                  w="1px"
                  h="5px"
                  bg="$wb-color-primary"
                />
              </div>
            </div>
          </div>
        </div>
        <template #content>
          <div w="36" p="2" flex="~ col" gap="4">
            <wb-input-number
              v-model="currentOperationSize"
              w="full"
              flex="1 ~ inline"
              :min="Math.floor(size.value / 2)"
              :max="Math.floor(size.value * 2)"
              size="sm"
              @change="
                (d: number) => handleSizeChange(d, item.value, size.label)
              "
            />
            <div p="2">
              <wb-slider
                v-model="currentOperationSize"
                :popup-props="{ zIndex: 101, arrow: true }"
                @change="
                  (d: number) => handleSizeChange(d, item.value, size.label)
                "
              >
                slider
              </wb-slider>
            </div>
          </div>
        </template>
      </wb-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'ThemeEditorSize' })

const COMPONENT_SIZE_VALUE_MAP = {
  'height': [
    { label: 'xs', value: 18 },
    { label: 'sm', value: 24 },
    { label: 'md', value: 32 },
    { label: 'lg', value: 40 },
    { label: 'xl', value: 48 }
  ],
  'padding': [
    { label: 'xs', value: 4 },
    { label: 'sm', value: 6 },
    { label: 'md', value: 8 },
    { label: 'lg', value: 10 },
    { label: 'xl', value: 12 }
  ],
  'font-size': [
    { label: 'xs', value: 10 },
    { label: 'sm', value: 12 },
    { label: 'md', value: 14 },
    { label: 'lg', value: 16 },
    { label: 'xl', value: 18 }
  ],
  'radius': [
    { label: 'xs', value: 2 },
    { label: 'sm', value: 3 },
    { label: 'md', value: 4 },
    { label: 'lg', value: 5 },
    { label: 'xl', value: 6 }
  ],
  'content-gap': [
    { label: 'xs', value: 2 },
    { label: 'sm', value: 3 },
    { label: 'md', value: 4 },
    { label: 'lg', value: 5 },
    { label: 'xl', value: 6 }
  ]
}

const COMPONENT_SIZE_ITEM = [
  { label: 'Height', value: 'height' },
  { label: 'Padding', value: 'padding' },
  { label: 'Font Size', value: 'font-size' },
  { label: 'Radius', value: 'radius' },
  { label: 'Content Gap', value: 'content-gap' }
]

const currentOperationSize = ref(0)
const changedVariables: any = ref({})

function handleSizeChange(data: number, item: string, size: string) {
  currentOperationSize.value = data
  const variable = `--wb-comp-${item}-${size}`
  const variableValue = `calc(${data} / 16 * 1rem)`
  changedVariables.value[variable] = { data, style: variableValue }
  document.documentElement.style.setProperty(variable, variableValue)
}
</script>
