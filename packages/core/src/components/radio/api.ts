import { XNode as VNode } from '../types'
import { RadioTheme } from './types'

export type Slots = {
  /*
   * Default slot of the button.
   */
  default?: () => any
}

export type Emits = {
  /*
   * Click action.
   */
  click: [e: boolean]
}

export type Props = {
  /*
   * Customize color of the button. Can be `named-color`, `hex`, `rgb`, etc.
   */
  color?: string
  /*
   * Built-in color presets provided for convenient use.
   * 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'default'
   */
  theme?: RadioTheme
  /*
   * Click action.
   */
  onClick?: (e: boolean) => void
  /*
   * Content of the radio, same as `content`.
   */
  default?: string | VNode
  /*
   * Content of the button.
   */
  content?: string | VNode
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
