<template>
  <div>
    <div ref="TriggerRef" cursor="pointer" select="none">
      <Trigger />
    </div>
    <teleport v-if="mountContent" :disabled="!firstRender" :to="attach">
      <div
        v-if="firstRender"
        v-show="visible"
        ref="PopperRef"
        z="$wb-popup-z"
        :class="propsClasses"
        :style="propsStyles"
        @mousedown.stop
      >
        <transition :name="animate ? 'pop' : ''">
          <div
            v-if="showContent"
            v-show="visible"
            relative
            p="$wb-popup-padding"
            bg="$wb-popup-background"
            rounded="$wb-popup-radius"
            ring="1 $wb-popup-border"
            shadow="md"
            color="$wb-popup-color"
            class="wb-popup-content"
          >
            <slot name="content" :trigger="TriggerClientRect">
              <Content />
            </slot>
            <div
              v-if="arrow"
              absolute
              top="0"
              left="50%"
              w="$wb-popup-padding"
              h="$wb-popup-padding"
              bg="$wb-popup-background"
              border="1 solid transparent"
              transform="rotate-45 translate-y--50% translate-x--50%"
              class="wb-popup-arrow"
              :style="{
                '--trigger-height': `${TriggerClientRect.height}px`,
                '--trigger-width': `${TriggerClientRect.width}px`
              }"
            />
          </div>
        </transition>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode, useVModel } from '@/composables'
import { EventCenter, GlobalEventCenter } from '@/utils'
import { Instance as PopperInstance, createPopper } from '@popperjs/core'
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { POPUP_HIDE_EVENTS_MAP, POPUP_SHOW_EVENTS_MAP } from './constant'
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'WbPopup' })

const props = withDefaults(defineProps<Props>(), DefaultProps) as Props
const emits = defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses({
  valueProps: ['size'],
  nameProps: ['disabled', 'pure', 'arrow']
})

const propsStyles = useStyles(() => {
  if (props.zIndex) {
    return { '--wb-popup-z': props.zIndex }
  }
})

const renderNode = useNode()
const Trigger = () => renderNode('default')
const Content = () => renderNode('content')

const firstRender = ref(false)
const showContent = ref(false)
const mountContent = ref(false)

const BodyEvents = GlobalEventCenter.get('body') as EventCenter
const TriggerRef = ref()
const TriggerClientRect = ref({ width: 0, height: 0 })
let TriggerEvents: EventCenter

const PopperRef = ref()
let popper: PopperInstance

const [visible, setVisible] = useVModel<boolean>({
  props: toRefs(props),
  onSetValue: v => {
    emits((v ? 'show' : 'hide') as any)
    if (!v && props.destroyOnHide) {
      mountContent.value = false
      popper.destroy()
      popper = null as any
      firstRender.value = false
      showContent.value = false
    }
    emits('change', v)
  }
})

function updatePopup() {
  popper?.update()
}
function initPopper() {
  popper = createPopper(TriggerRef.value, PopperRef.value, {
    placement: props.placement,
    onFirstUpdate: () => {
      // firstRender
      showContent.value = true
      popper.update()
    }
  })
  updatePopup()
}
function hidePopup(e: MouseEvent) {
  if (!props.trigger) return
  if (['click', 'contextmenu'].includes(props.trigger)) {
    BodyEvents.off('mousedown', hidePopup)
    if (
      PopperRef.value.contains(e.target) ||
      TriggerRef.value.contains(e.target)
    )
      return
  } else if (['hover', 'focus'].includes(props.trigger)) {
    TriggerEvents.off(POPUP_HIDE_EVENTS_MAP[props.trigger], hidePopup)
  } else if (props.trigger === 'press') {
    BodyEvents.off(POPUP_HIDE_EVENTS_MAP[props.trigger], hidePopup)
  }
  setVisible(false)
}

function showPopup() {
  if (!mountContent.value) {
    mountContent.value = true
  }
  if (!firstRender.value) {
    firstRender.value = true
  }
  TriggerClientRect.value = TriggerRef.value.getBoundingClientRect()
  nextTick(() => {
    setVisible(true)
    if (!popper) {
      initPopper()
    }
    updatePopup()
  })
}

function removeEventListens() {
  TriggerEvents?.clean()
  BodyEvents?.off('mousedown', hidePopup)
  BodyEvents?.off('mouseup', hidePopup)
}

function addEventListens() {
  if (!props.trigger) return
  TriggerEvents.on(POPUP_SHOW_EVENTS_MAP[props.trigger], (e: MouseEvent) => {
    if (!props.trigger) return
    if (props.disabled) return
    if (props.trigger === 'contextmenu') {
      e.preventDefault()
    }
    if (['click', 'contextmenu'].includes(props.trigger)) {
      if (visible.value) {
        setVisible(false)
        BodyEvents.off('mousedown', hidePopup)
        return
      }
      BodyEvents.on('mousedown', hidePopup)
    } else if (['hover', 'focus'].includes(props.trigger)) {
      TriggerEvents.on(POPUP_HIDE_EVENTS_MAP[props.trigger], hidePopup)
    } else if (props.trigger === 'press') {
      BodyEvents.on(POPUP_HIDE_EVENTS_MAP[props.trigger], hidePopup)
    }
    showPopup()
  })
}

onMounted(() => {
  if (visible.value && (props.modelValue || props.value)) {
    firstRender.value = true
    nextTick(() => {
      initPopper()
    })
  } else {
    TriggerEvents = new EventCenter(TriggerRef.value, 'trigger')
    addEventListens()
    watch(
      () => props.trigger,
      () => {
        removeEventListens()
        addEventListens()
      }
    )
  }
  watch(
    () => props.placement,
    val => {
      popper?.setOptions({ placement: val })
    }
  )
  watch(
    () => [visible.value, props.size],
    () => {
      updatePopup()
    }
  )
})
onBeforeUnmount(() => {
  removeEventListens()
  popper?.destroy()
})

defineExpose({
  updatePopup,
  showPopup,
  hidePopup
})
</script>
