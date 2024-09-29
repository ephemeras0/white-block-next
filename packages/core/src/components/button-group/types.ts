import { Props as ButtonProps } from '../button/api'

export type ButtonGroupOptions = (ButtonProps & {
  key?: string
  [x: string]: any
})[]
export type ButtonGroupType =
  | 'base'
  | 'plain'
  | 'outline'
  | 'ghost'
  | 'dashed'
  | 'text'
  | 'link'
export type ButtonGroupShape = 'rectangle' | 'round' | 'circle'
