import { DisabledDefault, Disabled, SizeDefault, Size } from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot
export type Emits = XEmits
export type Props = XProps & Size & Disabled

export const DefaultProps = {
  ...SizeDefault,
  ...DisabledDefault,
  ...XDefaultProps
} as any
