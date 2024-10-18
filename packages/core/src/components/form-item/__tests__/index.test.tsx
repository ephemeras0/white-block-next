import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FormItem from '../form-item.vue'
// import { useFormItem } from '../use'

describe('# FormItem', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <FormItem />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-form-item'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
