<template>
  <div
    w="full"
    m="y-4"
    color="$wb-color-text-4"
    ring="1 inset $wb-color-border-soft"
    rounded="1"
    class="vp-raw"
    overflow="hidden"
  >
    <div w="full" h="84" flex :style="{ height: `${boxHeight}rem` }">
      <div h="full" flex="~ 1 col">
        <div
          h="12"
          p="x-4"
          border="0 b-px solid $wb-color-border-soft"
          flex="none ~ row"
          items="center"
          justify="between"
        >
          <span>{{ component }}</span>
          <div flex>
            <wb-button type="ghost" theme="default" @click="resetChange">
              <i i="tdesign-refresh" />
            </wb-button>
            <wb-popup placement="bottom-end" class="md:hidden lg:hidden">
              <wb-button type="ghost" theme="default">
                <i i="tdesign-ellipsis" />
              </wb-button>
              <template #content>
                <div v-if="showProperties">
                  <div
                    v-if="propsOptions.input.length"
                    min-w="54"
                    p="3"
                    border="0 b-px solid $wb-color-border-dinky"
                  >
                    <div
                      v-for="item in propsOptions.input"
                      :key="item.name"
                      h="10"
                      flex
                      justify="between"
                      items="center"
                    >
                      {{ item.name }}
                      <wb-input
                        :default-value="item.value"
                        w="32"
                        size="sm"
                        clearable
                        @change="(e: any) => changeProps(item.name, e)"
                      />
                    </div>
                  </div>
                  <div
                    v-if="propsOptions.toggle.length"
                    p="3"
                    border="0 b-px solid $wb-color-border-dinky"
                  >
                    <div
                      v-for="item in propsOptions.toggle"
                      :key="item.name"
                      h="10"
                      flex
                      justify="between"
                      items="center"
                    >
                      {{ item.name }}
                      <wb-toggle
                        :default-value="item.value"
                        size="sm"
                        @change="(e: any) => changeProps(item.name, e)"
                      />
                    </div>
                  </div>
                  <div v-if="propsOptions.select.length" p="3">
                    <div
                      v-for="item in propsOptions.select"
                      :key="item.name"
                      h="10"
                      flex
                      justify="between"
                      items="center"
                    >
                      {{ item.name }}
                      <wb-select
                        w="24"
                        :input-props="{
                          size: 'sm',
                          type: 'ghost',
                          placeholder: ''
                        }"
                        :popup-props="{ placement: 'bottom-end' }"
                        :options="
                          item.options.map((i: string) => ({
                            label: i,
                            value: i
                          }))
                        "
                        :default-value="item.value"
                        @change="(e: any) => changeProps(item.name, e)"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </wb-popup>
          </div>
        </div>
        <div h="[calc(100%-3rem)]" flex="1 ~ col">
          <div
            w="full"
            h="[calc(100%-3rem)]"
            overflow-auto
            p="6 md:10"
            flex="~ 1 row wrap"
            items-center
            justify-center
            gap="2"
            class="scrollable"
          >
            <component
              :is="UsageComponent"
              v-if="UsageComponent && showProperties"
              v-bind="{ ...propsData, ...TSXProps, ...changedProps }"
            />
          </div>
          <div
            h="12"
            p="2"
            border="0 t-px solid $wb-color-border-soft"
            flex
            items-center
            justify-end
            @click.stop="
              clickDelegate($event, 'operation-item', handleCodeOperations)
            "
          >
            <div
              v-for="item in CODE_BLOCK_OPERATIONS"
              :key="item.name"
              :data-value="item.name"
              class="operation-item"
              w="8"
              h="8"
              p="2"
              :bg="
                showCode && item.name === 'code'
                  ? 'vc-gray-700/50'
                  : 'hover:vc-gray-700/50'
              "
              rounded="1"
              select="none"
              transition="all duration-100 ease"
              cursor="pointer"
              flex="inline"
            >
              <i :class="item.icon" />
            </div>
          </div>
        </div>
      </div>
      <div flex="none" w="72" h="full" class="hidden md:block">
        <div
          v-if="showProperties"
          w="full"
          h="full"
          border="0 l-px solid $wb-color-border-soft"
        >
          <div
            h="12"
            p="x-4"
            border="0 b-px solid $wb-color-border-soft"
            flex
            items="center"
          >
            {{ lang === 'en' ? 'Properties' : '属性配置' }}
          </div>
          <div
            h="[calc(100%-3rem)]"
            p="1"
            overflow="auto"
            text="3.5"
            class="scrollable"
          >
            <div
              v-if="propsOptions.input.length"
              p="3"
              border="0 b-px solid $wb-color-border-dinky"
            >
              <div
                v-for="item in propsOptions.input"
                :key="item.name"
                h="10"
                flex
                justify="between"
                items="center"
              >
                {{ item.name }}
                <wb-input
                  :default-value="propsData[item.name] ?? item.value"
                  w="32"
                  size="sm"
                  clearable
                  @change="(e: any) => changeProps(item.name, e)"
                />
              </div>
            </div>
            <div
              v-if="propsOptions.number.length"
              p="3"
              border="0 b-px solid $wb-color-border-dinky"
            >
              <div
                v-for="item in propsOptions.number"
                :key="item.name"
                h="10"
                flex
                justify="between"
                items="center"
              >
                {{ item.name }}
                <wb-input-number
                  :default-value="propsData[item.name] ?? item.value"
                  w="32"
                  theme="inner"
                  size="sm"
                  clearable
                  @change="(e: any) => changeProps(item.name, e)"
                />
              </div>
            </div>
            <div
              v-if="propsOptions.toggle.length"
              p="3"
              border="0 b-px solid $wb-color-border-dinky"
            >
              <div
                v-for="item in propsOptions.toggle"
                :key="item.name"
                h="10"
                flex
                justify="between"
                items="center"
              >
                {{ item.name }}
                <wb-toggle
                  :default-value="propsData[item.name] ?? item.value"
                  size="sm"
                  @change="(e: any) => changeProps(item.name, e)"
                />
              </div>
            </div>
            <div v-if="propsOptions.select.length" p="3">
              <div
                v-for="item in propsOptions.select"
                :key="item.name"
                h="10"
                flex
                justify="between"
                items="center"
              >
                {{ item.name }}
                <wb-select
                  w="32"
                  :input-props="{ size: 'sm', type: 'ghost', placeholder: '' }"
                  :popup-props="{ placement: 'bottom-end' }"
                  :options="
                    item.options.map((i: string) => ({ label: i, value: i }))
                  "
                  :default-value="propsData[item.name] ?? item.value"
                  @change="(e: any) => changeProps(item.name, e)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      w="full"
      :max-h="showCode ? '140' : '0'"
      border="0 t-px solid $wb-color-border-soft"
      overflow="y-auto"
      transition="all duration-200 ease-in-out"
      class="scrollable"
    >
      <div p="x-6" v-html="getHighlighCode(compCode)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { clickDelegate } from '@/utils'
import { createHighlighter } from 'shiki'
import { useData } from 'vitepress'
import { nextTick, ref, watchEffect } from 'vue'
import { copyToClipboard, formatCode } from '~/utils'

defineOptions({ name: 'UsageBlock', inheritAttrs: false })

const props = defineProps({
  component: {
    type: String,
    required: true
  },
  options: {
    type: String,
    default: '{}'
  },
  data: {
    type: String,
    default: '{}'
  },
  source: {
    type: String,
    default: ''
  },
  contentHeight: {
    type: String,
    default: ''
  },
  fileType: {
    type: String,
    default: ''
  }
})

const { lang } = useData()

const propsOptions = JSON.parse(decodeURIComponent(props.options))
const propsData = JSON.parse(decodeURIComponent(props.data)) || {}
const boxHeight = props.contentHeight
  ? JSON.parse(decodeURIComponent(props.contentHeight))
  : 24

let UsageComponent: any = null
if (props.fileType === 'vue') {
  const components: Record<string, any> = import.meta.glob(
    '../../../../packages/core/src/components/*/examples/usage.vue'
  )
  UsageComponent =
    (
      await components[
        `../../../../packages/core/src/components/${props.component}/examples/usage.vue`
      ]?.()
    )?.default ?? null
} else {
  const components: Record<string, any> = import.meta.glob(
    '../../../../packages/core/src/components/**/*.vue'
  )
  UsageComponent =
    (
      await components[
        `../../../../packages/core/src/components/${props.component}/${props.component}.vue`
      ]?.()
    )?.default ?? null
}

const isTSXProps = props.fileType === 'tsx'
const TSXProps = ref({})
if (isTSXProps) {
  TSXProps.value =
    (
      await import(
        `../../../../packages/core/src/components/${props.component}/examples/usage.tsx`
      )
    ).default ?? {}
}

const componentAttrs = ref('')
const componentVariables = ref('')
function changeCode(data: Record<string, any>) {
  const attrs: string[] = []
  const variables: string[] = []
  for (const key in data) {
    if (typeof data[key] === 'boolean') {
      if (data[key]) {
        attrs.push(key)
      }
    } else if (typeof data[key] === 'string') {
      if (!data[key]) continue
      attrs.push(`${key}="${data[key]}"`)
    } else {
      attrs.push(`:${key}="${key}"`)
      variables.push(`const ${key} = ${JSON.stringify(data[key])}`)
    }
  }
  componentAttrs.value = attrs.join(' ')
  componentVariables.value = variables.join('\n')
}
if (Object.keys(propsData).length) {
  changeCode(propsData)
}

const changedProps: any = ref({})
function changeProps(prop: string, value: any) {
  changedProps.value[prop] = value
  changeCode({ ...propsData, ...changedProps.value })
}

const shiki = await createHighlighter({
  themes: ['material-theme-palenight', 'material-theme'],
  langs: ['vue']
})

function getHighlighCode(code: string) {
  return shiki.codeToHtml(code, { lang: 'vue', theme: 'material-theme' })
}

const tag = 'script'

const compCode = ref('')
watchEffect(async () => {
  const divide = componentAttrs.value ? ' ' : ''
  let scriptCode = ''
  if (componentVariables.value) {
    scriptCode = `

<${tag} setup lang="ts">${formatCode(componentVariables.value, {
      parser: 'babel-ts',
      semi: false
    })}</${tag}>`
  }
  if (props.fileType === 'vue' || isTSXProps) {
    const name = props.component
    compCode.value = await formatCode(
      decodeURIComponent(props.source).replace(
        new RegExp(`(<wb-${name}[^>/]*)`),
        `$1${divide}${componentAttrs.value}${divide}`
      )
    )
    return
  }
  compCode.value = await formatCode(`<template>
  <wb-${props.component}${divide}${componentAttrs.value} />
</template>${scriptCode}`)
})

const showCode = ref(false)
const CODE_BLOCK_OPERATIONS = [
  { name: 'stackblitz', icon: 'i-simple-icons-stackblitz' },
  { name: 'copy', icon: 'i-mdi-content-copy' },
  { name: 'code', icon: 'i-ion-code-slash' }
]
function handleCodeOperations(dataset: Record<string, string>, e: any) {
  const { value } = dataset
  switch (value) {
    case 'code':
      showCode.value = !showCode.value
      break
    case 'copy': {
      if (!import.meta.env.SSR) {
        copyToClipboard(compCode.value)
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
  }
}

const showProperties = ref(true)

function resetChange() {
  changedProps.value = {}
  showProperties.value = false
  changeCode(propsData)
  nextTick(() => {
    showProperties.value = true
  })
}
</script>
