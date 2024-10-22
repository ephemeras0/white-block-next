import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from '../loading.vue'
// import { useLoading } from '../use'

describe('# Loading', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Loading />
        }
      })
      // expect(wrapper.classes()).toEqual(['wb-loading'])
      // expect(wrapper.props()).toEqual({})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {})

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
