import { createFile, readFile } from '@ephemeras/fs'
import { join, resolve } from 'node:path'
import NJ from 'nunjucks'
import { PROJECT_ROOT, COMPONENT_DOCUMENT_DIR } from '../../constant'
import type { MetaData } from '../../types'

export default async function (_: string, data: MetaData) {
  const { renderString } = NJ

  if (data.COMPONENT_ZH) {
    const content = await readFile(
      resolve(PROJECT_ROOT, 'packages/cli/files/docs/index.zh.md'),
      { encoding: 'utf-8' }
    )
    const docFile = join(
      PROJECT_ROOT,
      `${COMPONENT_DOCUMENT_DIR}/zh/components/${data.COMPONENT}.md`
    )
    createFile(docFile, renderString(content, data))
  }

  const content = await readFile(
    resolve(PROJECT_ROOT, 'packages/cli/files/docs/index.md'),
    { encoding: 'utf-8' }
  )
  const docFile = join(
    PROJECT_ROOT,
    `${COMPONENT_DOCUMENT_DIR}/components/${data.COMPONENT}.md`
  )
  createFile(docFile, renderString(content, data))
}
