import prompts, { PromptObject } from 'prompts'
import TEXT from '../locales/text'

export function answerPrompts<T = Record<string, any>>(
  questions: PromptObject[]
) {
  return prompts(questions, {
    onCancel: () => {
      console.log()
      console.log(TEXT.TIP_CANCEL_OPERATION)
      console.log()
      process.exit(0)
    }
  }) as Promise<T>
}
