import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Space from '../space.vue'
// import { useSpace } from '../use'

describe('# Space', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount(Space)
      expect(wrapper.classes()).toEqual(['wb-'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
