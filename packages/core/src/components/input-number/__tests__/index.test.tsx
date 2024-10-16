import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumber from '../input-number.vue'
// import { useInputNumber } from '../use'

describe('# InputNumber', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <InputNumber />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-input-number'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
