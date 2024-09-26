const LOCALE_PROPS_TITLE_MAP = {
  name: { en: 'Name', zh: '名称' },
  type: { en: 'Type', zh: '类型' },
  default: { en: 'Default', zh: '默认值' },
  comment: { en: 'Description', zh: '说明' },
  required: { en: 'Required', zh: '必传' }
}
const LOCALE_EMITS_TITLE_MAP = {
  name: { en: 'Name', zh: '名称' },
  type: { en: 'Parameters', zh: '参数' },
  comment: { en: 'Description', zh: '说明' }
}

export function getPropsHeader(lang = 'en'): any {
  return [
    { label: LOCALE_PROPS_TITLE_MAP.name[lang], value: 'name' },
    {
      label: LOCALE_PROPS_TITLE_MAP.type[lang],
      value: 'type',
      transform: (val: any) => val?.replace('|', '&#124;')
    },
    {
      label: LOCALE_PROPS_TITLE_MAP.default[lang],
      value: 'default',
      // align: 'center',
      transform: (val: any) => {
        if (['', undefined, null].includes(val)) {
          return ''
        }
        if (typeof val === 'object') {
          return `\`${JSON.stringify(val)}\``
        }
        return typeof val === 'string' ? `\`'${val}'\`` : `\`${val}\``
      }
    },
    {
      label: LOCALE_PROPS_TITLE_MAP.comment[lang],
      value: 'comment',
      transform: (val: any) => {
        const comments = val[0]
          .split('\n')
          .filter(l => l.trim())
          .map((l: string) => {
            const line = l.match(/\*\s+(.*)\s*/)?.[1] || ''
            if (line.includes('|')) return `<br>\`${line.replace(/\|/g, '/')}\``
            return line
          })
        return comments.join('')
      }
    },
    {
      label: LOCALE_PROPS_TITLE_MAP.required[lang],
      value: 'required',
      align: 'center',
      transform: (val: boolean) => (val ? 'Y' : 'N')
    }
  ]
}

export function getEmitsHeader(lang = 'en'): any {
  return [
    {
      label: LOCALE_EMITS_TITLE_MAP.name[lang],
      value: 'name',
      transform: (val: any) => val?.replace(/'/g, '')
    },
    {
      label: LOCALE_EMITS_TITLE_MAP.type[lang],
      value: 'type',
      transform: (val: string) => `\`(${val})\``
    },
    {
      label: LOCALE_EMITS_TITLE_MAP.comment[lang],
      value: 'comment',
      transform: (val: any) => {
        const comments = val[0]
          .split('\n')
          .filter(l => l.trim())
          .map((l: string) => {
            const line = l.match(/\*\s+(.*)\s*/)?.[1] || ''
            if (line.includes('|')) return `\`${line.replace(/\|/g, '/')}\``
            return line
          })
        return comments.join('')
      }
    }
  ]
}
