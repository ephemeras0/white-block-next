import XDefaultProps, {
  Emits as XEmits,
  Props as XProps,
  Slots as XSlot
} from './api'

export type Slots = XSlot

export type Emits = XEmits

export type Props = XProps

export const DefaultProps = {
  ...XDefaultProps
}
