import { ToggleShape, ToggleTheme } from './types'

export type Slots = {}

export type Emits = {
  /*
   * Click action.
   */
  click: [e: boolean]
}

export type Props = {
  /*
   * Display style of the toggle.
   * 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'default'
   */
  theme?: ToggleTheme
  /*
   * Customize color of the button. Can be `named-color`, `hex`, `rgb`, etc.
   */
  color?: string
  /*
   * Shape of the toggle.
   * 'rectangle' | 'round'
   */
  shape?: ToggleShape
  /*
   * Readonly or not.
   */
  readonly?: boolean
  /*
   * Click action.
   */
  onClick?: (e: boolean) => void
}

export default {
  theme: 'primary',
  shape: 'round'
} as Props
