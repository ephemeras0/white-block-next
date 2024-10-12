import MarkdownIt from 'markdown-it'
import MdContainer from 'markdown-it-container'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default function (md: MarkdownIt, payload: Record<string, any>) {
  const { COMPONENTS_PATH_RELATIVE } = payload

  md.use(MdContainer, 'custom-usage', {
    validate(params: string) {
      return !!params.trim().match(/^custom-usage\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^custom-usage\s*(\S*)\s*(\S*)$/)
      if (tokens[idx].nesting === 1) {
        const component = m && m.length > 1 ? m[1] : ''
        const contentHeight = m && m.length > 1 ? m[2] : ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const isUsageFile = sourceFile.includes('examples/usage.vue')
        const data = readFileSync(
          resolve(__dirname, COMPONENTS_PATH_RELATIVE, `${sourceFile}`),
          'utf-8'
        )
        const contentProps = JSON.parse(data)
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
                  options="${encodeURIComponent(JSON.stringify(propOptions))}"
                  configs="${encodeURIComponent(JSON.stringify(contentProps))}"
                  data="${encodeURIComponent(JSON.stringify(propData))}"
                  usage="${isUsageFile}"
                  contentHeight="${contentHeight}"
                >`
      }
      return '</CustomUsageBlock>'
    }
  })
}
