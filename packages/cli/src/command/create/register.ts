import { File } from '@ephemeras/file'
import { format, readFile, writeFile } from '@ephemeras/fs'
import { join, resolve } from 'node:path'
import { resolveConfig } from 'prettier'
import {
  PROJECT_ROOT,
  COMPONENT_SOURCE_DIR,
  COMPONENT_CONFIG_FILE
} from '../../constant'
import type { MetaData } from '../../types'

export default async function (name: string, data: MetaData) {
  const component = data.COMPONENT
  const componentsFile = resolve(
    PROJECT_ROOT,
    `${COMPONENT_SOURCE_DIR}/index.ts`
  )
  const exportDefine = `export * from './${data.COMPONENT}'`

  const content = await readFile(componentsFile, { encoding: 'utf-8' })
  const lines = content.split('\n')
  if (lines.find(l => l.trim() === exportDefine)) return
  lines.push(exportDefine)

  const options = await resolveConfig(join(PROJECT_ROOT, '.prettierrc'))
  const formatContent = await format(lines.filter(i => i.trim()).join('\n'), {
    parser: 'babel-ts',
    ...options
  })
  await writeFile(componentsFile, formatContent, { encoding: 'utf-8' })

  const configFile = new File(resolve(PROJECT_ROOT, COMPONENT_CONFIG_FILE), {
    generator: { retainLines: true }
  })
  if (data.COMPONENTS_CATEGORY) {
    configFile
      .get('COMPONENTS_CATEGORY')
      .get(data.COMPONENTS_CATEGORY)
      .set(9999, component)
  }
  if (data.COMPONENT_PROPERTIES.length) {
    data.COMPONENT_PROPERTIES.forEach((item: any) => {
      configFile
        .root()
        .get('COMPONENT_PROPERTIES')
        .get(item)
        .set(9999, component)
    })
  }
  configFile.save()
}
