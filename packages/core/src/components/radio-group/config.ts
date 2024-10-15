import {
  Size,
  Disabled,
  Readonly,
  Clearable,
  Value,
  ValueEmits,
  SizeDefault,
  DisabledDefault,
  ReadonlyDefault,
  ClearableDefault
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits & ValueEmits<any>

export type Props = XProps & Size & Disabled & Readonly & Clearable & Value<any>

export const DefaultProps = {
  ...SizeDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...ClearableDefault,
  ...XDefaultProps
}
