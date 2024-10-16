<template>
  <div
    sticky
    top="$wb-doc-height-header"
    w="60"
    flex="none"
    h="[calc(100vh-var(--wb-doc-height-header))]"
    p="8"
    class="hidden xl:block scrollable"
  >
    <div m="b-8">
      <wb-select
        :options="[{ label: '0.0.1', value: '0.0.1' }]"
        placeholder="0.0.1"
      ></wb-select>
    </div>
    <div text="sm" flex="~ col" gap="4">
      <div v-for="group in theme.sidebar" :key="group.text">
        <div p="y-1" color="$wb-color-text-main" select="none">
          {{ group.text }}
        </div>
        <div
          v-for="item in group.items"
          :key="item.text"
          class="group"
          p="y-1"
          flex="~ row"
          items="center"
          gap="1.5 lg:2"
          color="$wb-color-text-secondly hover:$wb-color-text-main"
          cursor="pointer"
          transition="color ease-in duration-200"
          select="none"
          :style="getStyles(item.link)"
          @click="toPage(item.link)"
        >
          <div text="sm">{{ item.text }}</div>
          <div v-if="EXTERNAL_URL_RE.test(item.link)">
            <div w="4" h="4" class="i-heroicons-arrow-up-right-20-solid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute, useRouter, withBase } from 'vitepress'

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

const { theme } = useData()
const router = useRouter()
const route = useRoute()

function getStyles(link: string) {
  const match = route.path === withBase(link)
  if (match) {
    return {
      '--wb-color-text-secondly': 'var(--wb-color-primary)',
      '--wb-color-text-main': 'var(--wb-color-primary)'
    }
  }
  return {}
}

function toPage(link: string) {
  router.go(withBase(link))
}
</script>
