import type { XNode as VNode } from '../types'
import type {
  InputNumberType,
  InputNumberTheme,
  InputNumberAlign
} from './types'

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
   * Click action.
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * Display style of the input.
   * 'base' | 'ghost'
   */
  type?: InputNumberType
  /*
   * Operation buttons display style of the input-number.
   * 'side' | 'inner'
   */
  theme?: InputNumberTheme
  /*
   * Placeholder text of input area.
   */
  placeholder?: string
  /*
   * Content Align.
   * 'start' | 'center' | 'end'
   */
  align?: InputNumberAlign
  /*
   * Maximum value.
   */
  max?: number
  /*
   * Minimum value.
   */
  min?: number
  /*
   * Value change step when click buttons.
   */
  step?: number
  /*
   * Decimal places to retaine.
   */
  decimal?: number
  /*
   * Enable thousands separator or not.
   */
  separator?: boolean
  /*
   * Function to customize the value display in input area.
   * <br>`(value: number, toFixedValue?: string) => string`
   */
  format?: Function
  /*
   * Readonly or not.
   */
  readonly?: boolean
  /*
   * Prefix slot before input content.
   */
  prefix?: string | VNode
  /*
   * Suffix slot after input content.
   */
  suffix?: string | VNode
}

export default {
  type: 'base',
  theme: 'inner',
  step: 1,
  decimal: 0,
  separator: false,
  placeholder: '',
  align: 'start',
  readonly: false
} as Props
