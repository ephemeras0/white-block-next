import {
  Size,
  Loading,
  Disabled,
  Readonly,
  Clearable,
  Value,
  SizeDefault,
  LoadingDefault,
  DisabledDefault,
  ReadonlyDefault,
  ClearableDefault,
  ValueEmits
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits & ValueEmits<any>

export type Props = XProps &
  Size &
  Loading &
  Disabled &
  Readonly &
  Clearable &
  Value<any>

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...ClearableDefault,
  ...XDefaultProps
}
