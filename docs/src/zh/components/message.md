---
component: message
category: Base

title: 消息弹窗
description: 用于用户提示。
decoration: /assets/img/components/message.png
---

## 演示

:::usage message
:::

## 组件属性

### type 类型

结合使用属性 `type` 和 `theme` 来控制 `Message` 的显示样式。

:::custom-usage message
message/examples/type.json
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

您也可以用组合式的方式使用 `Message`。

:::demo
message/examples/composables.vue
:::
