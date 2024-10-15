import type { ParserOptions } from 'prettier'
import parserBabel from 'prettier/plugins/babel'
import parserTS from 'prettier/plugins/typescript'
import parserHtml from 'prettier/plugins/html'
import parserESTree from 'prettier/plugins/estree'
import prettier from 'prettier/standalone'
import { createHighlighter } from 'shiki'

const DEFAULT_OPTIONS: Partial<ParserOptions> = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  quoteProps: 'consistent',
  proseWrap: 'preserve'
}

export function formatCode(code: string, options = DEFAULT_OPTIONS) {
  return prettier.format(code, {
    parser: 'vue',
    ...options,
    plugins: [parserHtml, parserBabel, parserTS, parserESTree]
  })
}

let codeHighlighter: any = null
export function getHighlighter() {
  if (!codeHighlighter)
    codeHighlighter = createHighlighter({
      themes: ['material-theme-palenight', 'material-theme'],
      langs: ['vue']
    })
  return codeHighlighter
}
