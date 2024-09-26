import { describe, expect, it } from 'vitest'
import { ModuleResolver, getPropsConfig, getEmitsConfig } from '../src'

describe('# API', () => {
  it('## Transform', () => {
    const code = `export interface Props extends CommonProps {
        /*
         * Size preset for the component.
         */
        size?: SizeEnum
        /*
         * Data for the component.
         */
        data: Data[]
        /*
         * Click action.
         */
        onClick?: (e: MouseEvent) => void
      }

      export type Emits = {
        /*
         * click action.
         */
        click: [e: MouseEvent]
      }

      export default {
        size: 'small',
        data: -1
      } as Props
      `
    const resolver = new ModuleResolver(code)
    expect(resolver.getExports()).toEqual({
      Props: {
        size: {
          comment: ['\n         * Size preset for the component.\n         '],
          required: false,
          type: 'SizeEnum'
        },
        data: {
          comment: ['\n         * Data for the component.\n         '],
          required: true,
          type: 'Data[]'
        },
        onClick: {
          comment: ['\n         * Click action.\n         '],
          required: false,
          type: '(e: MouseEvent) => void'
        }
      },
      Emits: {
        click: {
          comment: ['\n         * click action.\n         '],
          required: true,
          type: '[e: MouseEvent]'
        }
      },
      default: {
        size: 'small',
        data: -1
      }
    })
  })
  it('## Props', () => {
    const props = {
      size: {
        comment: ['\n         * Size preset for the component.\n         '],
        required: false,
        type: 'SizeEnum'
      },
      data: {
        comment: ['\n         * Data for the component.\n         '],
        required: true,
        type: 'Data[]'
      }
    }
    const defaultProps = {
      size: 'small',
      data: [1, 2, 3]
    }
    expect(getPropsConfig(props, defaultProps)).toEqual([
      {
        name: 'size',
        comment: ['\n         * Size preset for the component.\n         '],
        required: false,
        type: 'SizeEnum',
        default: 'small'
      },
      {
        name: 'data',
        comment: ['\n         * Data for the component.\n         '],
        required: true,
        type: 'Data[]',
        default: [1, 2, 3]
      }
    ])
  })
  it('## Emits', () => {
    const emits = {
      click: {
        comment: ['\n         * click action.\n         '],
        required: true,
        type: '[e: MouseEvent]'
      }
    }
    expect(getEmitsConfig(emits)).toEqual([
      {
        name: 'click',
        comment: ['\n         * click action.\n         '],
        type: '[e: MouseEvent]'
      }
    ])
  })
})
