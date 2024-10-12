import { ModuleResolver } from '@white-block/types'
import MarkdownIt from 'markdown-it'
import MdContainer from 'markdown-it-container'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { COMPONENT_PROPERTIES } from '../../../config/components'

export default function (md: MarkdownIt, payload: Record<string, any>) {
  const { COMPONENTS_PATH_RELATIVE } = payload

  const commonTypeContent = readFileSync(
    resolve(__dirname, COMPONENTS_PATH_RELATIVE, 'api.ts'),
    'utf-8'
  )
  const CommonResolver = new ModuleResolver(commonTypeContent)
  const CommonExportData = CommonResolver.getExports()

  md.use(MdContainer, 'usage', {
    validate(params: string) {
      return !!params.trim().match(/^usage\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^usage\s*(\S*)\s*(\S*)$/)
      if (tokens[idx].nesting === 1) {
        const component = m && m.length > 1 ? m[1] : ''
        const contentHeight = m && m.length > 1 ? m[2] : ''
        const sourceFileToken = tokens[idx + 2] || {}

        let contentProps: any = null
        let fileType: string = ''
        let sourceCode = ''
        const propOptions: any = {
          input: [],
          number: [],
          toggle: [],
          select: []
        }

        const COMPONENT_ROOT = resolve(
          __dirname,
          COMPONENTS_PATH_RELATIVE,
          component
        )

        if (sourceFileToken.children) {
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          const dataFile = resolve(COMPONENT_ROOT, `${sourceFile}`)
          if (existsSync(dataFile)) {
            const data = readFileSync(dataFile, 'utf-8')
            contentProps = JSON.parse(data) || {}
          }
          fileType = 'url'
        } else if (existsSync(resolve(COMPONENT_ROOT, 'examples/usage.json'))) {
          const data = readFileSync(
            resolve(COMPONENT_ROOT, 'examples/usage.json'),
            'utf-8'
          )
          contentProps = JSON.parse(data) || {}
          fileType = 'json'
        } else if (existsSync(resolve(COMPONENT_ROOT, 'examples/usage.tsx'))) {
          const scriptContent = readFileSync(
            resolve(COMPONENT_ROOT, 'examples/usage.tsx'),
            'utf-8'
          )
            .replace(/\/\/\s+\S*\s/g, '')
            .replace('export default {', 'const defaultProps = {')
          sourceCode = `<template>
  <wb-${component} v-bind="defaultProps" />
</template>

<script setup lang="tsx">
${scriptContent}</script>`
          contentProps = {}
          fileType = 'tsx'
        } else if (existsSync(resolve(COMPONENT_ROOT, 'examples/usage.vue'))) {
          sourceCode = readFileSync(
            resolve(COMPONENT_ROOT, 'examples/usage.vue'),
            'utf-8'
          )
          contentProps = {}
          fileType = 'vue'
        }

        if (contentProps) {
          const typeContent = readFileSync(
            resolve(COMPONENT_ROOT, 'api.ts'),
            'utf-8'
          )
          const resolver = new ModuleResolver(typeContent)
          const exportData = resolver.getExports()
          const DefaultProps = exportData.default ?? {}
          const { Props, Slots } = exportData

          let resolveProps = { ...Props }
          for (const item in resolveProps) {
            if (item.startsWith('on')) {
              delete resolveProps[item]
              continue
            }
          }

          let resolveDefaultProps = { ...DefaultProps }
          for (const item in COMPONENT_PROPERTIES) {
            if (COMPONENT_PROPERTIES[item].includes(component)) {
              resolveProps = {
                ...resolveProps,
                ...CommonExportData[item]
              }
              resolveDefaultProps = {
                ...resolveDefaultProps,
                ...(CommonExportData[`${item}Default`] || {}),
                ...contentProps
              }
            }
          }

          for (const prop in resolveProps) {
            const data: any = resolveProps[prop]
            const description = data.comment[0].match(/\s*\*\s+(.*)/)[1] || ''

            if (['defaultValue', 'value', 'modelValue'].includes(prop)) continue
            // DISCUSSION: If prop defined in default, should list in Properties.
            if (Slots[prop] && DefaultProps[prop] === undefined) continue
            if (data.type.includes('string')) {
              propOptions.input.push({
                name: prop,
                description,
                value: resolveDefaultProps[prop]
              })
            } else if (data.type === 'number') {
              propOptions.number.push({
                name: prop,
                description,
                value: resolveDefaultProps[prop]
              })
            } else if (data.type === 'boolean') {
              propOptions.toggle.push({
                name: prop,
                description,
                value: resolveDefaultProps[prop]
              })
            } else if (data.comment?.[0]?.includes('|')) {
              const [, options] = data.comment[0]
                .replace(/\n/g, '')
                .split(/\s*\*\s*/)
                .map(i => i.trim())
                .filter(i => i)

              propOptions.select.push({
                name: prop,
                description,
                value: resolveDefaultProps[prop],
                options: options.split('|').map(i => {
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
        }

        return `<UsageBlock
                  component="${component}"
                  fileType="${fileType}"
                  options="${encodeURIComponent(JSON.stringify(propOptions))}"
                  data="${encodeURIComponent(JSON.stringify(contentProps))}"
                  source="${encodeURIComponent(sourceCode)}"
                  contentHeight="${contentHeight}"
                >`
      }
      return '</UsageBlock>'
    }
  })
}
