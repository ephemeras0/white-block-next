import type { VNode } from 'vue'

export type ModeEnum = 'dark' | 'light'
export type SizeEnum = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ContentAlignment = 'start' | 'center' | 'end'

export interface OptionsItem {
  label: string
  value: string | number
  extra?: any
}

export type XNode = VNode | ((...args: any[]) => VNode) | any
