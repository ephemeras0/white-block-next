import { remove, exists } from '@ephemeras/fs'
import { COMPONENT_DOCUMENT_DIR } from '../../constant'

export default function (component: string) {
  ;[
    `${COMPONENT_DOCUMENT_DIR}/components/${component}.md`,
    `${COMPONENT_DOCUMENT_DIR}/zh/components/${component}.md`
  ].forEach(async file => {
    if (await exists(file)) {
      remove(file)
    }
  })
}
