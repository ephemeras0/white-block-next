import { ToggleShape, ToggleTheme } from './types'

export type Slots = {}

export type Emits = {
  /*
   * 点击事件。
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * 显示风格。
   * 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'default'
   */
  theme?: ToggleTheme
  /*
   * 开关颜色, 支持颜色别名、十六进制、rgb 等。
   */
  color?: string
  /*
   * 开关形状。
   * 'rectangle' | 'round'
   */
  shape?: ToggleShape
  /*
   * 是否只读。
   */
  readonly?: boolean
  /*
   * 开关的值, 支持语法糖 `v-model` 或 `v-model:value`。
   */
  value?: boolean
  /*
   * 点击事件。
   */
  onClick?: (e: MouseEvent) => void
}

export default {
  theme: 'primary',
  shape: 'round'
} as Props
