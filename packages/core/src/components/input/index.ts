import _Input from './input.vue'
import { withInstall } from '../../utils'
import 'virtual:uno.css'
import './styles.css'

export * from './use'
export const Input = withInstall(_Input)

export default Input
