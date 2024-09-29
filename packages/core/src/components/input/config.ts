import {
  DisabledDefault,
  Disabled,
  ReadonlyDefault,
  Readonly,
  ClearableDefault,
  Clearable,
  LoadingDefault,
  Loading,
  SizeDefault,
  Size,
  Value,
  ValueEmits
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot
export type Emits = XEmits & ValueEmits
export type Props = XProps &
  Size &
  Loading &
  Disabled &
  Readonly &
  Clearable &
  Value<string>

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...ClearableDefault,
  ...XDefaultProps
}
