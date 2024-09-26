<template>
  <header
    sticky
    top="0"
    w="full"
    h="$wb-height-header"
    z="100"
    bg="dark:[rgb(var(--wb-vc-gray-950))]"
    border="0 b-px solid $wb-color-border-soft"
    @click.stop="
      clickDelegate(
        $event,
        'header-option-item',
        handleMenuOptions,
        hideMenuPanel
      )
    "
  >
    <div
      max-w="lg:400"
      h="full"
      m="x-auto"
      p="x-2 md:x-6 lg:x-6"
      flex="~ row"
      justify="between"
      items="center"
      gap="3"
    >
      <div flex="lg:1" items="center" justify="start">
        <a
          p="1.5"
          :href="`${localePrefix}/`"
          un-text="4"
          font="semibold"
          flex="~ row"
          items="center"
        >
          <img
            w="auto"
            h="6"
            :src="withBase('/logo.png')"
            filter=" drop-shadow-sm"
            alt="logo"
          />
          <span m="l-2">{{ site.title }}</span>
        </a>
      </div>
      <div class="hidden lg:flex" flex="lg:1">
        <VPNavBarSearch class="search" />
        <VPNavBarMenu />
      </div>
      <div flex="lg:1 ~ row" items="center" justify="end" gap="1.5">
        <button
          data-value="theme"
          class="header-option-item"
          p="1.5"
          color="$wb-color-primary"
        >
          <div w="5" h="5" class="i-heroicons-swatch-20-solid" />
        </button>
        <button data-value="search" class="header-option-item" p="1.5">
          <div w="5" h="5" class="i-heroicons-magnifying-glass" />
        </button>
        <button data-value="lang" class="header-option-item" p="1.5">
          <div w="5" h="5" class="i-tdesign-translate" />
        </button>
        <button data-value="mode" class="header-option-item" p="1.5">
          <div v-if="isDark" w="5" h="5" class="i-heroicons-moon-20-solid" />
          <div v-else w="5" h="5" class="i-heroicons-sun-20-solid" />
        </button>
        <!-- TODO: 改成 wb-button-group -->
        <!-- <wb-button type="text" theme="default">
          <div v-if="isDark" w="5" h="5" class="i-heroicons-moon-20-solid" />
          <div v-else w="5" h="5" class="i-heroicons-sun-20-solid" />
        </wb-button> -->
        <a
          href="https://github.com/Kythuen/white-block"
          class="header-option-item"
          p="1.5"
        >
          <div w="5" h="5" class="i-simple-icons-github" />
        </a>
        <button data-value="menu" class="header-option-item lg:hidden" p="1.5">
          <div
            v-if="!showMenuPanel"
            w="5"
            h="5"
            class="i-heroicons-bars-3-20-solid"
          />
          <div v-else w="5" h="5" class="i-heroicons-x-mark-20-solid" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { clickDelegate } from '@/utils'
// import { useState } from '@/composables'
import { useData, useRouter, withBase } from 'vitepress'
import VPNavBarMenu from 'vitepress/dist/client/theme-default/components/VPNavBarMenu.vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
import { computed, ref } from 'vue'
// import DocumentNavPanel from '~/components/layout/document/DocumentNavPanel.vue'

const emits = defineEmits<{ theme: [visible: boolean] }>()
const { site, isDark, lang } = useData()

const showMenuPanel = ref(false)
function hideMenuPanel() {
  showMenuPanel.value = false
}

const localePrefix = computed(() =>
  lang.value === 'en' ? '' : `/${lang.value}`
)

const router = useRouter()
function handleMenuOptions(dataset: Record<string, string>) {
  const { value } = dataset
  switch (value) {
    case 'mode': {
      isDark.value = !isDark.value
      break
    }
    case 'lang': {
      let targetPath = ''
      const { path } = router.route
      if (path.includes('/zh')) {
        targetPath = path.replace('/zh', '')
      } else {
        const { base } = site.value
        const pure = path.replace(base, '')
        targetPath = `${base}zh/${pure}`
      }
      router.go(targetPath)
      break
    }
    case 'menu': {
      showMenuPanel.value = !showMenuPanel.value
      break
    }
    case 'theme': {
      emits('theme', true)
      break
    }
    case 'search': {
      ;(
        document.querySelector('.DocSearch-Button') as HTMLButtonElement
      )?.click()
      break
    }
  }
}
</script>
