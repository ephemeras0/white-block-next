import { ButtonType, ButtonShape, ButtonTheme } from './types'
import { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Default slot of the button, same as `content` slot.
   */
  default?: () => any
  /*
   * Content slot of the button.
   */
  content?: () => any
  /*
   * Prefix slot before button content.
   */
  prefix?: () => any
  /*
   * Suffix slot after button content.
   */
  suffix?: () => any
}

export type Emits = {
  /*
   * Click action.
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * Display style of the button.
   * 'base' | 'plain' | 'dashed' | 'outline' | 'ghost' | 'link' | 'text'
   */
  type?: ButtonType
  /*
   * Customize color of the button. Can be `named-color`, `hex`, `rgb`, etc.
   */
  color?: string
  /*
   * Built-in color presets provided for convenient use.
   * 'primary' | 'success' | 'warning' | 'danger' | 'contrast' | 'default'
   */
  theme?: ButtonTheme
  /*
   * Shape of the button.
   * 'rectangle' | 'square' | 'round' | 'circle'
   */
  shape?: ButtonShape
  /*
   * Full width occupied or not.
   */
  block?: boolean
  /*
   * HTML tag of the button element.
   */
  tag?: string
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the button, same as `content`.
   */
  default?: string | VNode
  /*
   * Content of the button. Can be `text`, `Slot` or `VNode`.
   */
  content?: string | VNode
  /*
   * Prefix slot before button content.
   */
  prefix?: string | VNode
  /*
   * Suffix slot after button content.
   */
  suffix?: string | VNode
}

export default {
  content: '',
  type: 'base',
  color: '',
  theme: 'primary',
  shape: 'rectangle',
  block: false,
  tag: 'button'
} as Props
