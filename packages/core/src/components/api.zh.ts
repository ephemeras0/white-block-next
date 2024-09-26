import type { SizeEnum } from './types'

/* ----------------------------------- element ----------------------------------- */
export type Size = {
  /*
   * 组件尺寸。
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
   * 是否加载中。
   */
  loading?: boolean
}
export const LoadingDefault = {
  loading: false
} as Loading

export type Disabled = {
  /*
   * 是否禁用。
   */
  disabled?: boolean
}
export const DisabledDefault = {
  disabled: false
} as Disabled

export type Readonly = {
  /*
   * 是否只读。
   */
  readonly?: boolean
}
export const ReadonlyDefault = {
  readonly: false
} as Readonly

export type Clearable = {
  /*
   * 是否显示清空按钮用于清空 ${COMPONENT_NAME} 的值。
   */
  clearable?: boolean
}
export const ClearableDefault = {
  clearable: false
} as Clearable

/* ----------------------------------- value ----------------------------------- */
export type Value<T = any> = {
  /*
   * 组件 ${COMPONENT_NAME} 的绑定值。 支持 `v-model` 和 `v-model:value` 语法糖。
   */
  value?: T
  /*
   * 组件 ${COMPONENT_NAME} 的绑定值。
   */
  modelValue?: T
  /*
   * 组件 ${COMPONENT_NAME} 的默认值。
   */
  defaultValue?: T
  /**
   * 组件 ${COMPONENT_NAME} 值改变时触发的事件。
   */
  onChange?: (payload: T) => void
}
export type ValueEmits<T = any> = {
  /**
   * 组件 ${COMPONENT_NAME} 值改变时触发的事件。
   */
  'change': [payload: T]
  /*
   * 同步值 `v-model:value`。
   */
  'update:value': [value: any]
  /*
   * 同步值 `v-model`。
   */
  'update:modelValue': [value: any]
}
