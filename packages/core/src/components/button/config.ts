import {
  DisabledDefaultProps,
  DisabledProps,
  LoadingDefaultProps,
  LoadingProps,
  SizeDefaultProps,
  SizeProps
} from '../api'
import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot
export type Emits = XEmits
export type Props = XProps & SizeProps & LoadingProps & DisabledProps

export const DefaultProps = {
  ...SizeDefaultProps,
  ...LoadingDefaultProps,
  ...DisabledDefaultProps,
  ...XDefaultProps
}
