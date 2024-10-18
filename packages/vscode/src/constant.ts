export const LANGUAGE_IDS = [
  'vue',
  'typescript',
  'javascript',
  'javascriptreact',
  'typescriptreact'
]

export const WB_TAG_DASH_RE = /(?<=<wb-)(\w[\w-]+)/g
export const WB_TAG_CAMEL_RE = /(?<=<Wb)([A-Z]\w+)/g
// TODO: 更复杂情形，多个及嵌套
export const WB_LAST_TAG_CONTENT_RE = /(?:<wb-\w[\w-]+|<Wb[A-Z]\w+)\s+(.*)$/
// /(?:<wb-\w[\w-]+[\s\S]*)?<wb-\w[\w-]+([\s\S]*)|(?:<Wb[A-Z]\w+[\s\S]*)?<Wb[A-Z]\w+([\s\S]*)/
export const TAG_ATTRS_RE = /(\w+)="[^"]*"|(\w+)\s/g
