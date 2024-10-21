import {
  Size,
  Loading,
  Disabled,
  Readonly,
  SizeDefault,
  LoadingDefault,
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

export type Props = XProps & Size & Loading & Disabled & Readonly

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...ReadonlyDefault,
  ...XDefaultProps
}
