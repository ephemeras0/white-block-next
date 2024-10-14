import { resolve } from 'node:path'

export const COMPONENTS_ROOT = resolve(
  __dirname,
  '../../../../packages/core/src/components'
)

export const COMPONENTS_API_FILE = resolve(COMPONENTS_ROOT, 'api.ts')
