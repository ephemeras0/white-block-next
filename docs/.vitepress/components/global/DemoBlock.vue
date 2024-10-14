<template>
  <div
    w="full"
    m="y-4"
    color="$wb-color-text-4"
    bg="[rgb(var(--vc-gray-50))] dark:[rgb(var(--vc-gray-950))]"
    ring="1 inset $wb-color-border-base"
    rounded="1"
    overflow="hidden"
    class="vp-raw"
  >
    <div h="12"></div>
    <div min-h="40 md:60" p="6 md:10" flex items-center justify-center>
      <div flex="~ row wrap" items-center gap="2">
        <component :is="DemoComponent" v-if="DemoComponent" />
      </div>
    </div>
    <div
      w="full"
      h="12"
      p="2"
      flex="~ row"
      justify="end"
      gap="1"
      @click.stop="
        clickDelegate($event, 'operation-item', handleCodeOperations)
      "
    >
      <div
        v-for="item in CODE_BLOCK_OPERATIONS"
        :key="item.name"
        :data-value="item.name"
        class="operation-item"
        flex="inline"
        w="8"
        h="8"
        p="2"
        :bg="
          showCode && item.name === 'code'
            ? '$wb-c-bg-copy-code-hover'
            : 'hover:$wb-c-bg-copy-code-hover'
        "
        rounded="1"
        select="none"
        transition="all duration-100 ease"
        cursor="pointer"
      >
        <i :class="item.icon" />
      </div>
    </div>
    <div
      w="full"
      :max-h="showCode ? '140' : '0'"
      bg="$wb-c-bg-demo-code"
      :border="`${showCode ? '0 t-px' : '0'} solid $wb-color-border-base`"
      overflow="y-auto"
      transition="all duration-300 ease-in-out"
      class="scrollable"
    >
      <div p="x-6" v-html="compCode" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { clickDelegate } from '@/utils'
import { createHighlighter } from 'shiki'
import { ref } from 'vue'
import { copyToClipboard, utoa } from '~/utils'

defineOptions({ name: 'DemoBlock', inheritAttrs: false })

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: ''
  }
})

const components: Record<string, any> = import.meta.glob(
  '../../../../packages/core/src/components/**/*.vue'
)
const DemoComponent =
  (
    await components[
      `../../../../packages/core/src/components/${props.path}`
    ]?.()
  )?.default ?? null

const shiki = await createHighlighter({
  themes: ['material-theme-palenight'],
  langs: ['vue']
})

const compCode = shiki.codeToHtml(
  decodeURIComponent(props.source).replace(/\/\/\s+\S*\s/g, ''),
  {
    lang: 'vue',
    theme: 'material-theme-palenight'
  }
)

const showCode = ref(false)

const CODE_BLOCK_OPERATIONS = [
  { name: 'stackblitz', icon: 'i-simple-icons:stackblitz' },
  { name: 'copy', icon: 'i-mdi:content-copy' },
  { name: 'code', icon: 'i-ion:code-slash' }
]
function handleCodeOperations(dataset: Record<string, string>, e: any) {
  const { value } = dataset
  switch (value) {
    case 'code':
      showCode.value = !showCode.value
      break
    case 'copy': {
      if (!import.meta.env.SSR) {
        copyToClipboard(decodeURIComponent(props.source))
        let iconDom: any = null
        if (e.target.className === 'operation-item') {
          iconDom = e.target.firstElementChild
        } else if (e.target.className === 'i-mdi:content-copy') {
          iconDom = e.target
        }
        iconDom.className = 'i-mdi:check'
        setTimeout(() => {
          iconDom.className = 'i-mdi:content-copy'
        }, 1000)
      }
      break
    }
    case 'stackblitz': {
      const fileCode = decodeURIComponent(props.source)
      const files = {
        'App.vue': fileCode
      }

      const tabId = `__blank${new Date().getTime()}`
      if (!import.meta.env.SSR) {
        window.open(
          // `http://localhost:5173/#${btoa(encodeURIComponent(JSON.stringify(files)))}`,
          `http://localhost:5173/#${utoa(JSON.stringify(files))}`,
          tabId
        )
      }
      break
    }
  }
}
</script>
