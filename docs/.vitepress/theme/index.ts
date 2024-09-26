import 'virtual:uno.css'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import WhiteBlock from 'white-block'
import CustomUsageBlock from '~/components/global/CustomUsageBlock.vue'
import DemoBlock from '~/components/global/DemoBlock.vue'
import DemoBox from '~/components/global/DemoBox.vue'
import UsageBlock from '~/components/global/UsageBlock.vue'
import Layout from '~/components/layout/Index.vue'
import Overview from '~/components/layout/overview/Index.vue'
import './styles/index.less'

if (process.env.NODE_ENV === 'production') {
  import('white-block/dist/styles/index.css')
}

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.use(WhiteBlock)
    app.component('DemoBlock', DemoBlock)
    app.component('UsageBlock', UsageBlock)
    app.component('CustomUsageBlock', CustomUsageBlock)
    app.component('DemoBox', DemoBox)
    app.component('Overview', Overview)
    // eslint-disable-next-line no-param-reassign
    router.onBeforePageLoad = () => {
      if (!import.meta.env.SSR) {
        document.getElementById('layoutRoot')?.scrollTo(0, 0)
      }
    }
  }
}

export default theme
