import { Props as ButtonProps } from '../button/api'
import { ButtonTheme, ButtonType } from '../button/types'
import { XNode as VNode, SizeEnum } from '../types'
import { ButtonGroupOptions, ButtonGroupShape } from './types'

export type Slots = {
  /*
   * 按钮组的默认插槽。
   */
  default?: () => any
}

export type Emits = {
  /*
   * 单击操作。
   */
  click: [key: string]
}

export type Props = {
  /*
   * 按钮组子元素的配置数据。
   */
  options?: ButtonGroupOptions
  /*
   * 透传 `Button` 组件的属性。
   */
  buttonProps?: ButtonProps
  /*
   * 按钮组的显示样式。
   * 'base' | 'plain' | 'outline' | 'ghost' | 'dashed' | 'link' | 'text'
   */
  type?: ButtonType
  /*
   * 按钮组的显示颜色。
   * 'default' | 'primary' | 'success' | 'warning' | 'danger'
   */
  theme?: ButtonTheme
  /*
   * 按钮组中按钮的形状。
   * 'rectangle' | 'square' | 'round' | 'circle'
   */
  shape?: ButtonGroupShape
  /*
   * 是否分离展示.
   */
  separate?: boolean
  /*
   * 若分离展示时的间距.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  gap?: SizeEnum | number
  /*
   * 允许的子元素类型.
   */
  allowTypes?: string[]
  /*
   * 按钮组子元素为 `WbButton` 时, `button` 元素的 HTML 标签类型。
   */
  tag?: string
  /**
   * 单击操作。
   */
  onClick?: (e: MouseEvent) => void
  /*
   * 按钮组的默认插槽。
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
