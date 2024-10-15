import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Placeholder from '../placeholder.vue'
// import { usePlaceholder } from '../use'

describe('# Placeholder', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Placeholder />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-placeholder'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
