import type { ButtonType, ButtonShape, ButtonTheme } from './types'
import type { XNode as VNode } from '../types'

export type Slots = {
  /*
   * 默认按钮内容。
   */
  default: () => any
}

export type Emits = {
  /*
   * 点击时触发, 参数为 `MouseEvent` 对象。
   */
  click: [e: MouseEvent]
}

export type Props = {
  /**
   * 点击事件处理函数, 参数为 `MouseEvent` 对象。
   */
  onClick?: (e: MouseEvent) => void
  /*
   * 按钮的内容插槽。
   */
  default?: string | VNode
}

export default {
  default: ''
} as Props
