import { Hover, languages } from 'vscode'
import { title, dash, unique } from 'radash'
import type { ExtensionContext, TextDocument, Position } from 'vscode'
import { WB_TAG_DASH_RE, WB_TAG_CAMEL_RE, LANGUAGE_IDS } from './constant'

export function registerHover(context: ExtensionContext) {
  function provideHover(document: TextDocument, position: Position) {
    const line = document.lineAt(position)
    const linkComponents = line.text.match(WB_TAG_DASH_RE) ?? []
    const bigCamelizeComponents = line.text.match(WB_TAG_CAMEL_RE) ?? []
    const components = unique(
      [...linkComponents, ...bigCamelizeComponents.map(i => dash(title(i)))],
      i => i
    )
    if (!components.length) return

    const hoverTips = components
    // TODO: 增加更详细提示信息
    return new Hover(hoverTips)
  }

  context.subscriptions.push(
    languages.registerHoverProvider(LANGUAGE_IDS, {
      provideHover
    })
  )
}
