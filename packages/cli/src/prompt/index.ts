import type { PromptObject } from 'prompts'
import TEXT from '../locales/text'

export function getComponentInfoPrompt(name: string, lang: 'en' | 'zh') {
  console.log(TEXT.TITLE_COMPONENT_INFO)
  return [
    {
      name: 'COMPONENT_NAME',
      type: name ? null : 'text',
      message: TEXT.PROMPT_INPUT_COMPONENT_NAME,
      validate: (value: string) => {
        if (!value) return TEXT.RULE_COMPONENT_NAME_REQUIRED
        if (value.length < 2) return TEXT.RULE_COMPONENT_NAME_LENGTH
        if (lang === 'en' && !/^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)*$/.test(value))
          return TEXT.RULE_COMPONENT_NAME_VALIDATE_EN
        if (lang === 'zh' && !/^[\u4e00-\u9fff]+$/.test(value))
          return TEXT.RULE_COMPONENT_NAME_VALIDATE_ZH
        return true
      }
    },
    {
      name: 'COMPONENT_DESC',
      type: 'text',
      message: TEXT.PROMPT_INPUT_COMPONENT_DESCRIPTION,
      validate: (value: string) => {
        if (!value) return TEXT.RULE_COMPONENT_DESCRIPTION_REQUIRED
        if (value.length < 2) return TEXT.RULE_COMPONENT_DESCRIPTION_LENGTH
        return true
      }
    },
    {
      name: 'COMPONENTS_CATEGORY',
      type: 'select',
      message: TEXT.PROMPT_SELECT_COMPONENTS_CATEGORY,
      choices: [
        { title: 'Base', value: 'Base' },
        { title: 'Form', value: 'Form' },
        { title: 'Data', value: 'Data' }
      ]
    }
  ] as PromptObject[]
}
export function getComponentLocalePrompt(lang: 'en' | 'zh') {
  console.log()
  console.log(TEXT.TITLE_LOCALE)
  return [
    {
      name: 'USE_LOCALE',
      type: 'toggle',
      message: TEXT.PROMPT_USE_LOCALE,
      initial: true,
      active: 'yes',
      inactive: 'no'
    },
    {
      name: 'COMPONENT_NAME_LOCALE',
      type: (_: any, values) => (values.USE_LOCALE ? 'text' : null),
      message: TEXT.PROMPT_INPUT_COMPONENT_NAME_LOCALE,
      validate: (value: string) => {
        if (!value) return TEXT.RULE_COMPONENT_NAME_REQUIRED
        if (value.length < 2) return TEXT.RULE_COMPONENT_NAME_LENGTH
        if (lang === 'en' && !/^[\u4e00-\u9fff]+$/.test(value))
          return TEXT.RULE_COMPONENT_NAME_VALIDATE_ZH
        if (lang === 'zh' && !/^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)*$/.test(value))
          return TEXT.RULE_COMPONENT_NAME_VALIDATE_EN
        return true
      }
    },
    {
      name: 'COMPONENT_DESC_LOCALE',
      type: (_: any, values) => (values.USE_LOCALE ? 'text' : null),
      message: TEXT.PROMPT_INPUT_COMPONENT_DESCRIPTION_LOCALE,
      validate: (value: string) => {
        if (!value) return TEXT.RULE_COMPONENT_DESCRIPTION_REQUIRED
        if (value.length <= 2) return TEXT.RULE_COMPONENT_DESCRIPTION_LENGTH
        return true
      }
    }
  ] as PromptObject[]
}
export function getPropertiesPrompt() {
  console.log()
  console.log(TEXT.TITLE_PROPERTIES)
  return [
    {
      name: 'COMPONENT_PROPERTIES',
      type: 'multiselect',
      message: TEXT.PROMPT_SELECT_PROPERTIES,
      instructions: false,
      choices: [
        { title: 'Size', value: 'Size' },
        { title: 'Loading', value: 'Loading' },
        { title: 'Disabled', value: 'Disabled' },
        { title: 'Readonly', value: 'Readonly' },
        { title: 'Clearable', value: 'Clearable' },
        { title: 'Value', value: 'Value' }
      ]
    }
  ] as PromptObject[]
}
export function getUnitTestPrompt() {
  console.log()
  console.log(TEXT.TITLE_UNIT_TEST)
  return [
    {
      name: 'USE_UNIT_TEST',
      type: 'toggle',
      message: TEXT.PROMPT_USE_UNIT_TEST,
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  ] as PromptObject[]
}

export function removeComponentPrompt() {
  console.log()
  console.log(TEXT.TITLE_PROPERTIES)
  return [
    {
      name: 'COMPONENT_FEATURES',
      type: 'multiselect',
      message: TEXT.PROMPT_SELECT_PROPERTIES,
      instructions: false,
      choices: [
        { title: 'Remove files', value: 'file' },
        { title: 'Unregister component', value: 'register' },
        { title: 'Remove document', value: 'doc' }
      ]
    }
  ] as PromptObject[]
}
