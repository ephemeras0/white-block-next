import { App, Plugin, Component } from 'vue'
import { SizeEnum } from '@/components/types'

         export function withInstall(component: Component) {
   const comp = component as Component & Plugin
  comp.install = (app: App) => {
             if (comp.name) {
      app.component(comp.name, comp)
    }
  }
  return comp
}

export function getComponentSize(size: number) {
  const h = Math.max(18, size)
  const p = Math.floor(h / 4)
  const f = p + 6
  const r = (p - 4) / 2 + 2
  const g = r
  return {
    height: h,
    padding: p,
    fontSize: f,
    radius: r,
    gap: g
  }
}

export function getComponentSizeValue(size: SizeEnum) {
  const sizePreset = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48
  }
  return sizePreset[size]
}

/**
 * h:  18  24  32  40  48
 * p:  4   6   8   10  12    Math.floor(h / 4)
 * f:  10  12  14  16  18    (p - 4) + 10    0 2 4 6 8 + 10
 * r:  2   3   4   5   6     ((p - 4) / 2) + 2    0 1 2 3 4 + 2
 * g:  2   3   4   5   6     ((p - 4) / 2) + 2
 */
export function getComponentSizeStyles(name: string, size: number) {
  const h = Math.max(18, size)
  const p = Math.floor(h / 4) + 2
  const f = p + 4
  const r = (p - 6) / 2 + 2
  const g = r

  return {
    [`--${name}-height`]: `calc(${h} / 16 * 1rem)`,
    [`--${name}-padding`]: `calc(${p} / 16 * 1rem)`,
    [`--${name}-font-size`]: `calc(${f} / 16 * 1rem)`,
    [`--${name}-radius`]: `calc(${r} / 16 * 1rem)`,
    [`--${name}-gap`]: `calc(${g} / 16 * 1rem)`
  }
}

export function getRawSlots(slots: Record<string, any>) {
  const result: Record<string, any> = {}
  Object.keys(slots).forEach(slot => {
    result[slot] = () => slots[slot]?.()
  })
  return result
}
