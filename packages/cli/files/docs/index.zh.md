---
component: {{ COMPONENT }}
category: {{ COMPONENTS_CATEGORY }}

title: {{ COMPONENT_ZH }}
description: {{ COMPONENT_DESC_ZH }}
decoration: /assets/img/components/{{ COMPONENT }}.png
---

## 演示

:::usage {{ COMPONENT }}
:::

## 组件属性

### type 类型

结合使用属性 `type` 和 `theme` 来控制 `{{ COMPONENT_PASCAL }}` 的显示样式。

:::custom-usage {{ COMPONENT }}
{{ COMPONENT }}/examples/type.json
:::

## Slots
<!-- 提供插槽 `default` 和 `content` 来定义按钮内容。
并在按钮内容周围插入`prefix` 和 `suffix`。 -->

<!-- :::demo
button/examples/slot.vue
::: -->

## Events
点击操作发出事件 `click`.
<!-- :::demo
button/examples/event.vue
::: -->

## Composables

您也可以用组合式的方式使用 `{{ COMPONENT_PASCAL }}`。

:::demo
{{ COMPONENT }}/examples/composables.vue
:::
