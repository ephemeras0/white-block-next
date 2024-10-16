import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorPicker from '../color-picker.vue'
// import { useColorPicker } from '../use'

describe('# ColorPicker', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <ColorPicker />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-color-picker'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
