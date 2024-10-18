import type { ExtensionContext } from 'vscode'
import { commands, window, Selection } from 'vscode'

export function registerCommands(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('wb.move-cursor', (characterDelta: number) => {
      const active = window.activeTextEditor!.selection.active!
      const position = active.translate({ characterDelta })
      window.activeTextEditor!.selection = new Selection(position, position)
    })
  )
}
