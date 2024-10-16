import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import {{ COMPONENT_PASCAL }} from '../{{ COMPONENT }}.vue'
// import { use{{ COMPONENT_PASCAL }} } from '../use'

describe('# {{ COMPONENT_PASCAL }}', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <{{ COMPONENT_PASCAL }} />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-{{ COMPONENT }}'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
