import type {
  ExtensionContext,
  CompletionItemProvider,
  TextDocument
} from 'vscode'
import {
  CompletionItem,
  CompletionItemKind,
  languages,
  Position,
  Range,
  TextEdit
} from 'vscode'
import { LANGUAGE_IDS, WB_LAST_TAG_CONTENT_RE, TAG_ATTRS_RE } from './constant'
import { dash, title, pascal } from 'radash'
import PropertiesConfig from './config.json'

function getAttrs(text: string) {
  const result: string[] = []

  let match
  while ((match = TAG_ATTRS_RE.exec(text)) !== null) {
    const name = match[1] ?? match[2]
    if (name) {
      result.push(name)
    }
  }
  return result
}
export function registerCompletions(context: ExtensionContext) {
  const componentProvider: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position) {
      const beforeText = document.getText(
        new Range(
          new Position(0, 0),
          new Position(position.line, position.character)
        )
      )
      const matched = beforeText.match(/\s+(wb-|Wb)$/) || []

      if (!matched) return null
      const completionItems: CompletionItem[] = []

      const suggestion = []
      for (const item in PropertiesConfig) {
        const name = `wb-${item}`
        const pascalName = pascal(title(name))
        suggestion.push(
          new CompletionItem(name, CompletionItemKind.Field),
          new CompletionItem(pascalName, CompletionItemKind.Field)
        )
      }
      completionItems.push(...suggestion)

      return completionItems
    },
    resolveCompletionItem(item: CompletionItem) {
      const name = dash(item.label as string).slice(3)

      const descriptor: any = {
        path: '/button',
        // attrs: ['type="primary"']
        attrs: null
      }
      const attrText = descriptor.attrs ? ' ' + descriptor.attrs.join(' ') : ''
      const tagSuffix = descriptor.closeSelf ? '' : `</${item.label}>`
      const characterDelta =
        -tagSuffix.length + (descriptor.characterDelta ?? 0)

      item.insertText = `<${item.label}${attrText}`
      item.insertText += descriptor.closeSelf ? '/>' : `>${tagSuffix}`
      item.command = {
        title: 'wb.move-cursor',
        command: 'wb.move-cursor',
        arguments: [characterDelta]
      }

      return item
    }
  }

  const attrProvider: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position) {
      const beforeText = document.getText(
        new Range(
          new Position(0, 0),
          new Position(position.line, position.character)
        )
      )
      const offset = document.offsetAt(position)
      const afterText = document.getText().substring(offset)
      const currentChar = document.getText().charAt(offset - 1)
      const nextCharacter = afterText.charAt(0)

      let lastTag = ''
      let matches = beforeText.match(/<([^>]+)>?/g)
      if (matches && matches.length > 0) {
        lastTag = matches[matches.length - 1]
      }
      console.log('lastTag', lastTag) // 输出: <wb-button
      const name = lastTag.match(/^<(.+)\s/)?.[1] || ''
      const pureName = dash(title(name)).split('-')[1]

      const completionItems: CompletionItem[] = []

      const propsConfig = (PropertiesConfig as any)[pureName]

      const [_, propName, propValue] =
        beforeText.match(/(\S*)="([^"]*)\s$/) || []
      if (propName) {
        const item = propsConfig.find((i: any) => i.name === propName)
        console.log(item?.name)
        if (!item) return null
        const text = document.getText(
          new Range(
            new Position(position.line, 0),
            new Position(position.line, position.character)
          )
        )

        const range = new Range(
          new Position(
            position.line,
            text.indexOf(propValue) > -1
              ? text.indexOf(propValue)
              : position.character - 1
          ),
          new Position(position.line, position.character)
        )
        const rangeToRemove = new Range(
          new Position(
            position.line,
            propValue ? text.indexOf(propValue) : position.character - 1
          ),
          new Position(position.line, position.character)
        )
        item?.options?.forEach((i: any) => {
          const suggestItem = new CompletionItem(
            { label: i, description: i },
            CompletionItemKind.Value
          )
          suggestItem.insertText = i
          // suggestItem.range = range
          suggestItem.additionalTextEdits = [TextEdit.delete(rangeToRemove)]
          completionItems.push(suggestItem)
        })
        console.log(completionItems)
        return completionItems
      }
      const matched = beforeText.match(WB_LAST_TAG_CONTENT_RE) || []
      const attrsContent = matched[1] ?? matched[2]
      const attrsItems = getAttrs(attrsContent)
      // console.log(beforeText)
      // console.log(attrsContent)
      // console.log(attrsItems)
      switch (currentChar) {
        case ' ':
          propsConfig
            .filter((i: any) => !attrsItems.includes(i.name))
            .filter((i: any) => ['string', 'boolean', 'event'].includes(i.type))
            .forEach((item: any) => {
              let name = item.name
              if (item.type === 'event') {
                name = `@${name}`
              }
              const suggestItem = new CompletionItem(
                { label: name, description: item.description },
                CompletionItemKind.Value
              )
              let insertText = `${item.name}="${item.value}"`
              if (item.type === 'boolean') {
                insertText = item.name
              } else if (item.type === 'event') {
                insertText = `@${item.name}="${item.value}"`
              }
              suggestItem.insertText = insertText
              completionItems.push(suggestItem)
            })
          break
        case ':':
          propsConfig
            .filter((i: any) => !attrsItems.includes(i.name))
            .filter((i: any) =>
              ['number', 'boolean', 'function'].includes(i.type)
            )
            .forEach((item: any) => {
              const suggestItem = new CompletionItem(
                { label: item.name, description: item.description },
                CompletionItemKind.Value
              )
              suggestItem.insertText = `${item.name}="${item.value || ''}"`
              completionItems.push(suggestItem)
            })
          break
        case '@':
          propsConfig
            .filter((i: any) => !attrsItems.includes(i.name))
            .filter((i: any) => i.type.includes('event'))
            .forEach((item: any) => {
              const suggestItem = new CompletionItem(
                { label: item.name, description: item.description },
                CompletionItemKind.Value
              )
              suggestItem.insertText = `${item.name}="${item.value || ''}"`
              completionItems.push(suggestItem)
            })
          break
      }

      return completionItems
    },
    resolveCompletionItem(item: CompletionItem) {
      if ((item.insertText as string).includes('""')) {
        item.command = {
          title: 'wb.move-cursor',
          command: 'wb.move-cursor',
          arguments: [-1]
        }
        return item
      }
    }
  }

  context.subscriptions.push(
    languages.registerCompletionItemProvider(LANGUAGE_IDS, componentProvider)
  )
  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      LANGUAGE_IDS,
      attrProvider,
      ' ',
      '@',
      ':'
    )
  )
}
