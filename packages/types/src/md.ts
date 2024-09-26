const TABLE_FLAG_ALIGNS: any = {
  left: ':--------',
  center: ':--------:',
  right: '--------:'
}

export interface TableHeaderItem {
  label: string
  value: string
  align?: 'left' | 'right' | 'center'
  transform?: Function
}

export type TableDataItem = Record<string, any>

export interface CreateTableOptions {
  headers: TableHeaderItem[]
  data: TableDataItem[]
  // eslint-disable-next-line no-unused-vars
  transform?: (propName: string, propValue: any) => void
}

/** create Markdown table */
export function createTable(options: CreateTableOptions) {
  const { headers = [], data = [], transform } = options

  const lines: string[] = []
  const headerLine: string[] = []
  const flagLine: string[] = []
  const props: string[] = []
  const transforms: Record<string, Function> = {}
  for (const h of headers) {
    headerLine.push(h.label)
    const align = h.align || 'left'
    flagLine.push(TABLE_FLAG_ALIGNS[align])
    props.push(h.value)
    if (h.transform) {
      transforms[h.value] = h.transform
    }
  }
  lines.push(`| ${headerLine.join(' | ')} |`)
  lines.push(`| ${flagLine.join(' | ')} |`)
  for (const row of data) {
    const line: any = []
    for (const prop of props) {
      let propData = row[prop]
      if (transforms[prop]) {
        propData = transforms[prop](propData)
      }
      if (transform) {
        propData = transform(prop, propData)
      }
      line.push(propData)
    }
    lines.push(`| ${line.join(' | ')} |`)
  }
  return lines.join('\n')
}
