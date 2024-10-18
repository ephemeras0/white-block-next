import 'virtual:uno.css'
import { withInstall } from '../../utils'
import _Form from './form.vue'
import _FormItem from '../form-item/form-item.vue'
import './styles.css'
import '../form-item/styles.css'

export * from './use'
export * from '../form-item/use'

export const Form = withInstall(_Form)
export const FormItem = withInstall(_FormItem)
export default Form
