<template>
  <div
    fixed
    z="90"
    top="0"
    right="0"
    bottom="0"
    left="0"
    p="t-$wb-height-header"
    bg="$wb-color-background"
    class="lg:hidden"
  >
    <div p="x-4 y-3">
      <div flex="~ col" gap="3">
        <div
          v-for="item in theme.nav"
          :key="item.text"
          class="group"
          flex="~ row"
          items="center"
          gap="1.5 lg:2"
          color="$nav-item-c-content"
          :style="getStyles(item.link)"
          @click="toPage(item.link)"
        >
          <div
            p="1"
            rounded="md"
            bg="$nav-item-c-ring-bg"
            ring="1 $nav-item-c-ring-border"
            flex="inline"
          >
            <div w="4" h="4" class="i-heroicons-book-open" />
          </div>
          <div text="sm $nav-item-c-text" fw="$nav-item-fw-text">
            {{ item.text }}
          </div>
          <div v-if="EXTERNAL_URL_RE.test(item.link)">
            <div w="4" h="4" class="i-heroicons-arrow-up-right-20-solid" />
          </div>
        </div>
      </div>
      <div w="full" m="y-4">
        <div border="0 t-px dashed $wb-color-border-soft" />
      </div>
      <div h="160">
        <!-- <DocumentSidebar /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute, useRouter, withBase } from 'vitepress'
// import DocumentSidebar from './DocumentSidebar.vue'

const emits = defineEmits<{ change: [link: string] }>()
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

const { theme, isDark } = useData()
const router = useRouter()
const route = useRoute()

function getStyles(link: string) {
  const match = route.path.startsWith(withBase(link))
  if (match) {
    return {
      '--nav-item-c-content': 'var(--vc-background)',
      '--nav-item-c-ring-bg': 'var(--wb-color-primary)',
      '--nav-item-c-ring-border': 'var(--wb-color-primary)',
      '--nav-item-c-text': 'var(--wb-color-primary)',
      '--nav-item-fw-text': '700'
    }
  }
  if (isDark.value) {
    return {
      '--nav-item-c-content': 'rgb(var(--vc-gray-400))',
      '--nav-item-c-ring-bg': 'rgb(var(--vc-gray-800),50%)',
      '--nav-item-c-ring-border': 'rgb(var(--vc-gray-700))',
      '--nav-item-c-text': '',
      '--nav-item-fw-text': ''
    }
  }
  return {
    '--nav-item-c-content': 'rgb(var(--vc-gray-600))',
    '--nav-item-c-ring-bg': 'rgb(var(--vc-gray-800),50%)',
    '--nav-item-c-ring-border': 'rgb(var(--vc-gray-300))',
    '--nav-item-c-text': '',
    '--nav-item-fw-text': ''
  }
}

function toPage(link: string) {
  router.go(withBase(link))
  emits('change', link)
}
</script>
