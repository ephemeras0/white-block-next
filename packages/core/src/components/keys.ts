import type { InjectionKey } from 'vue'
import type { FormProvidePayload } from './form/types'

export const KEY_FORM_PROVIDE = Symbol('FormProvide') as InjectionKey<FormProvidePayload>
