import { File } from '@ephemeras/file'
import { resolve } from 'node:path'
import { PROJECT_ROOT, COMPONENT_ROUTES_DIR } from '../../constant'
import type { MetaData } from '../../types'

export default async function (name: string, data: MetaData) {
  if (data.COMPONENT_ZH) {
    const configFile = new File(
      resolve(PROJECT_ROOT, `${COMPONENT_ROUTES_DIR}/zh.ts`)
    )
    configFile.get('SidebarComponents').add({
      text: data.COMPONENT_ZH,
      link: `/zh/components/${data.COMPONENT}`
    })
    configFile.save()
  }
  const configFile = new File(
    resolve(PROJECT_ROOT, `${COMPONENT_ROUTES_DIR}/en.ts`)
  )
  configFile
    .get('SidebarComponents')
    .add({ text: name, link: `/components/${data.COMPONENT}` })

  configFile.save()
}
