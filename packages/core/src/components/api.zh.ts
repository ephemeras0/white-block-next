import type { SizeEnum } from './types'

/* ----------------------------------- 待删除 ----------------------------------- */
export type CommonEmits = {}

export type CommonProps = {
  /*
   * Loading or not.
   */
  loading?: boolean
  /*
   * Disabled or not.
   */
  disabled?: boolean
  /*
   * Size of the component。
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size?: SizeEnum | number
  // /*
  //  * 主题模式。
  //  * 'dark' | 'light'
  //  */
  // mode?: ModeEnum
}

export type FormElementProps = {
  /*
   * Size of the element.
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size?: SizeEnum | number
  /*
   * Disable or not.
   */
  disabled?: boolean
}

export const FormElementDefaultProps = {
  size: 'md',
  disabled: false
} as FormElementProps

export default {
  loading: false,
  disabled: false,
  size: 'md',
  mode: 'dark'
} as CommonProps

/* ----------------------------------- element ----------------------------------- */
export type SizeProps = {
  /*
   * 组件的尺寸。
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size?: SizeEnum | number
  /*
   * 是否禁用。
   */
  disabled?: boolean
}
export const SizeDefaultProps = {
  size: 'md',
  disabled: false
} as SizeProps

/* ----------------------------------- state ----------------------------------- */
export type DisabledProps = {
  /*
   * 是否加载中。
   */
  loading?: boolean
}
export const DisabledDefaultProps = {
  loading: false
} as DisabledProps

/* ----------------------------------- value ----------------------------------- */
export type ValueProps<T = any> = {
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
   * 同步值 value for `v-model`。
   */
  'update:modelValue': [value: any]
}
