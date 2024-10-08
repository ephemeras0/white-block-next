import { remove, exists } from '@ephemeras/fs'
import { join } from 'node:path'
import { PROJECT_ROOT, COMPONENT_SOURCE_DIR } from '../../constant'

export default async function (component: string) {
  const componentDir = join(
    PROJECT_ROOT,
    `${COMPONENT_SOURCE_DIR}/${component}`
  )

  if (await exists(componentDir)) {
    return remove(componentDir)
  }
}
