---
component: input
category: form

title: Input
description: Use to collect user input.
decoration: /assets/img/components/input.png
---

## Playground
:::usage input
:::

## Properties

### type
Use property `type` to control display style of the input.

:::custom-usage input
input/examples/type.json
:::

### align
Use property `align` to control text align in input.

:::custom-usage input
input/examples/align.json
:::

### size
For `form-type` elements, use property `size` to set the size of the element. 

:::demo
input/examples/size.vue
:::

### value
Use property `v-model` or `v-model:value` to control text value of input.

:::demo
input/examples/value.vue
:::


## Slots
Provide slots `prefix` and `suffix` around the button content. 

:::demo
input/examples/slot.vue
:::


## Events
Event `change` emitted when value change.

:::demo
input/examples/event.vue
:::

## Composables
You can also use `Input` in a composable manner.

:::demo
input/examples/composables.vue
:::