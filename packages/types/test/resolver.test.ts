import { describe, expect, it } from 'vitest'
import { ModuleResolver } from '../src'

describe('# ModuleResolver', () => {
  describe('## Export', () => {
    describe('### Type Alias', () => {
      const cases = [
        {
          name: '#### base',
          code: `export type test = string`,
          result: { test: 'string' }
        },
        {
          name: '#### union',
          code: `export type test = '1' | 2`,
          result: { test: `'1' | 2` }
        },
        {
          name: '#### union complex',
          code: `export type test = { b?: '1' } | { a: AA }`,
          result: { test: `{ b?: '1' } | { a: AA }` }
        },
        {
          name: '#### intersection',
          code: `export type test = AAA & BBB`,
          result: { test: 'AAA & BBB' }
        },
        {
          name: '#### intersection complex',
          code: `export type test = { b?: '1'| '2' } & { a: AA }`,
          result: { test: `{ b?: '1' | '2' } & { a: AA }` }
        },
        {
          name: '#### literal type',
          code: `export type test = { a: number , b: string, c: CCC }`,
          result: {
            test: {
              a: 'number',
              b: 'string',
              c: 'CCC'
            }
          }
        },
        {
          name: '#### literal type complex',
          code: `export type test = { a?: number , b?: string, c: CCC }`,
          result: {
            test: {
              a: {
                comment: [],
                required: false,
                type: 'number'
              },
              b: {
                comment: [],
                required: false,
                type: 'string'
              },
              c: {
                comment: [],
                required: true,
                type: 'CCC'
              }
            }
          }
        }
      ]
      for (const item of cases) {
        it(item.name, () => {
          const resolver = new ModuleResolver(item.code)
          expect(resolver.getExports()).toEqual(item.result)
        })
      }
    })
    describe('### Type Interface', () => {
      it('### base', () => {
        const code = `export interface test {
          b: '1' | '2',
          c: 1
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          test: {
            b: "'1' | '2'",
            c: '1'
          }
        })
      })
      it('### complex', () => {
        const code = `export interface test {
          base?: number
          custom: CustomType
          union?: AAA | BBB
          intersection?: AAA & BBB
          complex: (AAA | BBB)[],
          tuple: [e: MouseEvent]
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          test: {
            base: {
              comment: [],
              type: 'number',
              required: false
            },
            custom: {
              comment: [],
              type: 'CustomType',
              required: true
            },
            union: {
              comment: [],
              type: 'AAA | BBB',
              required: false
            },
            intersection: {
              comment: [],
              type: 'AAA & BBB',
              required: false
            },
            complex: {
              comment: [],
              type: '(AAA | BBB)[]',
              required: true
            },
            tuple: {
              comment: [],
              type: '[e: MouseEvent]',
              required: true
            }
          }
        })
      })
    })
    describe('### Value Named', () => {
      it('### base', () => {
        const code = `export const test = {
          a: 1,
          b: false,
          c: '1'
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          test: {
            a: 1,
            b: false,
            c: '1'
          }
        })
      })
      it('### complex', () => {
        const code = `export const test = {
          base: 1,
          properties: false,
          custom: function() { return 'start' },
          union1: () => ({ aa: 11 }),
          union: () => [1,2,3],
          intersection: { a: 123 },
          complex: [9,8,7]
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          test: {
            base: 1,
            properties: false,
            custom: 'start',
            union1: { aa: 11 },
            union: [1, 2, 3],
            intersection: { a: 123 },
            complex: [9, 8, 7]
          }
        })
      })
    })
    describe('### Value Default', () => {
      it('### base', () => {
        const code = `export default {
          a: 1,
          b: false,
          c: '1'
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          default: {
            a: 1,
            b: false,
            c: '1'
          }
        })
      })
      it('### complex', () => {
        const code = `export default {
          base: 1,
          properties: false,
          custom: function() { return 'start' },
          union1: () => ({ aa: 11 }),
          union: () => [1,2,3],
          intersection: { a: 123 },
          complex: [9,8,7]
        }`
        const resolver = new ModuleResolver(code)
        expect(resolver.getExports()).toEqual({
          default: {
            base: 1,
            properties: false,
            custom: 'start',
            union1: { aa: 11 },
            union: [1, 2, 3],
            intersection: { a: 123 },
            complex: [9, 8, 7]
          }
        })
      })
    })
  })
  describe('## Import', () => {
    it('### base', () => {
      const code = `import type { PropType } from 'vue'
          import { ButtonType, ButtonShape, ButtonSize } from './type'
          import { AAA } from './not-exist'`

      const resolver = new ModuleResolver(code)
      expect(resolver.getImports()).toEqual({
        PropType: 'vue',
        ButtonType: './type',
        ButtonShape: './type',
        ButtonSize: './type',
        AAA: './not-exist'
      })
    })
    it('## as', () => {
      const code = `import { AAA as BBB } from './not-exist'`

      const resolver = new ModuleResolver(code)
      expect(resolver.getImports()).toEqual({
        AAA: './not-exist',
        BBB: './not-exist'
      })
    })
    it('## multiple', () => {
      const code = `import Vue from 'vue'
      import AAA from './type'
      import type { PropType } from 'vue'
      import { BBB } from './type'
      import { CCC as DDD } from './type'`

      const resolver = new ModuleResolver(code)
      expect(resolver.getImports()).toEqual({
        Vue: 'vue',
        AAA: './type',
        PropType: 'vue',
        BBB: './type',
        CCC: './type',
        DDD: './type'
      })
    })
  })
})
