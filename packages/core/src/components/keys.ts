import { InjectionKey, Ref } from 'vue'

type FormLabelWidthType = {
  formLabelWidth: number | undefined
  labelWidth: Ref<number>
  setLabelWidth: (width: number) => void
}
export const KEY_FORM_LABEL_WIDTH = Symbol('FormLabelWidth') as InjectionKey<FormLabelWidthType>

type FormRulesType = {
  rules: Record<string, any>[]
  formRules: Ref<Record<string, any>[]>
  setFormRules: (item: string, rules: any) => void
}
export const KEY_FORM_RULES = Symbol('FormRules') as InjectionKey<FormRulesType>
