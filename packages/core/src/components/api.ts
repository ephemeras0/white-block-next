import type { SizeEnum } from './types'

/* ----------------------------------- element ----------------------------------- */
export type Size = {
  /*
   * Size of the element.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size?: SizeEnum | number
}
export const SizeDefault = {
  size: 'md'
} as Size

/* ----------------------------------- state ----------------------------------- */
export type Loading = {
  /*
   * Loading or not.
   */
  loading?: boolean
}
export const LoadingDefault = {
  loading: false
} as Loading

export type Disabled = {
  /*
   * Disable or not.
   */
  disabled?: boolean
}
export const DisabledDefault = {
  disabled: false
} as Disabled

export type Readonly = {
  /*
   * Readonly or not.
   */
  readonly?: boolean
}
export const ReadonlyDefault = {
  readonly: false
} as Readonly

export type Clearable = {
  /*
   * Show button to clear ${COMPONENT_NAME} value or not.
   */
  clearable?: boolean
}
export const ClearableDefault = {
  clearable: false
} as Clearable

/* ----------------------------------- value ----------------------------------- */
export type Value<T = any> = {
  /*
   * Value of ${COMPONENT_NAME}. Supported `v-model` and `v-model:value`.
   */
  value?: T
  /*
   * Value of ${COMPONENT_NAME}.
   */
  modelValue?: T
  /*
   * Default value of the ${COMPONENT_NAME}.
   */
  defaultValue?: T
  /**
   * Event emitted when ${COMPONENT_NAME} value change.
   */
  onChange?: (payload: T) => void
}

export type ValueEmits<T = any> = {
  /**
   * Event emitted when ${COMPONENT_NAME} value change.
   */
  'change': [payload: T]
  /*
   * Sync value for `v-model:value`.
   */
  'update:value': [value: any]
  /*
   * Sync value for `v-model`.
   */
  'update:modelValue': [value: any]
}
