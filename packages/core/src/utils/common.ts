export function throttle<Fn extends (...args: any[]) => void>(
      func: Fn,
        limit: number
): (...args: Parameters<Fn>) => void {
  let inThrottle: boolean
     let lastFuncCall: number

     const throttledFunc = (...args: Parameters<Fn>): void => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      lastFuncCall = Date.now()
    } else {
      const timeSinceLastCall = Date.now() - lastFuncCall
      if (timeSinceLastCall >= limit) {
        func(...args)
        lastFuncCall = Date.now()
      }
    }
  }

  return throttledFunc
}

export function debounce<Fn extends (...args: any[]) => void>(
  func: Fn,
  wait: number
): (...args: Parameters<Fn>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  const debounceFunc = (...args: Parameters<Fn>): void => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), wait)
  }

  return debounceFunc
}
