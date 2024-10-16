import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../slider.vue'
// import { useSlider } from '../use'

describe('# Slider', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Slider />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-slider'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
