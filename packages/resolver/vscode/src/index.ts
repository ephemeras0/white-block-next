import type { ExtensionContext } from 'vscode'
import { registerCommands } from './commands'
import { registerHover } from './hover'
import { registerCompletions } from './completions'

export function activate(context: ExtensionContext) {
  registerCommands(context)
  registerHover(context)
  registerCompletions(context)
}

export function deactivate() {}
