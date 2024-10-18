<template>
  <div :class="propsClasses" :style="propsStyles">
    {{ COMPONENT_PASCAL }}
    <ContentNode />
  </div>
</template>

<script setup lang="ts">
import { useClasses, useStyles, useNode{% if COMPONENT_PROPERTIES.includes('Value') %}, useVModel{% endif %} } from '@/composables'
{% if COMPONENT_PROPERTIES.includes('Value') %}import { toRefs } from 'vue'{% endif %}
import { DefaultProps, Emits, Props, Slots } from './config'

defineOptions({ name: 'Wb{{ COMPONENT_PASCAL }}' })

const props = withDefaults(defineProps<Props>(), DefaultProps)
defineEmits<Emits>()
defineSlots<Slots>()

const propsClasses = useClasses<keyof Props>({
  valueProps: [],
  nameProps: []
})
const propsStyles = useStyles()

const renderNode = useNode()
const ContentNode = () => renderNode('default')
{% if COMPONENT_PROPERTIES.includes('Value') %}

const [{{ COMPONENT_CAMEL }}Value, set{{ COMPONENT_PASCAL }}Value] = useVModel<string>({ props: toRefs(props) }){% endif %}
</script>
