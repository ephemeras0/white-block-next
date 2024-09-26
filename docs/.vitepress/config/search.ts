import type { DefaultTheme } from 'vitepress'

export const localSearchConfig = {
  provider: 'local',
  options: {
    locales: {
      zh: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
} as { provider: 'local'; options?: DefaultTheme.LocalSearchOptions }

export const algoliaSearchConfig: DefaultTheme.AlgoliaSearchOptions = {
  appId: 'L7EE6C1COR',
  apiKey: 'e7bc307253eac4a8a1101f0dbf9ba258',
  indexName: 'white-block'
}
