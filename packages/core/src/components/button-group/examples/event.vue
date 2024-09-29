<template>
  <wb-space vertical>
    <wb-button-group @click="clickHandler" separate>
      <wb-button key="theme" type="ghost" theme="primary">
        <div w-5 h-5 class="i-heroicons-swatch-20-solid" />
      </wb-button>
      <wb-button key="search" type="ghost" theme="default">
        <div w-5 h-5 class="i-heroicons-magnifying-glass" />
      </wb-button>
      <wb-button key="locale" type="ghost" theme="default">
        <div w-5 h-5 class="i-tdesign-translate" />
      </wb-button>
      <wb-button key="mode" type="ghost" theme="default">
        <div w-5 h-5 class="i-heroicons-moon-20-solid" />
      </wb-button>
      <wb-button
        key="github"
        type="ghost"
        theme="default"
        tag="a"
        target="__blank"
        href="https://github.com/Kythuen/white-block"
      >
        <div w-5 h-5 class="i-simple-icons-github" />
      </wb-button>
    </wb-button-group>

    <wb-button-group
      :button-props="{ type: 'plain' }"
      :options="options"
      separate
      :allow-types="['WbButton', 'WbPopup', 'div']"
      @click="clickHandler"
    />

    <wb-button-group separate @click="clickHandler">
      <wb-popup
        v-for="item in options2"
        :key="item.key"
        trigger="hover"
        placement="bottom"
        size="xs"
        :content="item.label"
        arrow
      >
        <wb-button
          :key="item.key"
          type="ghost"
          theme="default"
          :content="item.content"
        />
        <!-- <template #content>{{ item.label }}</template> -->
      </wb-popup>
    </wb-button-group>
  </wb-space>
</template>

<script setup lang="tsx">
const options = [
  {
    key: 'theme',
    type: 'ghost',
    theme: 'primary',
    content: <div w-5 h-5 class="i-heroicons-swatch-20-solid" />
  },
  {
    key: 'search',
    type: 'ghost',
    theme: 'default',
    content: <div w-5 h-5 class="i-heroicons-magnifying-glass" />
  },
  {
    key: 'locale',
    type: 'ghost',
    theme: 'default',
    content: <div w-5 h-5 class="i-tdesign-translate" />
  },
  {
    key: 'mode',
    type: 'ghost',
    theme: 'default',
    content: <div w-5 h-5 class="i-heroicons-moon-20-solid" />
  },
  {
    key: 'mode',
    type: 'ghost',
    theme: 'default',
    content: <div w-5 h-5 class="i-simple-icons-github" />,
    tag: 'a',
    href: 'https://github.com/Kythuen/white-block',
    target: '__blank'
  }
]
const options2 = [
  {
    key: 'align-left',
    content: <div w-5 h-5 class="i-tdesign:format-vertical-align-left" />,
    label: 'Align Left'
  },
  {
    key: 'align-center',
    content: <div w-5 h-5 class="i-tdesign:format-vertical-align-center" />,
    label: 'Align Center'
  },
  {
    key: 'align-right',
    content: <div w-5 h-5 class="i-tdesign:format-vertical-align-right" />,
    label: 'Align Right'
  },
  {
    key: 'align-side',
    content: <div w-5 h-5 class="i-tdesign:view-list" />,
    label: 'Align Side'
  }
]

function clickHandler(key: string) {
  console.log(`click: button [${key}]`)
}
</script>
