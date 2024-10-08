import { ButtonType, ButtonShape, ButtonTheme } from './types'
import { XNode as VNode } from '../types'

export type Slots = {
  /*
   * 默认按钮内容。
   */
  default: () => any
  /*
   * 默认按钮内容。
   */
  content: () => any
  /*
   * 按钮内容的前置插槽。
   */
  prefix: () => any
  /*
   * 按钮内容的后置插槽。
   */
  suffix: () => any
}

export type Emits = {
  /*
   * 点击时触发, 参数为 `MouseEvent` 对象。
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * 按钮的显示风格。
   * 'base' | 'plain' | 'outline' | 'ghost' | 'dashed' | 'link' | 'text'
   */
  type?: ButtonType
  /*
   * 按钮颜色, 支持颜色别名、十六进制、rgb 等。
   */
  color?: string
  /*
   * 预设的常用按钮颜色主题。
   * 'default' | 'primary' | 'success' | 'warning' | 'danger'
   */
  theme?: ButtonTheme
  /*
   * 按钮的形状。
   * 'rectangle' | 'square' | 'round' | 'circle'
   */
  shape?: ButtonShape
  /*
   * 是否为块级元素，占满宽度。
   */
  block?: boolean
  /*
   * 自定义 HTML 标签。
   */
  tag?: string
  /**
   * 点击事件处理函数, 参数为 `MouseEvent` 对象。
   */
  onClick?: (e: MouseEvent) => void
  /*
   * 按钮的内容插槽。和 `content` 插槽一样。
   */
  default?: string | VNode
  /*
   * 按钮的内容插槽. 类型可以是 `text`, `Slot` 或 `VNode`。
   */
  content?: string | VNode
  /*
   * 按钮内容的前置插槽。
   */
  prefix?: string | VNode
  /*
   * 按钮内容的后置插槽。
   */
  suffix?: string | VNode
}

export default {
  type: 'base',
  color: '',
  theme: 'primary',
  block: false,
  shape: 'rectangle',
  content: '',
  tag: 'button'
} as Props
