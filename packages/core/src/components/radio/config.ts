import {
  Clearable,
  ClearableDefault,
  Disabled,
  DisabledDefault,
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

export type Emits = XEmits & ValueEmits<boolean>

export type Props = XProps &
  Size &
  Disabled &
  Readonly &
  Clearable &
  Value<boolean>

export const DefaultProps = {
  ...SizeDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...ClearableDefault,
  ...XDefaultProps
}
