import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Toggle from '../toggle.vue'
// import { useToggle } from '../use'

describe('# Toggle', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount(Toggle)
      expect(wrapper.classes()).toContain('wb-toggle')
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
