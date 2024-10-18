import {
  ModuleResolver,
  getEmitsConfig,
  getPropsConfig
} from '@white-block/types'
import glob from 'fast-glob'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(__dirname, '../../..')
const OUTPUT_FILE = resolve(ROOT, 'packages/vscode/src/config.json')
const components = glob.sync([`packages/core/src/components/*/api.ts`])

const fileContent: any = {}
for (const file of components) {
  const nameReg = new RegExp(`src/components/(.*)/api.ts$`)
  const component = file.match(nameReg)?.[1] || ''

  const filePath = resolve(ROOT, file)
  if (!existsSync(filePath)) continue

  const code = readFileSync(filePath, 'utf-8')
  const resolver = new ModuleResolver(code)

  const exportData = resolver.getExports()
  const resolveProps = exportData.Props || {}
  const resolveEmits = exportData.Emits || {}

  const propsData = getPropsConfig(resolveProps, exportData.default)
  const emitsData = getEmitsConfig(resolveEmits)

  const result: any = []
  for (const item of propsData) {
    const name = item.name
    const description = item.comment?.[0]?.match(/\s*\*\s+(.*)/)?.[1] || ''
    const value = item.default
    if (item.type.includes('string')) {
      result.push({
        type: 'string',
        name,
        description,
        value: value ?? ''
      })
    } else if (['number', 'boolean'].includes(item.type)) {
      result.push({
        type: item.type,
        name,
        description,
        value
      })
    } else if (item.name.startsWith('on')) {
      result.push({
        type: 'function',
        name,
        description,
        value: item.type
      })
    } else if (item.comment?.[0]?.includes('|')) {
      const [, options] = item.comment[0]
        .replace(/\n/g, '')
        .split(/\s*\*\s*/)
        .map((i: any) => i.trim())
        .filter((i: any) => i)
      result.push({
        type: typeof value,
        name,
        description,
        value,
        options: options.split('|').map((i: any) => {
          const item = i
            .trim()
            .replace(/^'(.*)'$/, '$1')
            .trim()
          if (item === 'true') return true
          if (item === 'false') return false
          const asNumber = Number(item)
          if (!Number.isNaN(asNumber)) return asNumber
          return item
        })
      })
    }
  }
  for (const item of emitsData) {
    const name = item.name
    const description = item.comment?.[0]?.match(/\s*\*\s+(.*)/)?.[1] || ''
    result.push({
      type: 'event',
      name,
      description,
      value: item.type.replace(/\[(.*)\]/, '($1) => {}')
    })
  }
  fileContent[component] = result
}

writeFileSync(OUTPUT_FILE, JSON.stringify(fileContent), { encoding: 'utf-8' })
