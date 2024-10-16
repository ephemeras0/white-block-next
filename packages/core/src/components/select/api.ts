import { Props as InputProps } from '../input/api'
import { Props as PopupProps } from '../popup/api'
import type { SelectOptions } from './types'

export type Slots = {}

export type Emits = {
  /*
   * Action when selecting options.
   */
  select: [value: string | number]
  /*
   * Action when show options.
   */
  show: []
  /*
   * Action when hide options.
   */
  hide: []
}

/**
 * hideOnSelect - default: true
 * maxItems - default: 10 - overflow: scroll
 */
export type Props = {
  /*
   * Options list of select.
   */
  options?: SelectOptions
  /*
   * When property `type` equal `tab`, you can choose detail display type of the tab.
   * 'soft' | 'emphasize'
   */
  theme?: 'soft' | 'emphasize'
  /*
   * Show arrow icon of select.
   */
  icon?: boolean
  /*
   * Max content height.
   */
  maxContentHeight?: string
  /*
   * Continuous transmission the properties for the `Input` component.
   */
  inputProps?: InputProps
  /*
   * Continuous transmission the properties for the `Popup` component.
   */
  popupProps?: PopupProps
  /*
   * Action when selecting options.
   */
  onSelect?: (selected: string | number) => void
  /*
   * Action when show options.
   */
  onShow?: () => void
  /*
   * Action when hide options.
   */
  onHide?: () => void
}

export default {
  options: [],
  theme: 'soft',
  maxContentHeight: '15rem',
  icon: true
} as any
