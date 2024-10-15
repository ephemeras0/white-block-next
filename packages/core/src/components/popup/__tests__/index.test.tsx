import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Popup from '../popup.vue'
// import { usePopup } from '../use'

describe('# Popup', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Popup />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-popup'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.skip('## Slots', () => {})

  describe.skip('## Events', () => {})

  describe.skip('## Props', () => {})

  describe.skip('## Composables', () => {})
})
