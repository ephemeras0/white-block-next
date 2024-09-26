import { defineConfig } from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
  transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  presets: [presetWind(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
  rules: [
    [
      /^text-line-clamp-(\d+)$/,
      ([, line]) => ({
        'overflow': 'hidden',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': line,
        'line-clamp': line
      })
    ]
  ],
  blocklist: [/size-.*/]
})
