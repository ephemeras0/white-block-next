export function getElementBySelector(selector: any) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
  return selector instanceof HTMLElement ? selector : null
}

export function clickDelegate(
  e: MouseEvent | any,
  className: string,
  handler: (dataset: any, event?: MouseEvent) => void,
  fallback?: () => void
) {
  const domList = e.path ?? (e.composedPath && e.composedPath())
  const target = domList.find(
    (dom: HTMLElement) => dom.className && dom.className.includes(className)
  )
  if (target) {
    handler(target.dataset, e)
    return
  }
  fallback?.()
}

export function clickDelegateKey(
  e: MouseEvent | any,
  className: string,
  handler: (key: string, event: MouseEvent) => void,
  fallback?: () => void
) {
  const domList = e.path ?? (e.composedPath && e.composedPath())
  const target = domList.find(
    (dom: HTMLElement) => dom.className && dom.className.includes(className)
  )
  if (target) {
    handler(target.__vueParentComponent?.vnode?.key || null, e)
    return
  }
  fallback?.()
}

export function on(element: Node | Window, event: string, handler: any): any {
  if (element && event && handler) {
    element.addEventListener(event, handler)
  }
}

export function off(element: Node | Window, event: string, handler: any): any {
  if (element && event) {
    element.removeEventListener(event, handler)
  }
}

export type EventHandlerInstance = {
  add: (type: string, listener: any) => void
  clean: () => void
}
export function EventHandler(elm: Element): EventHandlerInstance {
  const offs: Array<() => void> = []
  return {
    add(type: string, listener: any) {
      if (!type) return
      on(elm, type, listener)
      offs.push(() => {
        off(elm, type, listener)
      })
    },
    clean() {
      offs.forEach(handler => handler?.())
      offs.length = 0
    }
  }
}

// eslint-disable-next-line consistent-return
export async function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '')

    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null

    document.body.appendChild(element)
    element.select()

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand('copy')
    document.body.removeChild(element)

    if (originalRange) {
      selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      ;(previouslyFocusedElement as HTMLElement).focus()
    }
  }
}
