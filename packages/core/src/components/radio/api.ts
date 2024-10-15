import { XNode as VNode } from '../types'
import { RadioTheme } from './types'

export type Slots = {
  /*
   * Default slot of the radio.
   */
  default?: () => any
  /*
   * Content slot of the radio.
   */
  content?: () => any
}

export type Emits = {
  /*
   * Click action.
   */
  click: [e: boolean]
}

export type Props = {
  /*
   * Customize color of the radio. Can be `named-color`, `hex`, `rgb`, etc.
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
   * Content of the radio.
   */
  content?: string | VNode
}

export default {
  color: '',
  theme: 'primary'
} as Props
