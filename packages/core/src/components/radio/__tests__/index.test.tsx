import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../radio.vue'
// import { useRadio } from '../use'

describe('# Radio', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Radio />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-radio'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
