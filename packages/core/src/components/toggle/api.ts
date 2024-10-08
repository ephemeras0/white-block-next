import { XNode as VNode } from '../types'

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
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the button, same as `content`.
   */
  default?: string | VNode
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
