import type { ParserOptions } from 'prettier'
import parserTS from 'prettier/plugins/babel'
import parserHtml from 'prettier/plugins/html'
import prettier from 'prettier/standalone'

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
    plugins: [parserHtml, parserTS]
  })
  // return code
}
