import ora from 'ora'
import { dash, pascal, title } from 'radash'
import TEXT from '../../locales/text'
import {
  getComponentInfoPrompt,
  getComponentLocalePrompt,
  getPropertiesPrompt,
  getUnitTestPrompt
} from '../../prompt'
import type {
  ComponentInfoPromptResult,
  PropertiesPromptResult,
  UnitTestPromptResult
} from '../../types'
import { answerPrompts } from '../../utils'
import addComponentDocs from './docs'
import createComponentFiles from './files'
import registerComponent from './register'
import addComponentRouter from './router'

export default async function create(component: string, lang: 'en' | 'zh') {
  const componentInfo = await answerPrompts<ComponentInfoPromptResult>(
    getComponentInfoPrompt(component, lang)
  )
  const componentLocale = await answerPrompts<ComponentInfoPromptResult>(
    getComponentLocalePrompt(lang)
  )
  const componentProperties = await answerPrompts<PropertiesPromptResult>(
    getPropertiesPrompt()
  )
  const componentUnitTest =
    await answerPrompts<UnitTestPromptResult>(getUnitTestPrompt())
  const { COMPONENT_NAME = pascal(title(component)), COMPONENT_DESC } =
    componentInfo
  const { COMPONENT_NAME_LOCALE, COMPONENT_DESC_LOCALE } = componentLocale

  let localeData = {
    COMPONENT_PASCAL: COMPONENT_NAME || pascal(title(component)),
    COMPONENT: dash(title(COMPONENT_NAME)),
    COMPONENT_ZH: COMPONENT_NAME_LOCALE,
    COMPONENT_DESC,
    COMPONENT_DESC_ZH: COMPONENT_DESC_LOCALE
  }
  if (lang === 'zh') {
    localeData = {
      COMPONENT_PASCAL: COMPONENT_NAME_LOCALE || pascal(title(component)),
      COMPONENT: dash(title(COMPONENT_NAME_LOCALE)),
      COMPONENT_ZH: COMPONENT_NAME || '',
      COMPONENT_DESC: COMPONENT_DESC_LOCALE,
      COMPONENT_DESC_ZH: COMPONENT_DESC
    }
  }
  const answerData = {
    ...localeData,
    ...componentInfo,
    ...componentProperties,
    ...componentUnitTest
  }

  console.log()
  console.log(TEXT.TITLE_CREATE_COMPONENT)
  let spinner = ora(`${TEXT.TIP_ADD_COMPONENT_FILES}...`).start()
  await createComponentFiles(COMPONENT_NAME, answerData)
  spinner.succeed(TEXT.TIP_ADD_COMPONENT_FILES)

  spinner = ora(`${TEXT.TIP_REGISTER_COMPONENT}...`).start()
  await registerComponent(COMPONENT_NAME, answerData)
  spinner.succeed(TEXT.TIP_REGISTER_COMPONENT)

  spinner = ora(`${TEXT.TIP_ADD_COMPONENT_DOCS}...`).start()
  await addComponentDocs(COMPONENT_NAME, answerData)
  spinner.succeed(TEXT.TIP_ADD_COMPONENT_DOCS)

  spinner = ora(`${TEXT.TIP_ADD_COMPONENT_ROUTER}...`).start()
  await addComponentRouter(COMPONENT_NAME, answerData)
  spinner.succeed(TEXT.TIP_ADD_COMPONENT_ROUTER)

  console.log()
  console.log(TEXT.TIP_SUCCESS_DONE_ADD)
  console.log()
}
