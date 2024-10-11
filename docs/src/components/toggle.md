---
component: toggle
category: form

title: Toggle
description: Element used to toggle a state.
decoration: /assets/img/components/toggle.png
---

## Playground
:::usage toggle
:::

## Properties

### color
You can give your customize color when specific needs, it can also well displayed.

:::custom-usage toggle
toggle/examples/color.json
:::

### theme
Built-in color presets provided for commonly used.

:::custom-usage toggle
toggle/examples/theme.json
:::

### shape
Sometime, you need different shapes.

:::custom-usage toggle
toggle/examples/shape.json
:::

### size
For `form-type` elements, use property `size` to set the size of the element. 

Allow `number` for pixel value or option in [`ComponentSize`](https://github.com/Kythuen/white-block/blob/main/packages/core/src/components/types.ts).

:::demo
toggle/examples/size.vue
:::

## Events
Click action emit event `click`.

:::demo
toggle/examples/event.vue
:::


## Composables
You can also use `Toggle` in a composable manner.
:::demo
toggle/examples/composables.vue
:::
