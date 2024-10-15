import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioGroup from '../radio-group.vue'
// import { useRadioGroup } from '../use'

describe('# RadioGroup', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <RadioGroup />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-radio-group'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
