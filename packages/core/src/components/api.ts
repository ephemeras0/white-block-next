import type { SizeEnum } from './types'

export type SizeProps = {
  /*
   * Size of the element.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size?: SizeEnum | number
}
export const SizeDefaultProps = {
  size: 'md'
} as SizeProps

export type LoadingProps = {
  /*
   * Loading or not.
   */
  loading?: boolean
}
export const LoadingDefaultProps = {
  loading: false
} as LoadingProps

export type DisabledProps = {
  /*
   * Disable or not.
   */
  disabled?: boolean
}
export const DisabledDefaultProps = {
  disabled: false
} as DisabledProps

export type ReadonlyProps = {
  /*
   * Readonly or not.
   */
  readonly?: boolean
}
export const ReadonlyDefaultProps = {
  readonly: false
} as ReadonlyProps

export type ClearableProps = {
  /*
   * Show button to clear ${COMPONENT_NAME} value or not.
   */
  clearable?: boolean
}
export const ClearableDefaultProps = {
  clearable: false
} as ClearableProps

/* ----------------------------------- value ----------------------------------- */
export type ValueProps<T = any> = {
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
