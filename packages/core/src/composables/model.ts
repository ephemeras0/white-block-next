import { ref, Ref, ToRefs, getCurrentInstance } from 'vue'

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void

export interface UseVModelOptions<T = any> {
  props: ToRefs<Record<string, any>>
  onSetValue?: (value: T) => void
  propName?: string
}

/**
 * Resolve `v-model`, `v-model:value`, `defaultValue` and automatically handle `change` event.
 *
 * priority: `v-model` > `v-model:value` > `defaultValue`
 */
export function useVModel<T = any>(
  options: UseVModelOptions<T>
): [Ref<T>, ChangeHandler<T, any[]>] {
  const instance = getCurrentInstance()
  if (!instance) return [] as any

  const { onSetValue, propName = 'value' } = options
  const { emit, vnode } = instance as any
  const vProps = vnode.props || {}

  let changeHandler: any = () => {}
  if (instance.props.onChange) {
    changeHandler = instance.props.onChange
  }

  if (Object.prototype.hasOwnProperty.call(vProps, 'modelValue')) {
    return [
      options.props.modelValue,
      (newValue, ...args) => {
        emit('update:modelValue', newValue)
        emit('change', newValue)
        changeHandler(newValue, ...args)
        onSetValue?.(newValue)
      }
    ]
  }

  if (Object.prototype.hasOwnProperty.call(vProps, propName)) {
    return [
      options.props[propName],
      (newValue, ...args) => {
        emit(`update:${propName}`, newValue)
        emit('change', newValue)
        changeHandler(newValue, ...args)
        onSetValue?.(newValue)
      }
    ]
  }

  const internalValue: Ref<T> = ref(options.props.defaultValue.value)

  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue
      changeHandler(newValue, ...args)
      emit('change', newValue)
      onSetValue?.(newValue)
    }
  ]
}
