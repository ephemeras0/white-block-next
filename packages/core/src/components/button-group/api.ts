import { Props as ButtonProps } from '../button/api'
import { ButtonTheme, ButtonType } from '../button/types'
import { XNode as VNode, SizeEnum } from '../types'
import { ButtonGroupOptions, ButtonGroupShape } from './types'

export type Slots = {
  /*
   * Default slot of the button group.
   */
  default?: () => any
}

export type Emits = {
  /*
   * Click action.
   */
  click: [key: string, e?: MouseEvent]
}

export type Props = {
  /*
   * Options data of radio-group.
   */
  options?: ButtonGroupOptions
  /*
   * Continuous transmission the properties for the `Button` component.
   */
  buttonProps?: ButtonProps
  /*
   * Display style of the button-group.
   * 'base' | 'plain' | 'outline' | 'ghost' | 'dashed' | 'link' | 'text'
   */
  type?: ButtonType
  /*
   * Display color of the button-group.
   * 'default' | 'primary' | 'success' | 'warning' | 'danger'
   */
  theme?: ButtonTheme
  /*
   * Shape of the button in button-group.
   * 'rectangle' | 'square' | 'round' | 'circle'
   */
  shape?: ButtonGroupShape
  /*
   * Separate button group or not.
   */
  separate?: boolean
  /*
   * Gap when separate.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  gap?: SizeEnum | number
  /*
   * Children node types allowed.
   */
  allowTypes?: string[]
  /*
   * HTML tag of the button element in button-group.
   */
  tag?: string
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
  /*
   * Default slot of the button group.
   */
  default?: VNode
}

export default {
  type: 'base',
  theme: 'primary',
  shape: 'rectangle',
  tag: 'button',
  separate: false,
  gap: 'md',
  allowTypes: ['WbButton']
} as Props
