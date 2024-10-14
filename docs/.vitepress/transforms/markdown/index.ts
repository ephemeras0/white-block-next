import type MarkdownIt from 'markdown-it'
import MdContainer from 'markdown-it-container'
import useCustomUsageBlock from './containers/custom-usage'
import useDemoBlock from './containers/demo'
import useUsageBlock from './containers/usage'

export default (md: MarkdownIt) => {
  useDemoBlock(md, MdContainer)
  useUsageBlock(md, MdContainer)
  useCustomUsageBlock(md, MdContainer)
}
