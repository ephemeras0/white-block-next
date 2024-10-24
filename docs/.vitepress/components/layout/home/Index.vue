<template>
  <div max-w="lg:400" h="full" m="x-auto">
    <div relative p="y-32 md:y-48 lg:y-25vh b-16">
      <div absolute inset="0" h="full" class="hidden !lg:block">
        <div
          absolute
          inset="0"
          m="auto"
          w="80"
          h="40"
          bg="$wb-color-primary"
          rounded="full"
          filter="blur-240"
        />
      </div>
      <div relative p="x-5 md:x-4 lg:x-8">
        <h1
          max-w="100 md:180"
          m="x-auto"
          text="11 md:6xl $wb-color-text-main center"
          font="black tracking-tight !leading-[1.2]"
        >
          <span text="$wb-color-primary nowrap">Intuitive</span> Design for
          Effortless Development
        </h1>
        <div m="t-12" text="center" flex="~ col" gap="y-2 md:y-4">
          <p>
            Inspired by
            <a
              color="$wb-color-primary"
              font="bold"
              class="hover:underline"
              href="https://tdesign.tencent.com/vue-next/overview"
            >
              TDesign
            </a>
            &
            <a
              color="$wb-color-primary"
              font="bold"
              class="hover:underline"
              href="https://ui.nuxt.com/"
            >
              NuxtUI
            </a>
          </p>
          <p>
            Implement with
            <a
              color="$wb-color-primary"
              font="bold"
              class="hover:underline"
              href="https://vitejs.dev/"
            >
              Vite
            </a>
            &
            <a
              color="$wb-color-primary"
              font="bold"
              class="hover:underline"
              href="https://unocss.dev/"
            >
              Unocss
            </a>
          </p>
          <p>
            With
            <span color="$wb-color-text-main" font="black">
              efficient docs
            </span>
            &
            <span color="$wb-color-text-main" font="black"> better DX </span>
          </p>
        </div>
        <div m="t-16" text="md" flex="~ wrap" gap="x-6 y-3" justify="center">
          <wb-button
            tag="a"
            size="lg"
            :href="withBase(lang === 'zh' ? `/zh/guide/` : '/guide/')"
          >
            Getting started
            <template #suffix>
              <i w="5" h="5" class="i-heroicons-arrow-right-20-solid" />
            </template>
          </wb-button>
          <wb-input
            w="58"
            size="lg"
            text="$wb-color-foreground"
            readonly
            value="pnpm add white-block"
          >
            <template #prefix>
              <i
                w="5"
                h="5"
                text="$wb-color-text-secondly"
                class="i-heroicons-command-line"
              />
            </template>
            <template #suffix>
              <button w="5" h="5" flex="~ row" items="center" justify="center">
                <i
                  w="4"
                  h="4"
                  text="$wb-color-text-secondly"
                  class="i-heroicons-clipboard-document"
                />
              </button>
            </template>
          </wb-input>
        </div>
      </div>
    </div>
    <div w="full" p="t-12 b-24" class="hidden !lg:block">
      <ComponentDemo />
    </div>
    <div
      p="x-4 y-8"
      flex="~ col"
      grid="lg:~ lg:cols-12 lg:auto-rows-[3rem]"
      gap="8"
    >
      <WBCard grid="lg:row-span-3 lg:col-span-7">
        <div h="full" p="6" grid="~ lg:cols-2" gap="x-8 y-4" items="center">
          <div h="full" flex="~ col wrap" gap="2">
            <div text="$wb-color-text-main">
              <i w="8" h="8" i="heroicons-swatch" />
              <p m="t-2" font="extrabold truncate">Color Palette</p>
            </div>
            <p text="sm $wb-color-text-secondly">
              Nuxt UI comes with a set of Vue composables to easily handle
              keyboard shortcuts in your app.
            </p>
          </div>
          <img
            :src="
              isDark
                ? withBase('/assets/img/home/color-palette-dark.svg')
                : withBase('/assets/img/home/color-palette-light.svg')
            "
            alt="Color Palette"
          />
        </div>
      </WBCard>
      <WBCard grid="lg:row-span-5 lg:col-span-5" m="lg:b-10">
        <div h="full" p="6" flex="~ col" gap="2">
          <div h="full" flex="~ col wrap" gap="2">
            <div text="$wb-color-text-main">
              <i w="8" h="8" i="heroicons-wrench-screwdriver" />
              <p m="t-2" font="extrabold truncate">Fully Customizable</p>
            </div>
            <p text="sm $wb-color-text-secondly">
              Change the style of any component in your App Config or customize
              them specifically through the ui prop.
            </p>
          </div>
          <img
            :src="
              isDark
                ? withBase('/assets/img/home/fully-customizable-dark.svg')
                : withBase('/assets/img/home/fully-customizable-light.svg')
            "
            alt="Fully Customizable"
          />
        </div>
      </WBCard>
      <WBCard grid="lg:row-span-3 lg:col-span-7">
        <div h="full" p="6" grid="~ lg:cols-2" gap="x-8 y-4" items="center">
          <div h="full" flex="~ col wrap" gap="2">
            <div text="$wb-color-text-main">
              <i w="8" h="8" i="heroicons-face-smile" />
              <p m="t-2" font="extrabold truncate">Icons</p>
            </div>
            <p text="sm $wb-color-text-secondly">
              Choose any of the 100k+ icons from the most popular icon libraries
              with the Icon component or the icon prop.
            </p>
          </div>
          <img
            :src="
              isDark
                ? withBase('/assets/img/home/icon-library-dark.svg')
                : withBase('/assets/img/home/icon-library-light.svg')
            "
            alt="Icons"
          />
        </div>
      </WBCard>
      <WBCard grid="lg:row-span-5 lg:col-span-5" m="lg:t--10 lg:b-20">
        <div h="full" p="6" flex="~ col" gap="2">
          <div flex="~ col wrap" gap="2">
            <div text="$wb-color-text-main">
              <i w="8" h="8" i="heroicons-moon" />
              <p m="t-2" font="extrabold truncate">Light & Dark</p>
            </div>
            <p text="sm $wb-color-text-secondly">
              Every component is designed with dark mode in mind. Works out of
              the box with @nuxtjs/color-mode.
            </p>
          </div>
          <img
            :src="
              isDark
                ? withBase('/assets/img/home/dark-mode-dark.svg')
                : withBase('/assets/img/home/dark-mode-light.svg')
            "
            alt="Light & Dark"
          />
        </div>
      </WBCard>
      <WBCard grid="lg:row-span-3 lg:col-span-7">
        <div h="full" p="6" grid="~ lg:cols-2" gap="x-8 y-4" items="center">
          <div h="full" flex="~ col wrap" gap="2">
            <div text="$wb-color-text-main">
              <i w="8" h="8" i="heroicons-computer-desktop" />
              <p m="t-2" font="extrabold truncate">keyboard shortcuts</p>
            </div>
            <p text="sm $wb-color-text-secondly">
              Nuxt UI comes with a set of Vue composables to easily handle
              keyboard shortcuts in your app.
            </p>
          </div>
          <img
            :src="
              isDark
                ? withBase('/assets/img/home/keyboard-shortcuts-dark.svg')
                : withBase('/assets/img/home/keyboard-shortcuts-light.svg')
            "
            alt="keyboard shortcuts"
          />
        </div>
      </WBCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import WBCard from './WBCard.vue'
import ComponentDemo from './ComponentDemo.vue'

const { isDark, lang } = useData()
defineOptions({ name: 'LayoutHome', inheritAttrs: false })
</script>
