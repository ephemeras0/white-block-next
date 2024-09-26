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
    exportData.SizeProps,
    exportData.SizeDefaultProps ?? {}
  )
  const DisabledPropsData = getPropsConfig(
    exportData.DisabledProps,
    exportData.DisabledDefaultProps ?? {}
  )
  const ValuePropsData = getPropsConfig(exportData.ValueProps, {})
  const ValueEmitsData = getEmitsConfig(exportData.ValueEmits)

  return {
    exportData,
    importData,
    SizePropsData,
    DisabledPropsData,
    ValuePropsData,
    ValueEmitsData
  }
}
