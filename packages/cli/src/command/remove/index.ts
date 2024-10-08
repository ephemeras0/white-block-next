import ora from 'ora'
import { dash, title } from 'radash'
import TEXT from '../../locales/text'
import { removeComponentPrompt } from '../../prompt'
import { answerPrompts } from '../../utils'
import removeComponentDocs from './docs'
import removeComponentFiles from './files'
import unregisterComponent from './register'

export default async function remove(component: string) {
  const { COMPONENT_FEATURES } = await answerPrompts<{
    COMPONENT_FEATURES: string[]
  }>(removeComponentPrompt())

  const COMPONENT_DASH = dash(title(component))
  console.log()
  console.log(TEXT.TITLE_REMOVE_COMPONENT)

  let spinner
  if (COMPONENT_FEATURES.includes('file')) {
    spinner = ora(`${TEXT.TIP_REMOVE_COMPONENT_FILES}...`).start()
    await removeComponentFiles(COMPONENT_DASH)
    spinner.succeed(TEXT.TIP_REMOVE_COMPONENT_FILES)
  }
  if (COMPONENT_FEATURES.includes('register')) {
    spinner = ora(`${TEXT.TIP_UNREGISTER_COMPONENT}...`).start()
    await unregisterComponent(COMPONENT_DASH)
    spinner.succeed(TEXT.TIP_UNREGISTER_COMPONENT)
  }
  if (COMPONENT_FEATURES.includes('doc')) {
    spinner = ora(`${TEXT.TIP_REMOVE_COMPONENT_DOCS}...`).start()
    await removeComponentDocs(COMPONENT_DASH)
    spinner.succeed(TEXT.TIP_REMOVE_COMPONENT_DOCS)
  }

  console.log()
  console.log(TEXT.TIP_SUCCESS_DONE_REMOVE)
  console.log()
}
