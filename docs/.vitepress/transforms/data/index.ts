import type { GetPropsConfig } from '@white-block/types'
import {
  ModuleResolver,
  createTable,
  getEmitsConfig,
  getPropsConfig
} from '@white-block/types'
import glob from 'fast-glob'
import MarkdownIt from 'markdown-it'
import { existsSync, readFileSync } from 'node:fs'
import { posix, resolve } from 'node:path'
import { pascal, title } from 'radash'
import { PageData } from 'vitepress'
import CoverageData from '../../../coverage.json'
import { COMPONENT_PROPERTIES } from '../../config/components'
import { getCommonAPI } from './common'
import { getEmitsHeader, getPropsHeader } from './constant'

const DOCS_PATH_RELATIVE = '../../..'
const Md = MarkdownIt()

export async function transformPageData(pageData: PageData) {
  const { frontmatter } = pageData
  const extendData = { params: { coverage: null, api: {} } }

  if (frontmatter.component) {
    const componentName = frontmatter.component
    const components = glob.sync([
      `../packages/core/src/components/${componentName}/*api*.ts`
    ])

    const localeReg = new RegExp(
      `core/src/components/${componentName}/.*api.?(.*).ts$`
    )
    const moduleReg = new RegExp(
      `core/src/components/${componentName}/(.+)-api.*ts$`
    )

    for (const file of components) {
      let name = pascal(title(componentName))
      const match = file.match(localeReg)
      const matchModule = file.match(moduleReg)
      if (matchModule) {
        name = pascal(title(matchModule[1]))
      }
      const lang = match?.[1] || 'en'

      const CommonData = getCommonAPI(lang)

      const filePath = resolve(__dirname, DOCS_PATH_RELATIVE, file)
      if (!existsSync(filePath)) continue

      const code = readFileSync(filePath, 'utf-8')
      const resolver = new ModuleResolver(code)
      const exportData = resolver.getExports()
      const resolveProps = exportData.Props || {}
      const resolveSlots = exportData.Slots || {}

      const slotsProps = {}
      for (const item in resolveSlots) {
        const foundItem = resolveProps[item]
        if (foundItem) {
          foundItem.type = `Slot / ${foundItem.type} / Function`
          slotsProps[item] = foundItem
          delete resolveProps[item]
          continue
        }
        const slotItem = resolveSlots[item]
        slotItem.type = `Slot / VNode / Function`
        slotsProps[item] = slotItem
        delete resolveProps[item]
      }
      const slotsPropsData = getPropsConfig(slotsProps, {})

      let componentValueType = typeof exportData.default.value || ''
      for (const item in resolveProps) {
        if (['value', 'modelValue', 'defaultValue'].includes(item)) {
          componentValueType = resolveProps[item].type
          delete resolveProps[item]
        }
      }
      const propsData = getPropsConfig(resolveProps, exportData.default)
      const emitsData = getEmitsConfig(exportData.Emits ?? {})

      const importData = resolver.getImports()
      const typeRoot =
        'https://github.com/Kythuen/white-block-next/blob/main/packages/core/src/components'

      let resolvePropsData = propsData
      let resolveEmitsData = emitsData

      for (const item in COMPONENT_PROPERTIES) {
        if (COMPONENT_PROPERTIES[item].includes(componentName)) {
          resolvePropsData = [
            ...resolvePropsData,
            ...(CommonData[`${item}PropsData`] ?? [])
          ]
          resolveEmitsData = [
            ...resolveEmitsData,
            ...(CommonData[`${item}EmitsData`] ?? [])
          ]
        }
      }

      const eventPropsData: GetPropsConfig = []
      const purePropsData: GetPropsConfig = []

      for (const item of resolvePropsData) {
        if (item.name.startsWith('on')) {
          eventPropsData.push(item)
          continue
        }
        purePropsData.push(item)
      }

      resolvePropsData = [
        ...purePropsData,
        ...eventPropsData,
        ...slotsPropsData
      ]

      const resolveImportDataMap: Record<string, string> = {
        string: 'string',
        number: 'number',
        boolean: 'boolean',
        undefined: 'undefined',
        null: 'null',
        any: 'any',
        Function: 'Function',
        Slot: 'Slot'
      }

      for (const key in importData) {
        resolveImportDataMap[key] = `${typeRoot}/${posix.join(
          componentName,
          `${importData[key]}.ts`
        )}`
      }
      for (const key in CommonData.importData) {
        resolveImportDataMap[key] = `${typeRoot}/${posix.join(
          componentName,
          '..',
          `${CommonData.importData[key]}.ts`
        )}`
      }
      const propsTable = createTable({
        headers: getPropsHeader(lang),
        data: resolvePropsData,
        transform: (propName: string, propValue: any) => {
          if (!propValue) return ''
          if (propName === 'type') {
            for (const key in resolveImportDataMap) {
              if (propValue.includes(key)) {
                if (resolveImportDataMap[key].startsWith('http')) {
                  // eslint-disable-next-line no-param-reassign
                  propValue = propValue.replace(
                    new RegExp(key, 'g'),
                    `[${key}](${resolveImportDataMap[key]})`
                  )
                }
              }
            }
            if (propValue === 'T') {
              // eslint-disable-next-line no-param-reassign
              propValue = propValue.replace(/T/g, componentValueType)
            }
            return propValue
          }
          if (propName === 'comment') {
            // eslint-disable-next-line no-param-reassign
            propValue = propValue.replace(
              /\$\{COMPONENT_NAME\}/g,
              componentName
            )
          }
          return propValue
        }
      })

      const emitsTableData = resolveEmitsData.filter(
        i => !i.name.includes('update:')
      )
      const emitsTable = createTable({
        headers: getEmitsHeader(lang),
        data: emitsTableData,
        transform: (propName: string, propValue: any) => {
          if (propName === 'type') {
            if (propValue.includes('T')) {
              // eslint-disable-next-line no-param-reassign
              propValue = propValue.replace(/T/g, componentValueType)
            }
          }
          if (propName === 'comment') {
            // eslint-disable-next-line no-param-reassign
            propValue = propValue.replace(
              /\$\{COMPONENT_NAME\}/g,
              componentName
            )
          }
          return propValue
        }
      })
      const componentData: any = {
        props: JSON.stringify(
          Md.render(propsTable)
            .replace(/&lt;br&gt;/g, '<br>')
            .replace(/\s+\/\s+/g, ' | ')
        )
      }
      if (emitsTableData.length) {
        componentData.events = JSON.stringify(
          Md.render(emitsTable)
            .replace(/&lt;br&gt;/g, '<br>')
            .replace(/\s+\/\s+/g, ' | ')
        )
      }
      extendData.params.api[name] = {
        ...extendData.params.api[name],
        [lang]: componentData
      }

      if (!extendData.params.coverage) {
        extendData.params.coverage = CoverageData[componentName] || {}
      }
    }
  }
  return extendData
}
