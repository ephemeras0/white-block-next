import { File } from '@ephemeras/file'
import { format, readFile, resolveConfig, writeFile } from '@ephemeras/fs'
import { join, resolve } from 'node:path'
import {
  PROJECT_ROOT,
  COMPONENT_SOURCE_DIR,
  COMPONENT_CONFIG_FILE
} from '../../constant'

export default async function (component: string) {
  const componentsFile = resolve(
    PROJECT_ROOT,
    `${COMPONENT_SOURCE_DIR}/index.ts`
  )
  const exportDefine = `export * from './${component}'`

  const content = await readFile(componentsFile, { encoding: 'utf-8' })
  const lines = content.split('\n')
  const targetLineIndex = lines.findIndex(
    (l: string) => l.trim() === exportDefine
  )
  if (targetLineIndex > -1) {
    lines.splice(targetLineIndex, 1)
  }
  const options = await resolveConfig(join(PROJECT_ROOT, '.prettierrc'))
  const formatContent = await format(
    lines.filter((i: string) => i.trim()).join('\n'),
    {
      parser: 'babel-ts',
      ...options
    }
  )
  await writeFile(componentsFile, formatContent, { encoding: 'utf-8' })

  const configFile = new File(resolve(PROJECT_ROOT, COMPONENT_CONFIG_FILE), {
    generator: { retainLines: true }
  })

  ;['Base', 'Form', 'Data'].forEach((item: any) => {
    const data = configFile.root().get('COMPONENTS_CATEGORY').get(item)
    const list = data.json()
    const index = list.findIndex((i: string) => i === component)
    data.delete(index)
    configFile.save()
  })
  ;['Size', 'Loading', 'Disabled', 'Readonly', 'Clearable', 'Value'].forEach(
    (item: any) => {
      const data = configFile.root().get('COMPONENT_PROPERTIES').get(item)
      const list = data.json()
      const index = list.findIndex((i: string) => i === component)
      data.delete(index)
      configFile.save()
    }
  )
  configFile.save()
}
