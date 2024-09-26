import type { DefaultTheme } from 'vitepress'
import { PLAYGROUND_URL } from '../constant'

const SidebarGuides: DefaultTheme.NavItemWithLink[] = [
  { text: '快速开始', link: '/guide/' },
  { text: '组件概览', link: '/guide/overview' }
]

const SidebarComponents: DefaultTheme.NavItemWithLink[] = [
  { text: '按钮', link: '/components/button' }
]

export const SIDEBAR: DefaultTheme.SidebarItem[] = [
  { text: '指南', items: SidebarGuides },
  { text: '组件', items: SidebarComponents }
]

export const NAV = [
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/guide/overview' },
  { text: '演练场', link: PLAYGROUND_URL },
  { text: '主题', link: '/themes' }
]
