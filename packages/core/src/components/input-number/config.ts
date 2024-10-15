import {
  Clearable,
  ClearableDefault,
  Disabled,
  DisabledDefault,
  Loading,
  LoadingDefault,
  Readonly,
  ReadonlyDefault,
  Size,
  SizeDefault,
  Value,
  ValueEmits
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits & ValueEmits<number>

export type Props = XProps &
  Size &
  Loading &
  Disabled &
  Readonly &
  Clearable &
  Value<number>

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...ClearableDefault,
  ...XDefaultProps
}
