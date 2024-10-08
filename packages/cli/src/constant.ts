import { fileURLToPath, resolve } from 'node:url'

export const PROJECT_ROOT = resolve(fileURLToPath(import.meta.url), '../../..')

export const COMPONENT_SOURCE_DIR = 'packages/core/src/components'
export const COMPONENT_DOCUMENT_DIR = 'docs/src'
export const COMPONENT_ROUTES_DIR = 'docs/.vitepress/config/routes'
export const COMPONENT_CONFIG_FILE = 'docs/.vitepress/config/components.ts'
