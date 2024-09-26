import {
  Disabled,
  DisabledDefault,
  Loading,
  LoadingDefault,
  Size,
  SizeDefault
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot
export type Emits = XEmits
export type Props = XProps & Size & Loading & Disabled

export const DefaultProps = {
  ...SizeDefault,
  ...LoadingDefault,
  ...DisabledDefault,
  ...XDefaultProps
}
