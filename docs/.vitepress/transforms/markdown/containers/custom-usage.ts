import { existsSync, readFileSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { COMPONENTS_ROOT } from '../constant'

/**
 * Custom usage block for component.
 *
 * @usage
 * :::custom-usage <COMPONENT> [HEIGHT]
 * <CONFIG>
 * :::
 *
 * @description
 * COMPONENT: Component name.
 * HEIGHT: Height of the usage block, REM.
 * CONFIG: Default properties config file(json/tsx/vue) of the component.
 */
export default function (md: any, MdContainer: any) {
  md.use(MdContainer, 'custom-usage', {
    validate(params: string) {
      return !!params.trim().match(/^custom-usage\s+(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^custom-usage\s+(\S*)\s*(\S*)$/)
      if (tokens[idx].nesting === 1) {
        const component = m && m.length > 1 ? m[1] : ''
        const contentHeight = m && m.length > 1 ? m[2] : ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const sourceFileExt = extname(sourceFile).replace('.', '')
        const sourceFileName = basename(sourceFile).replace(
          extname(sourceFile),
          ''
        )

        let contentProps: Record<string, any> = {
          components: [{}],
          configs: []
        }
        let componentList: Record<string, any>[] = [{}]
        let sourceCode = ''

        if (
          sourceFileExt === 'json' &&
          existsSync(join(COMPONENTS_ROOT, sourceFile))
        ) {
          const data = readFileSync(
            join(COMPONENTS_ROOT, `${sourceFile}`),
            'utf-8'
          )
          contentProps = JSON.parse(data) || {}
          componentList = contentProps.components || [{}]
        } else {
          const file = join(COMPONENTS_ROOT, sourceFile)
          if (existsSync(file)) {
            if (sourceFileExt === 'tsx') {
              sourceCode = `<template>
              <wb-${component} />
              </template>`
            } else if (sourceFileExt === 'vue') {
              sourceCode = readFileSync(file, 'utf-8')
            }
          }

          const COMPONENT_DIR = join(COMPONENTS_ROOT, component)
          if (
            existsSync(join(COMPONENT_DIR, `examples/${sourceFileName}.json`))
          ) {
            const data = readFileSync(
              join(COMPONENT_DIR, `examples/${sourceFileName}.json`),
              'utf-8'
            )
            contentProps = JSON.parse(data) || {}
            componentList = contentProps.components || [{}]
          }
        }

        const propOptions: any = {
          input: [],
          number: [],
          toggle: [],
          select: []
        }
        const propData: any = {}

        for (const item of contentProps.configs) {
          switch (item.type) {
            case 'toggle': {
              propOptions.toggle.push({
                name: item.name,
                value: item.default
              })
              break
            }
            case 'select': {
              propOptions.select.push({
                name: item.name,
                value: item.default,
                options: item.options
              })
              break
            }
            case 'input': {
              propOptions.input.push({
                name: item.name,
                value: item.default
              })
              break
            }
            case 'number': {
              propOptions.number.push({
                name: item.name,
                value: item.default
              })
              break
            }
          }
          propData[item.name] = item.default
        }
        return `<CustomUsageBlock
                  component="${component}"
                  fileType="${sourceFileExt}"
                  fileName="${sourceFileName}"
                  options="${encodeURIComponent(JSON.stringify(propOptions))}"
                  items="${encodeURIComponent(JSON.stringify(componentList))}"
                  data="${encodeURIComponent(JSON.stringify(propData))}"
                  source="${encodeURIComponent(sourceCode)}"
                  contentHeight="${contentHeight}"
                  >`
      }
      return '</CustomUsageBlock>'
    }
  })
}
