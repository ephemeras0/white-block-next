import type { Props as RadioProps } from '../radio/api'
import type { XNode as VNode } from '../types'
import type {
  RadioGroupShape,
  RadioGroupTheme,
  RadioGroupType,
  RadioOptionsItem
} from './types'

export type Slots = {
  /*
   * Default slot of the `RadioGroup`.
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
   * Options data of radio-group.
   */
  options?: RadioOptionsItem[]
  /*
   * Style of the radio-group.
   * 'base' | 'tab' | 'outline'
   */
  type?: RadioGroupType
  /*
   * When property `type` equal `tab`, you can choose detail display type of the tab.
   * 'soft' | 'emphasize'
   */
  tabType?: RadioGroupTheme
  /*
   * When type of the group-radio is `tab` or `outline`, change the shape of the radio item.
   * 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'default'
   */
  theme?: RadioGroupTheme
  /*
   * Colors of the radio-group.
   * 'rectangle' | 'round'
   */
  shape?: RadioGroupShape
  /*
   * Turn content layout direction to `vertical`.
   */
  vertical?: boolean
  /*
   * Continuous transmission the properties for the `Radio` component.
   */
  radioProps?: RadioProps
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Content of the `RadioGroup`.
   */
  default?: string | VNode
}

export default {
  type: 'base',
  shape: 'rectangle',
  tabType: 'soft',
  theme: 'primary',
  vertical: false,
  options: []
} as any
