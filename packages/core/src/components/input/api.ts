import { InputType, InputAlign } from './types'
import { XNode as VNode } from '../types'

export type Slots = {
  /*
   * Prefix slot before input area.
   */
  prefix: () => any
  /*
   * Prefix slot after input area.
   */
  suffix: () => any
}

export type Emits = {
  /*
   * Clear value action.
   */
  clear: []
  /*
   * Press `enter` action.
   */
  enter: []
  /*
   * Element blur action.
   */
  blur: []
}

export type Props = {
  /*
   * Display style of the input.
   * 'base' | 'ghost'
   */
  type?: InputType
  /*
   * Placeholder text of input area.
   */
  placeholder?: string
  /*
   * Content Align.
   * 'start' | 'center' | 'end'
   */
  align?: InputAlign
  /*
   * Maximum length allowed of input text.
   */
  maxLength?: number
  /*
   * Icon slot for the input.
   */
  icon?: string | VNode
  /*
   * Prefix slot before input.
   */
  prefix?: string | VNode
  /*
   * Suffix slot after input.
   */
  suffix?: string | VNode
}

export default {
  type: 'base',
  placeholder: '',
  clearable: true,
  maxLength: -1,
  align: 'start',
  readonly: false
} as Props
