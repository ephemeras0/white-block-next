<template>
  <div class="component-overview" w="full" flex="col" gap="3">
    <template v-for="item in componentData" :key="item.title">
      <div v-if="item.children.length" w="full">
        <div flex="~ row" items="center">
          <h3 :id="item.title">{{ item.title }}</h3>
        </div>
        <div m="t-4" grid="~ cols-12" gap="4">
          <a
            v-for="sub in item.children"
            :key="sub.name"
            grid="col-span-6 md:col-span-3 lg:col-span-2"
            :href="`${localePrefix}${sub.link}`"
            style="text-decoration: none"
          >
            <div
              w="full"
              h="full"
              p="3"
              bg="[rgb(var(--vc-gray-200)/50%)] dark:[rgb(var(--vc-gray-800)/50%)]"
              rounded="1.5"
              text="sm $wb-c-text-secondly hover:$wb-c-text-main"
            >
              <div
                w="full"
                h="full"
                p="4"
                bg="[rgb(var(--vc-white))] dark:[rgb(var(--vc-gray-700)/50%)]"
                rounded="1.5"
                flex="~ col"
                items="start"
                gap="1.5"
                shadow="hover:lg"
                cursor="pointer"
                transform="hover:translate-y-[-1px]"
                transition="all duration-300 ease-in-out"
              >
                <div
                  w="full"
                  aspect-ratio="1"
                  m="b-2"
                  rounded="1.5"
                  flex
                  justify="center"
                  items="center"
                >
                  <img
                    v-if="sub.image"
                    :src="
                      withBase(
                        `/assets/img/components/${sub.text}${
                          isDark ? '-dark.png' : '.png'
                        }`
                      )
                    "
                    style="filter: hue-rotate(-60deg)"
                  />
                  <wb-placeholder v-else />
                </div>
                <div text="4 $wb-color-text-2">
                  {{ sub.text }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'
import { COMPONENTS_CATEGORY } from '~/config/components'

defineOptions({ name: 'WBComponentOverview' })

const { isDark, lang } = useData()

const localePrefix = computed(() =>
  lang.value === 'en' ? '' : `/${lang.value}`
)
function generateComponentData() {
  const components: Record<string, any> = import.meta.glob(
    '../../../../../packages/core/src/components/*/api.ts'
  )
  const images: Record<string, any> = import.meta.glob(
    '../../../../content/public/assets/img/components/*.png'
  )

  const componentsData: any = []
  for (const comp in components) {
    const name = comp.match(/components\/(.*)\/api\.ts/)?.[1]
    if (!name) break
    componentsData.push({
      name,
      text: name,
      link: withBase(`/components/${name}`),
      image:
        !!images[`../../../../content/public/assets/img/components/${name}.png`]
    })
  }

  const result: any = []
  for (const cate in COMPONENTS_CATEGORY) {
    const list: any = []
    COMPONENTS_CATEGORY[cate].forEach(comp => {
      const data = componentsData.find(item => item.name === comp)
      if (data) {
        list.push(data)
      }
    })
    result.push({
      title: cate,
      children: list
    })
  }

  return result
}
const componentData = generateComponentData()
</script>
