import type { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Default slot of the `{{ COMPONENT }}`.
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
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the `{{ COMPONENT }}`.
   */
  default?: string | VNode
}

export default {
  default: ''
} as Props
