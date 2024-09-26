import {
  ModuleResolver,
  getPropsConfig,
  getEmitsConfig
} from '@white-block/types'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function getCommonAPI(lang: string) {
  const code = readFileSync(
    resolve(
      __dirname,
      `../../../../packages/core/src/components/api${lang === 'en' ? '' : `.${lang}`}.ts`
    ),
    { encoding: 'utf-8' }
  )
  const resolver = new ModuleResolver(code)

  const importData = resolver.getImports()
  const exportData = resolver.getExports()

  const SizePropsData = getPropsConfig(
    exportData.Size,
    exportData.SizeDefault ?? {}
  )
  const LoadingPropsData = getPropsConfig(
    exportData.Loading,
    exportData.LoadingDefault ?? {}
  )
  const DisabledPropsData = getPropsConfig(
    exportData.Disabled,
    exportData.DisabledDefault ?? {}
  )
  const ReadonlyPropsData = getPropsConfig(
    exportData.Readonly,
    exportData.ReadonlyDefault ?? {}
  )
  const ClearablePropsData = getPropsConfig(
    exportData.Clearable,
    exportData.ClearableDefault ?? {}
  )
  const ValuePropsData = getPropsConfig(exportData.Value, {})
  const ValueEmitsData = getEmitsConfig(exportData.ValueEmits)

  return {
    exportData,
    importData,
    SizePropsData,
    LoadingPropsData,
    DisabledPropsData,
    ReadonlyPropsData,
    ClearablePropsData,
    ValuePropsData,
    ValueEmitsData
  }
}
