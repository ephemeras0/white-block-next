const USAGE = {
  COMMAND_ADD: 'Add component',
  COMMAND_REMOVE: 'Remove component',
  COMMAND_EDIT: 'Edit component',
  COMMAND_CONFIG: 'global config for code linter',
  COMMAND_CONFIG_LIST: 'display all existing configurations',
  COMMAND_CONFIG_GET: 'get configuration item',
  COMMAND_CONFIG_UNSET: 'remove configuration item'
}

const TIP = {
  WELCOME: '🚀 Welcome to CLI',
  SUCCESS_OPERATION: 'Successfully operation',
  SUCCESS_REMOVE: 'Successfully delete',
  CANCEL_OPERATION: '❌ Cancel operation',
  NO_DATA: 'No data found',
  SUCCESS_DELETE: 'Successfully delete',
  SUCCESS_DONE_ADD: '🎉 Successfully add component',
  SUCCESS_DONE_REMOVE: 'Successfully remove component',
  ADD_COMPONENT_FILES: 'add component files',
  REGISTER_COMPONENT: 'register component',
  ADD_COMPONENT_DOCS: 'add component docs',
  ADD_COMPONENT_ROUTER: 'add component router',
  REMOVE_COMPONENT_FILES: 'remove component files',
  UNREGISTER_COMPONENT: 'unregister component',
  REMOVE_COMPONENT_DOCS: 'remove component document'
}

const TITLE = {
  CONFIG_LIST: '💬 Config list:',
  COMPONENT_INFO: '💬 Component information:',
  PROPERTIES: '💬 Component properties:',
  UNIT_TEST: '💬 Use unit test:',
  LOCALE: '💬 Use language locale:',
  CREATE_COMPONENT: '💬 Start add component:',
  REMOVE_COMPONENT: '💬 Start remove component:'
}

const PROMPT = {
  INPUT_COMPONENT_NAME: 'Input component name:',
  INPUT_COMPONENT_DESCRIPTION: 'Input component desciption:',
  SELECT_COMPONENTS_CATEGORY: 'Select component group:',
  SELECT_PROPERTIES: 'Select component properties:',
  USE_UNIT_TEST: 'Use unit test?',
  USE_LOCALE: 'Use locales?',
  INPUT_COMPONENT_NAME_LOCALE: 'Input component name (Chinese):',
  INPUT_COMPONENT_DESCRIPTION_LOCALE: 'Input component description (Chinese):',
  SELECT_REMOVE_FEATURES: 'Select features to remove:'
}

const RULE = {
  COMPONENT_NAME_REQUIRED: 'please input component name',
  COMPONENT_NAME_LENGTH: 'component name should have at least 2 characters',
  COMPONENT_NAME_VALIDATE_EN: 'component name should be Pascal Case',
  COMPONENT_NAME_VALIDATE_ZH: 'component name should be Chinese',
  COMPONENT_DESCRIPTION_REQUIRED: 'please input component description',
  COMPONENT_DESCRIPTION_LENGTH:
    'component name should have at least 2 characters'
}

export default {
  USAGE,
  TIP,
  TITLE,
  PROMPT,
  RULE
}
