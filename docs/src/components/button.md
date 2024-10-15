---
component: button
category: form

title: Button
description: Element used to trigger an action.
decoration: /assets/img/components/button.png
---

## Playground
:::usage button 33.5
:::

## Properties

<!-- :::custom-usage button
button/examples/type1.tsx
:::

:::custom-usage button
button/examples/type2.vue
::: -->

### content
Use property `content` to define content of the button. Support `text` and `VNode`, also can be a function that return `text` or `VNode`.

:::demo
button/examples/content.vue
:::

### type
Combining use property `type` and `theme` to control the display style of buttons.

:::custom-usage button
button/examples/type.json
:::

### color
You can give your customize color when specific needs, it can also well displayed.

:::custom-usage button
button/examples/color.json
:::

### theme
Built-in color presets provided for commonly used.

:::custom-usage button
button/examples/theme.json
:::

### shape
Sometime, you need different shapes.

:::custom-usage button
button/examples/shape.json
:::

### block
Sometime, button should be a block-level element.

:::custom-usage button
button/examples/block.json
:::

### tag
Sometime, button need better semantic HTML tags for accessibility.

Then you can use the default attributes of the tag you set.

:::custom-usage button
button/examples/tag.json
:::

### size
For `form-type` elements, use property `size` to set the size of the element. 

Allow `number` for pixel value or option in [`ComponentSize`](https://github.com/Kythuen/white-block/blob/main/packages/core/src/components/types.ts).

:::demo
button/examples/size.vue
:::

## Slots
Provide slots `default` and `content` to define button content.

And slots `prefix` and `suffix` around the button content. 

:::demo
button/examples/slot.vue
:::

## Events
Click action emit event `click`.

:::demo
button/examples/event.vue
:::

## Composables
You can also use `Button` in a composable manner.

:::demo
button/examples/composables.vue
:::