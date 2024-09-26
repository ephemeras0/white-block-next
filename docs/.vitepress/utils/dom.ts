import { ref } from 'vue'

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

export function getElementBySelector(selector: string | HTMLElement) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
  return selector instanceof HTMLElement ? selector : null
}

export function clickDelegate(
  e: MouseEvent | any,
  // TODO: 支持 string[]
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

function serializeHeader(h: Element) {
  let ret = ''
  for (const node of h.childNodes) {
    ret += node.textContent
  }
  return ret.trim()
}
export function getHeaders(type = 'content') {
  const queryString = `.vp-doc-${type} :where(h1,h2,h3,h4,h5,h6)`
  const headers = [...document.querySelectorAll(queryString)]
    .filter(el => el.id && el.hasChildNodes())
    .map(el => {
      const level = Number(el.tagName[1])
      return {
        title: serializeHeader(el),
        link: `#${el.id}`,
        level
      }
    })
  return headers
}

export function useSpecialHeight() {
  const SPECIAL_HEIGHT = ref(window.innerWidth > 1024 ? 148 : 108)
  window.addEventListener('resize', () => {
    SPECIAL_HEIGHT.value = window.innerWidth > 1024 ? 148 : 108
  })
  return SPECIAL_HEIGHT
}
