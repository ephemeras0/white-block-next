import { join } from 'node:path'
import { Complier, nunjucks, prettier } from '@ephemeras/compiler'
import { resolveConfig } from '@ephemeras/fs'
import { COMPONENT_SOURCE_DIR, PROJECT_ROOT } from '../../constant'
import type { MetaData } from '../../types'

export default async function (_: string, data: MetaData) {
  const excludes = []
  if (!data.USE_UNIT_TEST) excludes.push('**/__tests__/**')
  if (!data.USE_LOCALE) excludes.push('**/api.*.ts')

  const prettierOptions =
    (await resolveConfig(join(PROJECT_ROOT, '.prettierrc'))) || {}

  const compiler = new Complier({
    context: PROJECT_ROOT,
    source: 'packages/cli/files/component',
    destination: `${COMPONENT_SOURCE_DIR}/${data.COMPONENT}`,
    data,
    clean: true,
    excludes
  })
    .use(nunjucks())
    .use(prettier({ prettier: prettierOptions }))

  await compiler.build()
}
