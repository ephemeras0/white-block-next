export function isMobileDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /(mobile|android|harmonyos|iphone|ipod|ios|blackberry|iemobile|opera mini)/i.test(
    userAgent
  )
}
