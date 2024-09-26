import type { ResolveTypeProperty } from './parse'

export interface PropsConfig extends ResolveTypeProperty {
  name: string
  default?: any
}
export type GetPropsConfig = PropsConfig[]
export function getPropsConfig(
  props: Record<string, ResolveTypeProperty> = {},
  defaultProps: Record<string, any> = {}
) {
  const result: GetPropsConfig = []
  for (const name in props) {
    result.push({
      ...props[name],
      default: defaultProps[name],
      name
    })
  }
  return result
}

export interface EmitsConfig extends ResolveTypeProperty {
  name: string
}
export type GetEmitsConfig = EmitsConfig[]
export function getEmitsConfig(emits: Record<string, ResolveTypeProperty>) {
  const result: GetEmitsConfig = []
  for (const name in emits) {
    const { comment, type } = emits[name]
    result.push({
      comment,
      type,
      name
    })
  }
  return result
}
