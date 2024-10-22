import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from '../message.vue'
// import { useMessage } from '../use'

describe('# Message', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Message />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-message'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
