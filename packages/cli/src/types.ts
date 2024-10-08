export type CreatePromptResult = {
  COMPONENT_NAME: string
  COMPONENT_DESC: string
  COMPONENTS_CATEGORY: string
  USE_LOCALE: boolean
  COMPONENT_NAME_LOCALE: string
  COMPONENT_DESC_LOCALE: string
  COMPONENT_PROPERTIES: string[]
  USE_UNIT_TEST: boolean
}

export type ComponentInfoPromptResult = {
  COMPONENT_NAME?: string
  COMPONENT_DESC: string
  COMPONENTS_CATEGORY: string
  USE_LOCALE: string
  COMPONENT_NAME_LOCALE: string
  COMPONENT_DESC_LOCALE: string
}

export type PropertiesPromptResult = { COMPONENT_PROPERTIES: string[] }

export type UnitTestPromptResult = { USE_UNIT_TEST: boolean }

export type MetaData = {
  COMPONENT: string
  COMPONENT_PASCAL: string
  COMPONENT_ZH: string
  COMPONENT_DESC: string
  COMPONENT_DESC_ZH: string
  COMPONENTS_CATEGORY: string
  USE_LOCALE: string
  COMPONENT_PROPERTIES: string[]
  USE_UNIT_TEST: boolean
}
