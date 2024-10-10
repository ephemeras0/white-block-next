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
  { text: '间距', link: '/zh/components/space' },
  { text: '开关', link: '/zh/components/toggle' }
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
