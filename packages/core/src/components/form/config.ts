import {
  Size,
  Loading,
  Disabled,
  Readonly,
  Value,
  SizeDefault,
  LoadingDefault,
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

export type Emits = XEmits & ValueEmits<Record<string, any>>

export type Props = XProps &
  Size &
  Loading &
  Disabled &
  Readonly &
  Value<Record<string, any>>

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...XDefaultProps
}
