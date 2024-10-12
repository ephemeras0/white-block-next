---
component: input
category: form

title: Input
description: 用于收集用户输入。
decoration: /assets/img/components/input.png
---

## 演示
:::usage input
:::

## 组件属性

### type
使用属性 `type` 控制输入框的显示样式。

:::custom-usage input
input/examples/type.json
:::

### align
使用属性 `type` 控制输入框文本的对齐方式。

:::custom-usage input
input/examples/align.json
:::

### size
对于表单类型元素，可以使用属性 `size` 来设置元素的大小。

:::demo
input/examples/size.vue
:::

### value
输入框的值，支持 `v-model` 或 `v-model:value`。

:::demo
input/examples/value.vue
:::


## Slots
提供插槽了前置插槽 `prefix` 和 后置插槽 `suffix` 来自定义输入框。

:::demo
input/examples/slot.vue
:::


## Events
输入框值变动时会触发 `change` 事件。

:::demo
input/examples/event.vue
:::

## Composables
组合式的方式使用 `Input`。

:::demo
input/examples/composables.vue
:::