import type { XNode as VNode } from '../types'
import type { PopupPlacement, PopupTrigger } from './types'

export type Slots = {
  /*
   * Slot of popup trigger.
   */
  default: () => any
  /*
   * Slot of popup content.
   */
  content: () => any
}

export type Emits = {
  /*
   * Show action.
   */
  show: []
  /*
   * Hide action.
   */
  hide: []
}

export type Props = {
  /*
   * Attach node of popup.
   */
  attach?: string | HTMLElement
  /*
   * Placement of the popup display. Reference to https://popper.js.org/docs/v2/constructors/#options.
   * 'auto' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
   */
  placement?: PopupPlacement
  /*
   * 浮层显示的触发方式。
   * 'hover' | 'press' | 'click' | 'focus' | 'contextmenu'
   */
  trigger?: PopupTrigger
  /*
   * Show popup arrow or not.
   */
  arrow?: boolean
  /*
   * Animate when show popup.
   */
  animate?: boolean
  /*
   * Layout index of popup.
   */
  zIndex?: number
  /*
   * No preset style.
   */
  pure?: boolean
  /*
   * Disable or not.
   */
  disabled?: boolean
  /*
   * Destroy when popup hide.
   */
  destroyOnHide?: boolean
  /*
   * Show action.
   */
  onShow?: () => void
  /*
   * Hide action.
   */
  onHide?: () => void
  /*
   * Slot of popup trigger.
   */
  default?: string | VNode
  /*
   * Slot of popup content.
   */
  content?: string | VNode
}

export default {
  attach: 'body',
  placement: 'top',
  trigger: 'click',
  arrow: false,
  animate: true,
  zIndex: 1
} as any
