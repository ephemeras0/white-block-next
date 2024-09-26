<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    sticky
    relative
    top="-6 md:-18"
    z="80"
    bg="dark:[rgb(var(--wb-vc-gray-950))]"
    backdrop="blur"
    border="0 b-px solid $wb-color-border-base dark:$wb-color-border-soft"
  >
    <div relative w="full" h="38 md:60" m="x-auto" p="3 md:6 lg:8">
      <div v-if="focus" h="12 md:18" m="t-21 md:t-29" flex items="center">
        <h1 text="6 md:7 lg:7" leading="relaxed" fw="extrabold">
          {{ frontmatter.title }}
        </h1>
      </div>
      <div v-else h="full">
        <div w="full lg:70%" flex="~ col" gap="2 md:4 lg:5">
          <div v-if="frontmatter.component" m="b-4">
            <div class="md:hidden">
              <img
                :src="`https://img.shields.io/badge/coverages-${coverageData.statements?.value}%25-${coverageData.statements?.color}`"
              />
            </div>
            <div gap="2" op="dark:85" class="hidden md:flex">
              <img
                v-for="item in coverageData"
                :key="item.type"
                :src="`https://img.shields.io/badge/coverages:%20${item.type}-${item.value}%25-${item.color}`"
              />
            </div>
          </div>
          <h1 text="6 md:8 lg:10" leading="relaxed" fw="extrabold">
            {{ frontmatter.title }}
          </h1>
          <p
            color="$wb-color-text-4"
            text="line-clamp-2"
            style="margin: 0"
            v-html="frontmatter.description"
          />
        </div>
      </div>
      <div
        v-if="frontmatter?.component"
        absolute
        bottom="-6"
        w="42"
        class="hidden md:block"
      >
        <slot />
      </div>
      <div
        v-if="frontmatter.component"
        absolute
        right="8"
        bottom="8"
        class="vp-raw hidden md:block"
      >
        <wb-button-group w="72" theme="emphasize">
          <wb-button
            v-for="item in ISSUE_BUTTONS"
            :key="item.value"
            :href="`https://github.com/Kythuen/white-block/issues/${item.href}`"
            type="plain"
            theme="default"
            tag="a"
            target="_blank"
          >
            <template #prefix> <i :class="item.icon" /></template>
            {{ issueData.open }} {{ item.value }}
          </wb-button>
        </wb-button-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useData, useRoute } from 'vitepress'
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

defineOptions({ name: 'DocumentHeader' })
defineProps({
  focus: { type: Boolean, default: false },
  options: { type: Array as PropType<any>, default: () => [] }
})

const { page, frontmatter } = useData()
// const { hash } = window.location

const componentName = frontmatter.value.component
const issueData = ref({ open: 0, closed: 0 })
const ISSUE_BUTTONS = [
  { label: 'Add', value: 'add', icon: 'i-tdesign-add', href: 'new/choose' },
  {
    label: 'Open',
    value: 'open',
    icon: 'i-tdesign-error-circle',
    href: `?q=is:issue+is:open+${componentName}`
  },
  {
    label: 'Closed',
    value: 'closed',
    icon: 'i-tdesign-check',
    href: `?q=is:issue+is:closed+${componentName}`
  }
]
const URL = 'https://api.github.com/search/issues'
async function getIssueData(type: 'open' | 'closed') {
  if (process.env.NODE_ENV !== 'production') return
  const q = `is:issue is:${type} ${componentName} repo:Kythuen/white-block`
  const { data } = await axios.get(URL, { params: { q } })
  if (data) {
    issueData.value[type] = data.items.length
  }
}

const coverageData: any = ref({})
const colorMap = { 0: 'red', 70: 'yellow', 90: 'green' }
async function getCoverageData() {
  const { coverage } = page.value.params || {}
  const result = {}
  for (const item in coverage) {
    const data = coverage[item]
    const value = parseFloat(data)
    const range =
      Object.keys(colorMap).find(key => value <= parseFloat(key)) || 90
    result[item] = {
      type: item,
      value,
      color: colorMap[range]
    }
  }
  coverageData.value = result
}

const currentRoute = useRoute()
watch(
  () => currentRoute.path,
  () => {
    if (frontmatter.value.component) {
      getIssueData('open')
      // getIssueData('closed')
      getCoverageData()
    }
  },
  { immediate: true }
)
</script>
