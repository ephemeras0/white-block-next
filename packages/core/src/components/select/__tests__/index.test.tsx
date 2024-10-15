import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../select.vue'
// import { useSelect } from '../use'

describe('# Select', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Select />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-select'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
