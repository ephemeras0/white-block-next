import { useState } from 'white-block'

export const ThemeState = useState<'light' | 'dark'>('dark', theme => {
  document.documentElement.setAttribute('class', theme)
})
