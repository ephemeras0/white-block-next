import type { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Default slot of the `form-item`.
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
   * Label of the form item.
   */
  label?: string
  /*
   * Width of the form item label.
   */
  labelWidth?: number
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the `form-item`.
   */
  default?: string | VNode
}

export default {
  label: ''
} as Props
