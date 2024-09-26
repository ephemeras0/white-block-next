export function t<T>(pattern: T, ...args: any[]) {
  const [data] = args
  if (typeof pattern === 'string') {
    if (!data) return pattern
    const regular = /\{\s*([\w-]+)\s*\}/g
    const translated = pattern.replace(regular, (match, key) => {
      if (data) {
        return String(data[key])
      }
      return ''
    })
    return translated
  }
  return ''
}
