<template>
  <ClientOnly>
    <Suspense>
      <div w="full" h="screen" flex>
        <div
          id="layoutRoot"
          w="full"
          h="screen"
          flex="1"
          bg="dark:[rgb(var(--wb-vc-gray-950))]"
          text="$color-text-default"
          overflow="y-auto"
          scroll="smooth"
          class="scrollable-main"
        >
          <LayoutHeader @theme="toggleThemeEditor" />
          <div
            w="full"
            min-h="[calc(100vh-var(--wb-height-header))]"
            class="content"
          >
            <NotFound v-if="pageData.isNotFound" />
            <LayoutHome v-else-if="frontmatter.page === 'Home'" />
            <div v-else max-w="lg:400" h="full" m="x-auto" flex>
              <LayoutSidebar />
              <LayoutDocument />
            </div>
          </div>
        </div>
        <ThemeEditor
          v-if="themeEditorVisible"
          @close="toggleThemeEditor(false)"
        />
      </div>
    </Suspense>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue'
import { ref } from 'vue'
import LayoutDocument from '~/components/layout/document/Index.vue'
import LayoutHome from '~/components/layout/home/Index.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import ThemeEditor from './theme-editor/Index.vue'

defineOptions({ name: 'WBLayout', inheritAttrs: false })

const { page: pageData, frontmatter } = useData()

const themeEditorVisible = ref(false)
function toggleThemeEditor(data: boolean) {
  themeEditorVisible.value = data
}
</script>
