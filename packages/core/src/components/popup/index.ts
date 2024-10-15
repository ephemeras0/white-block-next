import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './popup.vue'
import './styles.css'

export * from './use'
export const Popup = withInstall(_Component)
export default Popup
