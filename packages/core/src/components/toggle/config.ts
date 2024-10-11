import {
  Size,
  Disabled,
  Readonly,
  Value,
  SizeDefault,
  DisabledDefault,
  ReadonlyDefault
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits

export type Props = XProps & Size & Disabled & Readonly & Value<boolean>

export const DefaultProps = {
  ...SizeDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...XDefaultProps
}
