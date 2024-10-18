import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../form.vue'
// import { useForm } from '../use'

describe('# Form', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Form />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-form'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
