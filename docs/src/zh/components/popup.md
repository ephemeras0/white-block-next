---
component: popup
category: Base

title: 弹出层
description: 不打断操作和焦点情况下显示详细信息
decoration: /assets/img/components/popup.png
---

## 演示

:::usage popup
:::

## 组件属性

### type 类型

结合使用属性 `type` 和 `theme` 来控制 `Popup` 的显示样式。

:::custom-usage popup
popup/examples/type.json
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

您也可以用组合式的方式使用 `Popup`。

:::demo
popup/examples/composables.vue
:::
