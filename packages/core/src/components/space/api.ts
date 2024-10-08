import { XNode as VNode } from '../types'
import { SpaceAlignEnum, SpaceGapEnum } from './types'

export type Slots = {
  /*
   * Content slot of `Space`.
   */
  default: () => any
}

export type Emits = {}

export type Props = {
  /*
   * Change main-axis direction to vertical.
   */
  vertical?: boolean
  /*
   * Alignment of children elements.
   * 'start' | 'center' | 'end'
   */
  align?: SpaceAlignEnum
  /*
   * Gap size between children elements.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  gap?: SpaceGapEnum | number
  /*
   * Content slot of `Space`.
   */
  default?: string | VNode
}

export default {
  vertical: false,
  align: 'start',
  gap: 'md'
} as Props
