import { XNode as VNode } from '../types'
import { PlaceholderType } from './types'

export type Slots = {
  /*
   * Default slot of the `placeholder`.
   */
  default?: () => any
}

export type Emits = {
  /*
   * Click action.
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * Type of placeholder.
   * 'line' | 'fill' | 'line'
   */
  type?: PlaceholderType
  /*
   * Customize color of the button. Can be `named-color`, `hex`, `rgb`, etc.
   */
  color?: string
  /*
   * Content of placeholder.
   */
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the `placeholder`.
   */
  default?: string | VNode
}

export default {
  type: 'line'
} as Props
