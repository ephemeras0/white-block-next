import type { XNode as VNode } from '../types'
import { FormLayout, FormLabelAlign } from './types'

export type Slots = {
  /*
   * Default slot of the `form`.
   */
  default?: () => any
}

export type Emits = {
  /*
   * Submit form action.
   */
  submit: [data: Record<string, any>]
  /*
   * Reset form action.
   */
  reset: [data: Record<string, any>]
  /*
   * Click action.
   */
  click: [e: MouseEvent]
}

export type Props = {
  /*
   * Validate rules of the form data.
   */
  rules?: Record<string, any>
  /*
   * Data of the form.
   */
  data?: Record<string, any>
  /*
   * Layout of the form.
   * 'inline' | 'normal'
   */
  layout?: FormLayout
  /*
   * Width of the form item label.
   */
  labelWidth?: number
  /*
   * Align of the form item label.
   * 'start' | 'end' | 'top'
   */
  labelAlign?: FormLabelAlign
  /*
   * Children node types allowed.
   */
  allowTypes?: string[]
  /*
   * Submit form action.
   */
  onSubmit?: (e: any) => void
  /*
   * Reset form action.
   */
  onReset?: () => void
  /*
   * Content of the `form`.
   */
  default?: string | VNode
}

export default {
  layout: 'normal',
  allowTypes: ['WbFormItem']
} as any
