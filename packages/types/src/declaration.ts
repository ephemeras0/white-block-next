import { resolveType, resolveValue, ResolveTypeProperty } from './parse'

export type GetImportDeclaration = Record<string, string>
export function getImportDeclaration(declaration: any) {
  const identifiers: GetImportDeclaration = {}
  declaration.specifiers.forEach((identifier: any) => {
    if (identifier.imported) {
      identifiers[identifier.imported.name] = declaration.source.value
    }
    if (identifier.local) {
      identifiers[identifier.local.name] = declaration.source.value
    }
  })
  return identifiers
}

export type GetExportDeclarationType = Record<string, ResolveTypeProperty>
export type GetExportDeclarationValue = Record<string, any>
export type GetExportDeclaration = Record<string, any>
export function getExportDeclaration(declaration: any): GetExportDeclaration {
  if (declaration.exportKind === 'type') {
    return resolveType(declaration)
  }
  if (declaration.exportKind === 'value') {
    return resolveValue(declaration)
  }
  return {}
}
