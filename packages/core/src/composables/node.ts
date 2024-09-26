import { getCurrentInstance, h } from 'vue'

function getFilterNodes(nodes: any[], allowNodeTypes: string[]) {
  return nodes.filter(n => {
    const type =
      Object.prototype.toString.call(n.type) === '[object Object]'
        ? n.type.name
        : n.type.toString()
    if (type === 'Symbol(v-fgt)') return true
    if (allowNodeTypes.length && !allowNodeTypes.includes(type)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[white-block]: Detected invalid child element type: \`${type}\``
      )
      return false
    }
    return true
  })
}

export interface UseNodeOptions {
  prior: 'slots' | 'props'
  allowNodeTypes: string[]
}
/**
 * Get node from `props` or `slots`.
 * `slots` > `props`.
 *
 * Usage:
 *
 *```
 * const renderNode = useNode()
 * const Node = () => renderNode('propsOrSlots')
 *
 * From `slots`
 * ```
 * - #text
 * ```
 *
 *```
 * From `props`
 *
 * ```
 * - text: node
 * - text: () => node
 *```
 */
export function useNode() {
  const instance = getCurrentInstance()
  return function (name: string, options?: Partial<UseNodeOptions>) {
    if (!instance) return null

    const { prior = 'slots', allowNodeTypes = [] } = options || {}

    // First Slots
    let slotNode: any = null
    if (instance.slots[name]) {
      const nodes = instance.slots[name]?.(instance.props)
      if (nodes) {
        slotNode = getFilterNodes(nodes, allowNodeTypes)
      }
    }
    if (prior === 'slots' && slotNode) return slotNode

    // Then Props
    let propNode: any = null
    if (instance.props[name]) {
      propNode = instance.props[name]
    }

    if (typeof propNode === 'function') {
      propNode = propNode(h, {})
    }

    return propNode
  }
}

export function useNodes() {
  const renderNode = useNode()
  return function (names: string[], options?: UseNodeOptions) {
    for (const name of names) {
      const node = renderNode(name, options)
      if (node) {
        return node
      }
    }
    return null
  }
}

export function useNodeKey() {
  const instance = getCurrentInstance()
  if (!instance) return null
  return instance.vnode.key
}

// function checkChildrenType(
//   nodes: any,
//   nodeType: string,
//   allowedType: string[]
// ) {
//   for (const n of nodes) {
//     const type =
//       Object.prototype.toString.call(n.type) === '[object Object]'
//         ? n.type.name
//         : n.type.toString()

//     if (type === 'Symbol(v-fgt)') {
//       checkChildrenType(n.children, nodeType, allowedType)
//       continue
//     }
//     if (!allowedType.includes(type)) {
//       // eslint-disable-next-line no-console
//       console.warn(
//         `[white-block]: Detected invalid child element type: \`${type}\` inside \`${nodeType}\` which only allowed \`[${allowedType.join(
//           ', '
//         )}]\`.`
//       )
//     }
//   }
// }

// export function useSlotNodeType(slot: string, allowed: string[]) {
//   return
//   if (process.env.NODE_ENV !== 'development') return

//   const instance: any = getCurrentInstance()
//   if (!instance) return

//   if (instance.slots[slot]) {
//     const nodes = instance.slots[slot]?.()
//     if (nodes) {
//       const nodeType = instance.vnode.type.name
//       checkChildrenType(nodes, nodeType, allowed)
//     }
//   }
// }
