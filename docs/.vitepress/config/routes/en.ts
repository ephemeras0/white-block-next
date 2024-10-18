import type { DefaultTheme } from 'vitepress'
import { PLAYGROUND_URL } from '../constant'

const SidebarGuides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
  { text: 'Overview', link: '/guide/overview' }
]

const SidebarComponents: DefaultTheme.NavItemWithLink[] = [
  { text: 'Button', link: '/components/button' },
  { text: 'ButtonGroup', link: '/components/button-group' },
  { text: 'Input', link: '/components/input' },
  { text: 'InputNumber', link: '/components/input-number' },
  { text: 'Toggle', link: '/components/toggle' },
  { text: 'Radio', link: '/components/radio' },
  { text: 'RadioGroup', link: '/components/radio-group' },
  { text: 'Select', link: '/components/select' },
  { text: 'Slider', link: '/components/slider' },
  { text: 'Space', link: '/components/space' },
  { text: 'Popup', link: '/components/popup' },
  { text: 'Placeholder', link: '/components/placeholder' },
  { text: 'ColorPicker', link: '/components/color-picker' },
  { text: 'Form', link: '/components/form' },
  { text: 'FormItem', link: '/components/form-item' }
]

export const SIDEBAR: DefaultTheme.SidebarItem[] = [
  { text: 'Guide', items: SidebarGuides },
  { text: 'Components', items: SidebarComponents }
]

export const NAV = [
  { text: 'Guide', link: '/guide/' },
  { text: 'Components', link: '/guide/overview' },
  { text: 'Playground', link: PLAYGROUND_URL },
  { text: 'Themes', link: '/themes' }
]
