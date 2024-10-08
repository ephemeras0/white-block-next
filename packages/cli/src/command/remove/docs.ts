import { remove } from '@ephemeras/fs'
import { File } from '@ephemeras/file'
import { resolve } from 'node:path'
import {
  PROJECT_ROOT,
  COMPONENT_DOCUMENT_DIR,
  COMPONENT_ROUTES_DIR
} from '../../constant'

export default function (component: string) {
  ;[
    `${COMPONENT_DOCUMENT_DIR}/components/${component}.md`,
    `${COMPONENT_DOCUMENT_DIR}/zh/components/${component}.md`
  ].forEach(file => {
    remove(file)
  })
  ;['en', 'zh'].forEach(locale => {
    const configFile = new File(
      resolve(PROJECT_ROOT, COMPONENT_ROUTES_DIR, `${locale}.ts`)
    )
  })

  // TODO: 去除 menu
}
