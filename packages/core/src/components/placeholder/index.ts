import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './placeholder.vue'
import './styles.css'

export * from './use'
export const Placeholder = withInstall(_Component)
export default Placeholder
