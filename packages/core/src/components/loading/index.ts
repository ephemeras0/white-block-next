import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './loading.vue'
import './styles.css'

export * from './use'
export const Loading = withInstall(_Component)
export default Loading
