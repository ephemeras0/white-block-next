import { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Default slot of the `{{ COMPONENT_PASCAL }}`.
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
   * Content of the `{{ COMPONENT_PASCAL }}`.
   */
  default?: string | VNode
}

export default {
  content: '',
  color: '',
  theme: 'primary',
} as Props
