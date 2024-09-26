import { computed, getCurrentInstance } from 'vue'
import { dash } from 'radash'
import { getComponentSizeStyles } from '@/utils'

interface UseClassesOptions<T = string> {
  valueProps?: T[]
  stateProps?: T[]
  nameValueProps?: T[]
}
export function useClasses<T = string>(options: UseClassesOptions<T>) {
  const instance = getCurrentInstance()
  const instanceProps: any = instance?.props || {}
  const name = dash(instance?.type?.name || '')

  return computed(() => {
    const result = [name]
    const { valueProps = [], stateProps = [], nameValueProps = [] } = options
    for (const item of valueProps) {
      if (instanceProps[item]) {
        result.push(`${name}--${instanceProps[item]}`)
      }
    }
    for (const item of stateProps) {
      if (instanceProps[item]) {
        result.push(`${name}--${item}`)
      }
    }
    for (const item of nameValueProps) {
      if (instanceProps[item]) {
        result.push(`${name}-${item}--${instanceProps[item]}`)
      }
    }
    return result.join(' ')
  })
}

export type UseStylesResult = Record<string, any> | undefined
export function useStyles(
  handler?: (
    result?: UseStylesResult,
    props?: Record<string, any>
  ) => UseStylesResult
) {
  const instance = getCurrentInstance()
  const instanceProps = instance?.props || {}
  const name = dash(instance?.type?.name || '')

  return computed(() => {
    let result = {}
    if (typeof instanceProps.size === 'number') {
      const sizeStyles = getComponentSizeStyles(name, instanceProps.size)
      result = sizeStyles
    }
    if (handler) {
      result = {
        ...result,
        ...(handler?.(result, instanceProps) || {})
      }
    }
    return result
  })
}
