const USAGE = {
  COMMAND_ADD: '添加组件',
  COMMAND_REMOVE: '移除组件',
  COMMAND_EDIT: '编辑组件',
  COMMAND_CONFIG_LIST: '列出所有的全局配置项',
  COMMAND_CONFIG_GET: '获取指定配置项',
  COMMAND_CONFIG_UNSET: '移除指定配置项'
}

const TIP = {
  WELCOME: '🚀 欢迎使用 CLI',
  SUCCESS_OPERATION: '操作成功',
  SUCCESS_REMOVE: '删除成功',
  CANCEL_OPERATION: '❌ 操作取消',
  NO_DATA: '没有数据',
  SUCCESS_DELETE: '删除成功',
  SUCCESS_DONE_ADD: '🎉 成功添加组件',
  SUCCESS_DONE_REMOVE: '成功移除组件',
  ADD_COMPONENT_FILES: '添加组件源文件',
  REGISTER_COMPONENT: '注册组件',
  ADD_COMPONENT_DOCS: '添加组件文档',
  ADD_COMPONENT_ROUTER: '添加组件路由',
  REMOVE_COMPONENT_FILES: '移除组件源文件',
  UNREGISTER_COMPONENT: '注销组件',
  REMOVE_COMPONENT_DOCS: '移除组件文档'
}

const TITLE = {
  CONFIG_LIST: '💬 全局配置列表:',
  COMPONENT_INFO: '💬 组件信息:',
  PROPERTIES: '💬 选择组件属性:',
  UNIT_TEST: '💬 单元测试:',
  LOCALE: '💬 多语言支持:',
  CREATE_COMPONENT: '💬 开始创建组件:',
  REMOVE_COMPONENT: '💬 开始移除组件:'
}

const PROMPT = {
  INPUT_COMPONENT_NAME: '输入组件名称:',
  INPUT_COMPONENT_DESCRIPTION: '输入组件描述:',
  SELECT_COMPONENTS_CATEGORY: '选择组件分组:',
  SELECT_PROPERTIES: '选择组件属性:',
  USE_UNIT_TEST: '是否使用单元测试?',
  USE_LOCALE: '是否多语言支持?',
  INPUT_COMPONENT_NAME_LOCALE: '输入组件名称（英文）:',
  INPUT_COMPONENT_DESCRIPTION_LOCALE: '输入组件描述（英文）:',
  SELECT_REMOVE_FEATURES: '选择要移除的特性:'
}

const RULE = {
  COMPONENT_NAME_REQUIRED: '请输入组件名称',
  COMPONENT_NAME_LENGTH: '组件名称须大于2个字符',
  COMPONENT_NAME_VALIDATE_EN: '组件名称须为大写驼峰格式',
  COMPONENT_NAME_VALIDATE_ZH: '组件名称须为中文',
  COMPONENT_DESCRIPTION_REQUIRED: '请输入组件描述',
  COMPONENT_DESCRIPTION_LENGTH: '组件描述须大于3个字符'
}

export default {
  USAGE,
  TIP,
  TITLE,
  PROMPT,
  RULE
}
