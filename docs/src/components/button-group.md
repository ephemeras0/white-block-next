---
component: button-group
category: form

title: ButtonGroup
description: A group of buttons, with unified display style and behavior.
decoration: /assets/img/components/button-group.png
---

## Playground

:::usage button-group
:::

## Properties

:::tip
When use property `options`.

Properties set on the `ButtonGroup` will have lower priority than `Button` inside it.
:::

### type & theme

Combining use property `type` and `theme` to control the display style of buttons.

:::custom-usage button-group
button-group/examples/type_theme.json
:::

### shape

Sometime, you need different shapes.

:::custom-usage button-group
button-group/examples/shape.json
:::

### tag

Sometime, button need better semantic HTML tags for accessibility.

Then you can use the default attributes of the tag you set.

For example, you can add `href` into item of the `options` property when tag is `a`, as seen below.

:::custom-usage button-group
button-group/examples/tag.json
:::

### separate & gap

Sometime, you need buttons to be separated.

Set `separate` to control display buttons separated or not.
And use `gap` to control the gap between buttons.

:::custom-usage button-group
button-group/examples/separate.json
:::

### allowTypes
By default, only `WbButton` in `WbButtonGroup` will be shown, and you can use `allowTypes` to control. Open the devtool on control panel you can see the warning.
:::demo
button-group/examples/allow_types.vue
:::


## Slots

Provide slot `default` to define the content.
:::tip
When use `Slot`.

Properties set on the `ButtonGroup` will be ignore.
:::

:::demo
button-group/examples/slot.vue
:::

## Events

Click action emit event `click`.

:::demo
button-group/examples/event.vue
:::

## Composables

You can also use `ButtonGroup` in a composable manner.

:::demo
button-group/examples/composables.vue
:::
