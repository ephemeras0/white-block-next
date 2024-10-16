import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Space from '../space.vue'
// import { useSpace } from '../use'

describe('# Space', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount(Space)
      expect(wrapper.classes()).toEqual([
        'wb-space',
        'wb-space--start',
        'wb-space--md'
      ])
      expect(wrapper.props()).toEqual({
        vertical: false,
        align: 'start',
        gap: 'md'
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('## Slots', () => {
    describe('### content', () => {
      describe('### default', () => {
        it('#### slot: default', () => {
          const wrapper = mount({
            render() {
              return (
                <Space>
                  <button>button1</button>
                  <button>button2</button>
                </Space>
              )
            }
          })
          expect(wrapper.findAll('button').length).toBe(2)
        })
        it('#### prop: default', () => {
          const wrapper = mount(Space, {
            props: {
              default: (
                <>
                  <button>button1</button>
                  <button>button2</button>
                </>
              )
            }
          })
          expect(wrapper.findAll('button').length).toBe(2)
        })
      })
    })
  })

  // describe('## Events', () => {})

  // describe('## Props', () => {})

  // describe('## Composables', () => {})
})
