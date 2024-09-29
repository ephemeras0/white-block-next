import { InputType, InputAlign } from './types'
import { XNode as VNode } from '../types'

export type Slots = {
  /*
   * 输入区域的前置插槽。
   */
  prefix: () => any
  /*
   * 输入区域的后置插槽。
   */
  suffix: () => any
}

export type Emits = {}

export type Props = {
  /*
   * 输入框内容部分的样式风格。
   * 'base' | 'ghost'
   */
  type?: InputType
  /*
   * 文本框占位符。
   */
  placeholder?: string
  /*
   * 内容对齐方式。
   * 'start' | 'center' | 'end'
   */
  align?: InputAlign
  /*
   * 文本内容限制长度。
   */
  maxLength?: number
  /*
   * 是否为只读状态。
   */
  readonly?: boolean
  /*
   * 输入框的值, 支持语法糖 `v-model` 或 `v-model:value`。
   */
  value?: string
  /*
   * 输入区域的前置插槽。
   */
  prefix?: string | VNode
  /*
   * 输入区域的后置插槽。
   */
  suffix?: string | VNode
}

export default {
  type: 'base',
  placeholder: '',
  maxLength: -1,
  align: 'start',
  readonly: false
} as Props
