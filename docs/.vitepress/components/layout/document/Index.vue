<template>
  <div w="full" h="full">
    <div id="DocumentHeaderIndicator" w="full" h="0" />
    <DocumentHeader :focus="isFocusMode">
      <wb-radio-group
        v-model="currentTab"
        :options="TAB_OPTIONS"
        type="tab"
        theme="white"
        size="lg"
        ring="1 inset $wb-color-border-base"
        @change="setCurrentTab"
      />
    </DocumentHeader>
    <div
      w="full"
      m="x-auto"
      p="3 b-20 md:8 md-x-10"
      flex
      gap="8"
      class="vp-doc"
    >
      <div max-w="xl:268" w="full">
        <!-- Content -->
        <div v-show="currentTab === 'content'" class="vp-doc-content">
          <Content />
        </div>
        <!-- API -->
        <div
          v-if="frontmatter?.component"
          v-show="currentTab === 'api'"
          class="vp-doc-api"
        >
          <div
            v-for="(item, name) in page.params.api"
            :key="name"
            relative
            color="$wb-color-text-3"
          >
            <template v-if="item[lang]?.props">
              <h2 :id="`API${name}Props`">
                {{ `${name}Props` }}
                <a class="header-anchor" :href="`#API${name}Props`"></a>
              </h2>
              <div
                class="api-table"
                v-html="JSON.parse(item[lang]?.props || '')"
              />
            </template>
            <template v-if="item[lang]?.events">
              <h2 :id="`API${name}Events`">
                {{ `${name}Events` }}
                <a class="header-anchor" :href="`#API${name}Events`"></a>
              </h2>
              <div
                class="api-table"
                v-html="JSON.parse(item[lang]?.events || '')"
              />
            </template>
          </div>
        </div>
      </div>
      <DocumentAside :focus="isFocusMode" :tab="currentTab" />
    </div>
    <DocumentDock v-if="frontmatter?.component" :focus="isFocusMode">
      <div w="40">
        <wb-radio-group
          v-model="currentTab"
          ring="1 inset $wb-color-border-base"
          :options="TAB_OPTIONS"
          type="tab"
          tab-type="emphasize"
          shape="round"
          size="lg"
          @change="setCurrentTab"
        />
      </div>
    </DocumentDock>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver, useState } from '@/composables'
import { useData, useRoute } from 'vitepress'
import { watch } from 'vue'
import DocumentAside from './DocumentAside.vue'
import DocumentDock from './DocumentDock.vue'
import DocumentHeader from './DocumentHeader.vue'

defineOptions({ name: 'LayoutDocument' })

const { page, frontmatter, lang }: any = useData()

const TAB_OPTIONS = [
  { label: 'DEMO', value: 'content' },
  { label: 'API', value: 'api' }
]

const { visible: isFocusMode } = useIntersectionObserver(
  '#layoutRoot',
  '#DocumentHeaderIndicator'
)

const [currentTab, setCurrentTab] = useState<string>('content')

const currentRoute = useRoute()
watch(
  () => currentRoute.path,
  () => {
    const { hash } = window.location
    const urlTabValue = hash && /#API.+/.test(hash) ? 'api' : 'content'
    setCurrentTab(urlTabValue)
  },
  { immediate: true }
)
</script>
