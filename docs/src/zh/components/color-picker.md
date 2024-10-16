---
component: color-picker
category: Form

title: 颜色选择器
description: 用于从调色板选择颜色。
decoration: /assets/img/components/color-picker.png
---

## 演示

:::usage color-picker
:::

## 组件属性

### type 类型

结合使用属性 `type` 和 `theme` 来控制 `ColorPicker` 的显示样式。

:::custom-usage color-picker
color-picker/examples/type.json
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

您也可以用组合式的方式使用 `ColorPicker`。

:::demo
color-picker/examples/composables.vue
:::
