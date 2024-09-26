---
title: Guide
description: White block is an UI Library for Vue application. <br>Aim to make more user friendly components for developer.
---

## Installation

::: code-group
```sh [pnpm]
$ pnpm add white-block
```
```sh [npm]
$ npm install white-block
```
```sh [yarn]
$ yarn add white-block
```
:::

## Usage

White Block provides three ways to use components


### Fully Import

In this way, all components will be registering into your app.

If you don’t care about the bundle size so much, it’s more convenient to use full import.

```ts
// main.ts
import { createApp } from 'vue'
import WhiteBlock from 'white-block'
import 'white-block/dist/styles/components/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(WhiteBlock)
app.mount('#app')
```

### Manually Import

If you care about the size of output, you can use manually import. 

In this way, through `tree-shaking`  by the building tool, only specificed components will be including in the output.

```ts
// main.ts
import { createApp } from 'vue'
import { Button as WbButton } from 'white-block'
import 'white-block/dist/styles/index.css'
import App from './app.vue'

const app = createApp(App)
app.use(WbButton)
app.mount('#app')
```

### Auto Import <Badge type="tip" text="Recommend" />

Besides, you can also use additional plugin to import components you need.

First you need to install `unplugin-vue-components`, `unplugin-auto-import` and `@white-block/resolver`.

::: code-group
```sh [pnpm]
$ pnpm add -D unplugin-vue-components unplugin-auto-import @white-block/resolver
```
```sh [npm]
$ npm install -D unplugin-vue-components unplugin-auto-import @white-block/resolver
```
```sh [yarn]
$ yarn add -D unplugin-vue-components unplugin-auto-import @white-block/resolver
```
:::

Then add the code below into your Vite or Webpack config file.

#### Vite
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { WhiteBlockResolver } from '@white-block/unplugin-vue-resolver'

export default {
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [WhiteBlockResolver()]
    }),
    Components({
      resolvers: [WhiteBlockResolver()]
    })
  ]
}
```

#### Webpack
```ts
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { WhiteBlockResolver } = require('@white-block/resolvers')

module.exports = {
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [WhiteBlockResolver()]
    }),
    Components({
      resolvers: [WhiteBlockResolver()]
    })
  ]
}
```
And last, you need to import a small-sized style file which contain base css variables for the component library.
```ts
// main.ts
import { createApp } from 'vue'
import 'white-block/dist/styles/index.css'

const app = createApp(App)
app.mount('#app')

```

## Browser compatibility
| [<img src="https://tdesign.gtimg.com/docs/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> Edge | [<img src="https://tdesign.gtimg.com/docs/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://tdesign.gtimg.com/docs/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://tdesign.gtimg.com/docs/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --- | --- | --- | --- |
| Edge >=84 | Firefox >=83 | Chrome >=84 | Safari >=14.1 |