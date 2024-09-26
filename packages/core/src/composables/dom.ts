import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getElementBySelector } from '../utils'

type UseIntersectionObserverHandler = (visible: boolean) => void
export function useIntersectionObserver(
  container: string | HTMLElement,
  target: string | HTMLElement
) {
  const visible = ref(false)
  let handler: UseIntersectionObserverHandler | null = null
  function onChange(handlerFn: UseIntersectionObserverHandler) {
    handler = handlerFn
  }

  let observer: IntersectionObserver | null
  onMounted(() => {
    if (!import.meta.env.SSR) {
      const containerDOM = getElementBySelector(container)
      const targetDOM = getElementBySelector(target)

      observer = new IntersectionObserver(
        records => {
          visible.value = !records[0].isIntersecting
          handler?.(visible.value)
        },
        { threshold: [0], root: containerDOM }
      )
      observer.observe(targetDOM as HTMLElement)
    }
  })

  onBeforeUnmount(() => {
    observer = null
  })

  return { visible, onChange }
}
