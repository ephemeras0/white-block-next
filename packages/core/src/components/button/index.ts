import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './button.vue'
import './styles.css'

export * from './use'
export const Button = withInstall(_Component)
export default Button
