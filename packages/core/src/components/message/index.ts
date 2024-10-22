import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './message.vue'
import './styles.css'

export * from './use'
export const Message = withInstall(_Component)
export default Message
