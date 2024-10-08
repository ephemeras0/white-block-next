import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Component from './{{ COMPONENT }}.vue'
import './styles.css'

export * from './use'
export const {{ COMPONENT_PASCAL }} = withInstall(_Component)
export default {{ COMPONENT_PASCAL }}
