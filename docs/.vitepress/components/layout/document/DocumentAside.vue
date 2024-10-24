<template>
  <div
    ref="DocumentAsideRef"
    sticky
    top="[calc(var(--wb-doc-height-header)+8.5rem)]"
    w="48"
    flex="none"
    :h="
      focus
        ? '[calc(100vh-var(--wb-doc-height-header)-11.5rem)]'
        : '[calc(100vh-var(--wb-doc-height-header)-19rem)]'
    "
    class="hidden !2xl:block vp-raw"
  >
    <div
      w="full"
      p="l-4"
      border="0 l-2px solid $wb-color-border-soft"
      flex="~ col"
      gap="0.5"
    >
      <div
        v-for="{ level, link, title } in headers"
        :key="title"
        :data-link="link"
        w="full"
        h="6"
        text="xs"
        :color="
          decodeURIComponent(currentActiveHash) === link
            ? '$wb-color-primary'
            : '$wb-color-text-secondly'
        "
        leading="6"
        truncate
        transition="color duration-300 ease"
        :class="['anchor-link']"
        :style="{ paddingLeft: `${level - minLevel}em` }"
      >
        <a :href="link" @click="onClickAnchor($event, link)">{{ title }}</a>
      </div>
    </div>
    <div
      v-show="markerTop >= 0"
      absolute
      top="0"
      left="0"
      w="2px"
      h="6"
      rounded="full"
      bg="$wb-color-primary"
      transition="top duration-300 ease"
      :style="{ top: `${markerTop}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
// @ts-ignore
import { throttleAndDebounce } from 'vitepress/dist/client/theme-default/support/utils'
import { getHeaders, useSpecialHeight } from '~/utils'

const props = defineProps({
  focus: { type: Boolean, default: false },
  tab: { type: String, default: 'content' }
})

const SPECIAL_HEIGHT = useSpecialHeight()
const THROTTLE_TIME = 60

const DocumentAsideRef = ref()
const headers = shallowRef<any[]>([])
const markerTop = ref(-1)
const currentActiveHash = ref('')
let container: HTMLElement | null = null

function onClickAnchor(e: MouseEvent, hash: string) {
  e.preventDefault()
  window.location.hash = hash
  isManual = true
  scrollContentToHash(hash)
  setActiveLinkToHash(hash)
  setTimeout(() => {
    isManual = false
  }, THROTTLE_TIME)
}
function onClickTitle(e: MouseEvent | any) {
  const domList = e.path ?? (e.composedPath && e.composedPath())
  const target = domList.find(
    (dom: HTMLElement) => dom.tagName && /H[1-6]/.test(dom.tagName)
  )
  if (target) {
    const hash = `#${target.id}`
    isManual = true
    setActiveLinkToHash(hash)
    scrollContentToHash(hash, true)
    setTimeout(() => {
      isManual = false
    }, THROTTLE_TIME + 500)
  }
}

function scrollContentToHash(hash: string, animate = false) {
  const id = hash.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))

  if (heading) {
    container?.scrollTo({
      top:
        heading.offsetTop > SPECIAL_HEIGHT.value
          ? heading.offsetTop + SPECIAL_HEIGHT.value
          : heading.offsetTop,
      behavior: animate ? 'smooth' : 'instant'
    })
  }
}
function setActiveLinkToHash(hash: string) {
  if (hash) {
    currentActiveHash.value = hash
    const currentHash = DocumentAsideRef.value.querySelector(
      `a[href="${decodeURIComponent(hash)}"]`
    )
    markerTop.value = currentHash?.parentNode.offsetTop ?? -1
  }
}

let isManual = false
const onScroll = throttleAndDebounce(() => {
  if (isManual) return
  setActiveLink()
}, THROTTLE_TIME)

function setActiveLink() {
  const anchors: any[] = [].slice.call(
    document.querySelectorAll(`.vp-doc-${props.tab} .header-anchor`)
  )
  const scrollTop = container?.scrollTop || 0
  // const containerHeight = container?.offsetHeight || 0
  // const contentHeight = container?.scrollHeight || 0

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]
    const nextAnchor = anchors[i + 1]
    const [isActive, hash] = isAnchorActive(scrollTop, i, anchor, nextAnchor)
    if (isActive) {
      setActiveLinkToHash(hash)
      return
    }
  }
}
function getAnchorTop(anchor: any) {
  return anchor.parentElement.offsetTop + SPECIAL_HEIGHT.value
}
function isAnchorActive(
  scrollTop: number,
  index: number,
  anchor: any,
  nextAnchor: any
) {
  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash]
  }
  return [false, null]
}

const minLevel = ref(0)
const currentRoute = useRoute()
onMounted(() => {
  container = document.getElementById('layoutRoot')
  watch(
    () => [currentRoute.path, props.tab],
    ([, tab]) => {
      markerTop.value = 0
      headers.value = getHeaders(tab)
      if (headers.value.length) {
        let min = 6
        headers.value.forEach(item => {
          min = Math.min(item.level, min)
        })
        minLevel.value = min
        const hash = window.location.hash || headers.value[0].link
        setTimeout(() => {
          scrollContentToHash(hash)
          setActiveLinkToHash(hash)
        }, 0)
      }
    },
    { immediate: true }
  )

  isManual = true
  container?.addEventListener('scroll', onScroll)
  container?.addEventListener('click', onClickTitle)
  setTimeout(() => {
    isManual = false
  }, THROTTLE_TIME)
})

onUnmounted(() => {
  container?.removeEventListener('scroll', onScroll)
  container?.removeEventListener('click', onClickTitle)
})
</script>
