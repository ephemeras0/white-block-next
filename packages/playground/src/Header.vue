<template>
  <div
    w="full"
    h="16"
    p="x-2 md:x-6 lg:x-6"
    border="0 b-px solid $wb-color-border-base"
    flex
    items="center"
    justify="between"
  >
    <a
      :href="
        isProd
          ? 'https://kythuen.github.io/white-block-next'
          : 'http://localhost:28801/'
      "
      un-text="lg"
      font="semibold"
      flex="~ row"
      items="center"
    >
      <img w="auto" h="8" src="/logo.png" filter=" drop-shadow-sm" alt="logo" />
      <span m="l-2">White Block</span>
    </a>
    <div flex gap="4">
      <div text="xs" flex gap="4" items="center">
        <div flex items="center" gap="2">
          White Block:
          <wb-select
            :options="[
              { label: 'latest', value: '' },
              ...WhiteBlockVersion.map(i => ({ label: i, value: i }))
            ]"
            size="sm"
            placeholder="latest"
            @change="(version: any) => emits('action', 'version', { pkg: 'white-block', version })"
          />
        </div>
        <div flex items="center" gap="2">
          Vue:
          <wb-select
            :options="[
              { label: 'latest', value: '' },
              ...VueVersion.map(i => ({ label: i, value: i }))
            ]"
            size="sm"
            placeholder="latest"
            @change="(version: any) => emits('action', 'version', { pkg: 'vue', version })"
          />
        </div>
        <div flex items="center" gap="2">
          TypeScript:
          <wb-select
            :options="[
              { label: 'latest', value: '' },
              ...TypeScriptVersion.map(i => ({ label: i, value: i }))
            ]"
            size="sm"
            placeholder="latest"
            @change="(version: any) => emits('action', 'version', { pkg: 'typescript', version })"
          />
        </div>
      </div>
      <wb-button-group separate gap="xs" @click="clickHandler">
        <wb-popup
          v-for="item in OPERATIONS"
          :key="item.key"
          trigger="hover"
          placement="bottom"
        >
          <wb-button type="ghost" theme="default" v-bind="item" />
          <template #content>{{ item.label }}</template>
        </wb-popup>
      </wb-button-group>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { gte } from 'semver'
import { shallowRef } from 'vue'
import { ThemeState } from './states'
import { getPkgVersion, isProd } from './utils'

export type ActionType = 'download' | 'version'
export type ActionVersionsPayload = {
  pkg: string
  version: string
}
const emits = defineEmits<{
  action: [type: ActionType, payload?: ActionVersionsPayload]
}>()

const OPERATIONS = [
  {
    key: 'share',
    content: <div w-5 h-5 class="i-heroicons-share" />,
    label: 'Share Link'
  },
  {
    key: 'download',
    content: <div w-5 h-5 class="i-heroicons-arrow-down-tray-solid" />,
    label: 'Download'
  },
  {
    key: 'theme',
    content: <div w-5 h-5 class="i-heroicons-moon-20-solid" />,
    label: 'Theme'
  },
  {
    key: 'github',
    content: <div w-5 h-5 class="i-simple-icons-github" />,
    label: 'Github',
    tag: 'a',
    target: '__blank',
    href: 'https://github.com/Kythuen/white-block'
  }
]
const [theme, setTheme] = ThemeState

const WhiteBlockVersion = shallowRef([])
const VueVersion = shallowRef([])
const TypeScriptVersion = shallowRef([])

async function getDependenciesVersion() {
  WhiteBlockVersion.value = await getPkgVersion('white-block')
  VueVersion.value = (await getPkgVersion('vue')).filter(
    (v: any) => gte(v, '3.3.0') && !v.includes('-')
  )
  TypeScriptVersion.value = (await getPkgVersion('typescript')).filter(
    (v: any) => gte(v, '5.0.0') && !v.includes('dev') && !v.includes('insiders')
  )
}
getDependenciesVersion()

async function clickHandler(key: string, e: MouseEvent) {
  switch (key) {
    case 'theme': {
      setTheme(theme.value === 'dark' ? 'light' : 'dark')
      const domList = e.composedPath?.()
      const target: any = domList.find((dom: any) =>
        dom.className?.includes('wb-button')
      )
      const classes =
        theme.value === 'dark'
          ? 'i-heroicons-moon-20-solid'
          : 'i-heroicons-sun-20-solid'
      target.children[0].setAttribute('class', classes)
      window[0].postMessage({
        action: 'theme-change',
        value: theme.value
      })
      break
    }
    case 'share': {
      await navigator.clipboard.writeText(window.location.href)
      // TODO: Message 组件
      console.log('复制成功')
      break
    }
    case 'download': {
      emits('action', 'download')
      break
    }
  }
}
</script>
