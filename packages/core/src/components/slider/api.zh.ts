import { Props as PopupProps } from '../popup/api'

export type Slots = {}

export type Emits = {}

export type Props = {
  /*
   * 最大值。
   */
  max?: number
  /*
   * 最小值。
   */
  min?: number
  /*
   * 透传属性到 `Popup` 组件。
   */
  popupProps?: PopupProps
}

export default {} as Props
