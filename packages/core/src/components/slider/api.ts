import type { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Default slot of the `slider`.
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
   * Content of the `slider`.
   */
  default?: string | VNode
}

export default {} as Props
