import { parser as ASTParser, ASTParseResult } from './ast'
import {
  getImportDeclaration,
  getExportDeclaration,
  GetImportDeclaration,
  GetExportDeclaration
} from './declaration'

export type ModuleImports = GetImportDeclaration
export type ModuleExports = GetExportDeclaration
/**
 * Resolve a module file.
 * @returns: imports map, exports type & value, ast.
 */
export class ModuleResolver {
  private ast: ASTParseResult
  private imports: ModuleImports = {}
  private exports: ModuleExports = {}

  constructor(code: string) {
    this.ast = ASTParser(code)
    const { body } = this.ast.program
    body.forEach(item => {
      if (item.type === 'ImportDeclaration') {
        this.imports = { ...this.imports, ...getImportDeclaration(item) }
      } else if (
        ['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(
          item.type
        )
      ) {
        this.exports = { ...this.exports, ...getExportDeclaration(item) }
      }
    })
  }

  getAST() {
    return this.ast
  }
  getImports() {
    return this.imports
  }
  getExports() {
    return this.exports
  }
}
