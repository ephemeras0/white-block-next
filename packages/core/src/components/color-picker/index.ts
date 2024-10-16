import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './color-picker.vue'
import './styles.css'

export * from './use'
export const ColorPicker = withInstall(_Component)
export default ColorPicker
