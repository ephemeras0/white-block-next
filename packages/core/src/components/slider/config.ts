import {
  Size,
  Disabled,
  Readonly,
  Value,
  SizeDefault,
  DisabledDefault,
  ReadonlyDefault,
  ValueEmits
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits & ValueEmits

export type Props = XProps & Size & Disabled & Readonly & Value

export const DefaultProps = {
  ...SizeDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...XDefaultProps
}
