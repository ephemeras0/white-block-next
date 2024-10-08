import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../input.vue'
// import { useButtonGroup } from '../use'

describe('# Input', () => {
  describe('## Base', () => {
    it('### default config', () => {
      const wrapper = mount({
        render() {
          return <Input />
        }
      })
      expect(wrapper.classes()).toEqual([
        'wb-input',
        'wb-input--base',
        'wb-input--start',
        'wb-input--rectangle',
        'wb-input--md'
      ])
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  // describe('## Slots', () => {
  //   it('### default', () => {
  //     const wrapper = mount({
  //       render() {
  //         return (
  //           <ButtonGroup size="sm">
  //             <Button size="lg">button1</Button>
  //             <Button>button2</Button>
  //             <Button type="outline">button3</Button>
  //           </ButtonGroup>
  //         )
  //       }
  //     })
  //     expect(wrapper.classes()).toContain('wb-button-group--sm')
  //     const children = wrapper.findAllComponents({ name: 'WbButton' })
  //     expect(children.length).toBe(3)
  //     expect(children[0].classes()).toContain('wb-button--lg')
  //     expect(children[1].classes()).toContain('wb-button--md')
  //     expect(children[2].classes()).toContain('wb-button--outline')
  //   })
  // })

  // describe('## Events', () => {
  //   const options = [
  //     { key: '1', content: 'button1' },
  //     { key: '2', content: 'button2' },
  //     { key: '3', content: 'button3' }
  //   ]
  //   describe('### click', () => {
  //     it('#### options', async () => {
  //       const wrapper = mount({
  //         render: () => <ButtonGroup options={options} />
  //       })
  //       // const children = wrapper.findAllComponents({ name: 'WbButton' })
  //       wrapper.trigger('click')
  //       const clickEvent = wrapper.emitted('click')
  //       expect(clickEvent).toHaveLength(1)
  //     })
  //     it('#### click: disabled', () => {
  //       const wrapper = mount({
  //         render: () => <ButtonGroup options={options} disabled />
  //       })
  //       const children = wrapper.findAllComponents({ name: 'WbButton' })
  //       children[1].trigger('click')
  //       const clickEvent = wrapper.emitted('click')
  //       expect(clickEvent).toBeFalsy()
  //     })
  //     // it('#### click: loading', () => {
  //     //   const wrapper = mount({
  //     //     render: () => <ButtonGroup options={options}  />
  //     //   })
  //     //   const children = wrapper.findAllComponents({ name: 'WbButton' })
  //     //   children[1].trigger('click')
  //     //   const clickEvent = wrapper.emitted('click')
  //     //   expect(clickEvent).toBeFalsy()
  //     // })
  //   })
  // })

  // describe('## Props', () => {
  //   const options = [
  //     { key: '1', content: 'button1' },
  //     { key: '2', content: 'button2' },
  //     { key: '3', content: 'button3' }
  //   ]
  //   const valueProps: any = [
  //     { name: 'size', value: 'xs' },
  //     { name: 'type', value: 'plain' },
  //     { name: 'theme', value: 'default' },
  //     { name: 'shape', value: 'circle' }
  //   ]
  //   const stateProps = ['block', 'loading', 'disabled']
  //   describe('### Prior', () => {
  //     it('#### options', () => {
  //       const wrapper = mount({
  //         render() {
  //           return <ButtonGroup options={options} size="sm" />
  //         }
  //       })
  //       expect(wrapper.classes()).toContain('wb-button-group--sm')
  //       const children = wrapper.findAllComponents({ name: 'WbButton' })
  //       expect(children.length).toBe(3)
  //       expect(children[0].classes()).toContain('wb-button--sm')
  //     })
  //     it('#### slots', () => {
  //       const wrapper = mount({
  //         render() {
  //           return (
  //             <ButtonGroup size="sm">
  //               <Button>button1</Button>
  //               <Button>button2</Button>
  //               <Button>button3</Button>
  //             </ButtonGroup>
  //           )
  //         }
  //       })
  //       expect(wrapper.classes()).toContain('wb-button-group--sm')
  //       const children = wrapper.findAllComponents({ name: 'WbButton' })
  //       expect(children.length).toBe(3)
  //       expect(children[0].classes()).toContain('wb-button--md')
  //     })
  //   })
  //   describe('### ValueProps', () => {
  //     for (const item of valueProps) {
  //       it(`#### ${item.name}`, () => {
  //         const wrapper = mount({
  //           render: () => (
  //             <ButtonGroup {...{ [item.name]: item.value }} options={options} />
  //           )
  //         })
  //         expect(wrapper.classes()).toContain(`wb-button-group--${item.value}`)
  //         const children = wrapper.findAllComponents({ name: 'WbButton' })
  //         expect(children.length).toBe(3)
  //         expect(
  //           children.every(i =>
  //             i.classes().includes(`wb-button--${item.value}`)
  //           )
  //         ).toBeTruthy()
  //       })
  //     }
  //   })
  //   describe('### ButtonProps', () => {
  //     for (const item of stateProps) {
  //       it(`#### ${item}`, () => {
  //         const wrapper = mount({
  //           render: () => (
  //             <ButtonGroup buttonProps={{ [item]: true }} options={options} />
  //           )
  //         })
  //         const children = wrapper.findAllComponents({ name: 'WbButton' })
  //         expect(children.length).toBe(3)
  //         expect(
  //           children.every(i => i.classes().includes(`wb-button--${item}`))
  //         ).toBeTruthy()
  //       })
  //     }
  //   })
  // })

  // describe('## Composables', () => {
  //   const options = [
  //     { key: '1', content: 'button1' },
  //     { key: '2', content: 'button2' },
  //     { key: '3', content: 'button3' }
  //   ]
  //   const { node: MyButtonGroup } = useButtonGroup()
  //   it('### base', () => {
  //     const wrapper = mount(MyButtonGroup, { props: { options, size: 'sm' } })
  //     expect(wrapper.classes()).toContain('wb-button-group--sm')
  //     const children = wrapper.findAllComponents({ name: 'WbButton' })
  //     expect(children.length).toBe(3)
  //     expect(children[0].classes()).toContain('wb-button--sm')
  //   })
  // })
})
