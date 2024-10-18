import { PLAYGROUND_URL } from '../constant'
import type { DefaultTheme } from 'vitepress'

const SidebarGuides: DefaultTheme.NavItemWithLink[] = [
  { text: '快速开始', link: '/guide/' },
  { text: '组件概览', link: '/guide/overview' }
]

const SidebarComponents: DefaultTheme.NavItemWithLink[] = [
  { text: '按钮', link: '/zh/components/button' },
  { text: '按钮组', link: '/zh/components/button-group' },
  { text: '输入框', link: '/zh/components/input' },
  { text: '数字输入框', link: '/zh/components/input-number' },
  { text: '开关', link: '/zh/components/toggle' },
  { text: '单选按钮', link: '/zh/components/radio' },
  { text: '单选按钮组', link: '/zh/components/radio-group' },
  { text: '下拉框', link: '/zh/components/select' },
  { text: '滑块', link: '/zh/components/slider' },
  { text: '间距', link: '/zh/components/space' },
  { text: '弹出层', link: '/zh/components/popup' },
  { text: '占位', link: '/zh/components/placeholder' },
  { text: '颜色选择器', link: '/zh/components/color-picker' },
  { text: '表单', link: '/zh/components/form' },
  { text: '表单项', link: '/zh/components/form-item' }
]

export const SIDEBAR: DefaultTheme.SidebarItem[] = [
  { text: '指南', items: SidebarGuides },
  { text: '组件', items: SidebarComponents }
]

export const NAV = [
  { text: '指南', link: '/zh/guide/' },
  { text: '组件', link: '/zh/guide/overview' },
  { text: '演练场', link: PLAYGROUND_URL },
  { text: '主题', link: '/themes' }
]
