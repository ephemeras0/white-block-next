export type Slots = {
  /*
   * Default slot of the `color-picker`.
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
   * No preset style.
   */
  pure?: boolean
  /*
   * Show eyedropper or not.
   */
  dropper?: boolean
  /*
   * Click action.
   */
  onClick?: (e: MouseEvent) => void
}

export default {
  pure: false,
  dropper: false
} as Props
