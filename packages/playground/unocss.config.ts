import { defineConfig } from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  presetWind,
  transformerDirectives,
  transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetWind(), presetUno()],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
  blocklist: [/size-.*/]
})
