import {
  Size,
  Loading,
  Disabled,
  Value,
  SizeDefault,
  LoadingDefault,
  DisabledDefault,
  ValueEmits
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits & ValueEmits<boolean>

export type Props = XProps & Size & Loading & Disabled & Value<boolean>

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...XDefaultProps
}
