---
component: button
category: form

title: Button
description: 用于触发一个操作。
decoration: /assets/img/components/button.png
---

## 演示
:::usage button 33.5
:::

## 组件属性

### content

使用属性 `content` 定义 content 按钮内容。支持 `text` 或 `JSXNode'，或返回 'text' 或 'JSXNode' 的函数。

:::demo
button/examples/content.vue
:::

### type
结合使用属性 `type` 和 `theme` 来控制按钮的显示样式。

:::custom-usage button
button/examples/type.json
:::

### color
你可以在特定需求时提供自定义颜色，它也可以很好地显示。

:::custom-usage button
button/examples/color.json
:::

### theme
内置提供的常用颜色预设。

:::custom-usage button
button/examples/theme.json
:::

### shape
有时，你需要不同的形状。
:::custom-usage button
button/examples/shape.json
:::

### block
有时，按钮应该是一个块级元素，占满宽度。

:::custom-usage button
button/examples/block.json
:::

### tag
有时，按钮需要更好的语义 HTML 标签来实现可访问性。

然后，你可以使用你设置标签的默认属性。

:::custom-usage button
button/examples/tag.json
:::

### size
对于表单类型元素，请使用属性 `size` 来设置元素的大小。

允许像素值`number`或为[`ComponentSize`](https://github.com/Kythuen/white-block/blob/main/packages/core/src/components/types.ts)的选项值.

:::demo
button/examples/size.vue
:::

## 插槽
提供插槽 `default` 和 `content` 来定义按钮内容。

并在按钮内容周围插入`prefix` 和 `suffix`。

:::demo
button/examples/slot.vue
:::

## 事件
点击操作发出事件 `click`.

:::demo
button/examples/event.vue
:::

## 组合式用法
您也可以用组合式的方式使用按钮。

:::demo
button/examples/composables.vue
:::