import { XNode as VNode } from '../types'
import { SpaceAlignEnum, SpaceGapEnum } from './types'

export type Slots = {
  /*
   * 内容插槽。
   */
  default: () => any
}

export type Emits = {}

export type Props = {
  /*
   * 主轴方向。
   */
  vertical?: boolean
  /*
   * 子元素对齐方式。
   * 'start' | 'center' | 'end'
   */
  align?: SpaceAlignEnum
  /*
   * 子元素间的间隔大小。
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  gap?: SpaceGapEnum | number
  /*
   * 内容插槽。
   */
  default?: string | VNode
}

export default {
  vertical: false,
  align: 'start',
  gap: 'md'
} as Props
