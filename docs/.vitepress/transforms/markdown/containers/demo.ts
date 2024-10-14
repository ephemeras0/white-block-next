import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { COMPONENTS_ROOT } from '../constant'

/**
 * Demo block from vue file.
 *
 * @usage
 * :::demo [DESCRIPTION]
 * <DEMO_PATH>
 * :::
 *
 * @description
 * DEMO_PATH: relative path from components root: `packages/core/src/components`.
 * DESCRIPTION: description of demo, unused now.
 */
export default function (md: any, MdContainer: any) {
  md.use(MdContainer, 'demo', {
    validate(params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2] || {}
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const sourceCode = readFileSync(
          join(COMPONENTS_ROOT, sourceFile),
          'utf-8'
        )
        return `<DemoBlock
                  description="${description}"
                  path="${sourceFile}"
                  source="${encodeURIComponent(sourceCode)}"
                >`
      }
      return '</DemoBlock>'
    }
  })
}
