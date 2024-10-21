import type { Ref } from 'vue'

export type FormLayout = 'inline' | 'normal'
export type FormLabelAlign = 'start' | 'end' | 'top'

export type FormRulesItem = Record<string, any>
export type FormRules = Record<string, FormRulesItem[]>
export type FormValidateError = {
  prop: string
  type: 'warning' | 'error'
  message: string
}
export type FormValidateResult = {
  pass: boolean
  errors: FormValidateError[]
}

export type FormProvidePayload = {
  labelWidthForm?: number
  labelWidth?: Ref<number>
  formValidate: Ref<FormValidateResult>
}
