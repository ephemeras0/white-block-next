import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../button.vue'
import { useButton } from '../use'

describe('# Button', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount(Button)
      expect(wrapper.classes()).toEqual([
        'wb-button',
        'wb-button--base',
        'wb-button--primary',
        'wb-button--rectangle',
        'wb-button--md'
      ])
      expect(wrapper.props()).toEqual({
        block: false,
        color: '',
        content: '',
        default: undefined,
        disabled: false,
        loading: false,
        onClick: undefined,
        prefix: undefined,
        shape: 'rectangle',
        size: 'md',
        suffix: undefined,
        tag: 'button',
        theme: 'primary',
        type: 'base'
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('## Slots', () => {
    describe('### content', () => {
      it('#### slot: content', () => {
        const wrapper = mount(Button, {
          slots: { content: 'Button' }
        })
        expect(wrapper.text()).toEqual('Button')
      })
      it('#### prop: content', () => {
        const wrapper = mount(Button, {
          props: { content: 'Button' }
        })
        expect(wrapper.text()).toEqual('Button')
      })
      it('#### prop: content[node]', () => {
        const wrapper = mount(Button, {
          slots: { content: () => <span>Button</span> }
        })
        expect(wrapper.text()).toEqual('Button')
      })
      it('#### prop: content[node] function', () => {
        const wrapper = mount(Button, {
          props: { content: () => <span>Button</span> }
        })
        expect(wrapper.text()).toEqual('Button')
      })
    })

    describe('### default', () => {
      it('#### slot: default', () => {
        const wrapper = mount(Button, {
          slots: { default: () => <span>Button</span> }
        })
        expect(wrapper.text()).toEqual('Button')
      })
      it('#### prop: default', () => {
        const wrapper = mount(Button, {
          props: { default: 'Button' }
        })
        expect(wrapper.text()).toEqual('Button')
      })
      it('#### prop: default[node]', () => {
        const wrapper = mount(Button, {
          slots: { default: () => <span>Button</span> }
        })
        expect(wrapper.text()).toEqual('Button')
      })
    })

    describe('### prefix', () => {
      it('#### slot: prefix', () => {
        const wrapper = mount(Button, {
          slots: { prefix: 'Prefix', content: 'Button' }
        })
        expect(wrapper.text()).toEqual('PrefixButton')
      })
      it('#### prop: prefix[node]', () => {
        const wrapper = mount(Button, {
          props: { prefix: <span>Prefix</span>, content: 'Button' }
        })
        expect(wrapper.text()).toEqual('PrefixButton')
      })
    })

    describe('### suffix', () => {
      it('#### slot: suffix', () => {
        const wrapper = mount(Button, {
          slots: { suffix: 'Suffix', content: 'Button' }
        })
        expect(wrapper.text()).toEqual('ButtonSuffix')
      })
      it('#### property: suffix[node]', () => {
        const wrapper = mount(Button, {
          props: { suffix: <span>Suffix</span>, content: 'Button' }
        })
        expect(wrapper.text()).toEqual('ButtonSuffix')
      })
    })
  })

  describe('## Events', () => {
    describe('### click', () => {
      it('#### click', async () => {
        const wrapper = mount(Button)
        await wrapper.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
      })
      it('#### click: disabled', () => {
        const wrapper = mount(Button, { disabled: true })
        expect(wrapper.emitted()).toEqual({})
      })
      it('#### click: loading', () => {
        const wrapper = mount(Button, { loading: true })
        expect(wrapper.emitted()).toEqual({})
      })
    })
  })

  describe('## Props', () => {
    it('### size', () => {
      const wrapper = mount(Button, {
        props: { size: 'sm' }
      })
      expect(wrapper.classes()).toContain('wb-button--sm')
    })
    it('### size:number', () => {
      const wrapper = mount(Button, {
        props: { size: 32 }
      })
      const elStyle = wrapper.find('button').attributes('style')
      expect(
        elStyle?.includes('--wb-button-height: calc(32 / 16 * 1rem)')
      ).toBe(true)
    })

    it('### type', () => {
      const wrapper = mount(Button, {
        props: { type: 'plain' }
      })
      expect(wrapper.classes()).toContain('wb-button--plain')
    })

    it('### theme', () => {
      const wrapper = mount(Button, {
        props: { theme: 'default' }
      })
      expect(wrapper.classes()).toContain('wb-button--default')
    })

    it('### shape', () => {
      const wrapper = mount(Button, {
        props: { shape: 'circle' }
      })
      expect(wrapper.classes()).toContain('wb-button--circle')
    })

    it('### color', () => {
      const wrapper = mount(Button, {
        props: { color: 'rgb(255 165 0)' }
      })
      const elStyle = wrapper.find('button').attributes('style')
      expect(
        elStyle?.includes('--wb-button-color-main: rgb(255 165 0 / 1);')
      ).toBe(true)
    })

    it('### tag', () => {
      const wrapper = mount(Button, {
        props: { tag: 'a' }
      })
      expect(wrapper.element.tagName).toBe('A')
    })

    it('### disabled', () => {
      const wrapper = mount(Button, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('wb-button--disabled')
    })

    it('### loading', () => {
      const wrapper = mount(Button, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('wb-button--loading')
    })
  })

  describe('## Composables', () => {
    const { node: MyButton } = useButton()
    it('### no configs', () => {
      const wrapper = mount(MyButton)
      expect(wrapper.classes()).toContain('wb-button--md')
    })
    const { node: MyButton2 } = useButton({
      content: 'button',
      size: 'sm'
    })
    it('### with props', async () => {
      const wrapper = mount(MyButton2, { props: { block: true } })
      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(['wb-button--sm', 'wb-button--block'])
      )
      await wrapper.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('click')
    })
  })
})
