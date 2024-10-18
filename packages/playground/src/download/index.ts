import { saveAs } from 'file-saver'
import { DOWNLOAD_EXCLUDES_FILES } from '../repl/constant'

import index from './template/index.html?raw'
import main from './template/main.js?raw'
import pkg from './template/package.json?raw'
import config from './template/vite.config.js?raw'
import readme from './template/README.md?raw'

export async function downloadProject(store: any) {
  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()

  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', pkg)
  zip.file('vite.config.ts', config)
  zip.file('README.md', readme)

  // project src
  const src = zip.folder('src')!
  src.file('main.ts', main)

  const files = store.getFiles()
  for (const file in files) {
    if (!DOWNLOAD_EXCLUDES_FILES.includes(file)) {
      const code = files[file]
      if (file === 'tsconfig.json') {
        zip.file(file, code)
        continue
      }
      src.file(file, code)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'white-block-demo.zip')
}
