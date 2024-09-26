export interface ResolveTypeProperty {
  comment?: string[]
  type: string
  required?: boolean
}

function isComplex(node: any) {
  if (node.type === 'TSTypeLiteral') {
    return node.members.some((n: any) => n.optional || n.leadingComments)
  }
  if (node.type === 'TSInterfaceBody') {
    return node.body.some((n: any) => n.optional || n.leadingComments)
  }
  return false
}

export function resolveType(node: any, raw?: boolean): any {
  const { type } = node

  if (type === 'TSNumberKeyword') {
    return 'number'
  }
  if (type === 'TSStringKeyword') {
    return 'string'
  }
  if (type === 'TSBooleanKeyword') {
    return 'boolean'
  }
  if (type === 'TSVoidKeyword') {
    return 'void'
  }
  if (type === 'TSAnyKeyword') {
    return 'any'
  }

  if (type === 'Identifier') {
    return node.name
  }
  if (type === 'Literal') {
    return node.raw
  }

  if (type === 'CommentLine') {
    return node.value
  }
  if (type === 'CommentBlock') {
    return node.value
  }

  // & use raw
  if (type === 'TSIntersectionType') {
    return node.types
      .map((i: any) => {
        const item = resolveType(i, true)
        if (typeof item === 'string') return item
        const str = Object.keys(item)
          .map(key => {
            return `${key}${i.optional ? '?' : ''}: ${item[key]}`
          })
          .join(', ')
        return `{ ${str} }`
      })
      .join(' & ')
  }

  // | use raw
  if (type === 'TSUnionType') {
    return node.types
      .map((i: any) => {
        const item = resolveType(i, true)
        if (typeof item === 'string') return item
        const str = Object.keys(item)
          .map(key => {
            return `${key}${i.optional ? '?' : ''}: ${item[key]}`
          })
          .join(', ')
        return `{ ${str} }`
      })
      .join(' | ')
  }

  // [] use raw
  if (type === 'TSArrayType') {
    return `${resolveType(node.elementType, true)}[]`
  }

  // ()
  if (type === 'TSParenthesizedType') {
    return `(${resolveType(node.typeAnnotation, raw)})`
  }
  if (type === 'TSTypeParameterInstantiation') {
    return resolveType(node.params[0], raw)
  }

  // reference type
  if (type === 'TSTypeReference') {
    return resolveType(node.typeName)
  }

  // as
  if (type === 'TSAsExpression') {
    return `${resolveType(node.expression, raw)} as ${resolveType(
      node.typeAnnotation,
      raw
    )}`
  }

  // tuple
  if (type === 'TSNamedTupleMember') {
    return {
      [resolveType(node.label, raw)]: resolveType(node.elementType, raw)
    }
  }
  if (type === 'TSTupleType') {
    let result: any = {}
    node.elementTypes.forEach((i: any) => {
      result = {
        ...result,
        ...resolveType(i, raw)
      }
    })
    const str = Object.entries(result)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
    return `[${str}]`
  }

  // property 单个property
  if (type === 'TSPropertySignature') {
    if (raw) {
      return `${resolveType(node.typeAnnotation, raw)}`
    }
    const property: ResolveTypeProperty = {
      comment: node.leadingComments?.map((i: any) => resolveType(i, raw)) || [],
      type: resolveType(node.typeAnnotation, raw),
      required: !node.optional
    }
    return property
  }
  if (type === 'TSTypeAnnotation') {
    return resolveType(node.typeAnnotation, raw)
  }

  // {}
  if (type === 'TSTypeLiteral') {
    const complex = isComplex(node)
    const result: any = {}
    node.members.forEach((i: any) => {
      const key = resolveType(i.key)
      const optional = i.optional ? '?' : ''
      const resolveKey = raw ? `${key}${optional}` : key
      result[resolveKey] = resolveType(i, raw ?? !complex)
    })
    return result
  }
  if (type === 'TSLiteralType') {
    return resolveType(node.literal, raw)
  }

  // function
  if (type === 'TSFunctionType') {
    const result = node.parameters.map((n: any) => {
      const param = resolveType(n, raw)
      const paramType = resolveType(n.typeAnnotation)
      return `${param}: ${paramType}`
    })
    return `(${result.join(', ')}) => ${resolveType(node.typeAnnotation, raw)}`
  }

  // type
  if (type === 'TSTypeAliasDeclaration') {
    return {
      [resolveType(node.id, raw)]: resolveType(node.typeAnnotation, raw)
    }
  }

  // interface
  if (type === 'TSInterfaceBody') {
    const complex = isComplex(node)
    const result: any = {}
    node.body.forEach((i: any) => {
      result[resolveType(i.key, raw)] = resolveType(i, raw ?? !complex)
    })
    return result
  }
  if (type === 'TSInterfaceDeclaration') {
    return { [resolveType(node.id, raw)]: resolveType(node.body, raw) }
  }

  // export named
  if (type === 'ExportNamedDeclaration') {
    return resolveType(node.declaration, raw)
  }
  return null
}

export function resolveValue(node: any): any {
  const { type } = node

  if (type === 'Identifier') {
    return node.name
  }
  if (type === 'Literal') {
    return node.value
  }
  if (type === 'UnaryExpression') {
    return -resolveValue(node.argument)
  }
  if (type === 'ArrowFunctionExpression') {
    return resolveValue(node.body)
  }

  if (type === 'ReturnStatement') {
    return resolveValue(node.argument)
  }
  if (type === 'BlockStatement') {
    return resolveValue(node.body[0])
  }
  if (type === 'FunctionExpression') {
    return resolveValue(node.body)
  }

  if (type === 'ArrayExpression') {
    return node.elements.map((i: any) => resolveValue(i))
  }

  if (type === 'Property') {
    return resolveValue(node.value)
  }
  if (type === 'ObjectExpression') {
    const result: Record<string, any> = {}
    node.properties.forEach((i: any) => {
      result[resolveValue(i.key)] = resolveValue(i)
    })
    return result
  }

  if (type === 'VariableDeclarator') {
    return resolveValue(node.init)
  }

  // as
  if (type === 'TSAsExpression') {
    return resolveValue(node.expression)
  }

  // export variable
  if (type === 'VariableDeclaration') {
    return {
      [resolveValue(node.declarations[0].id)]: resolveValue(
        node.declarations[0]
      )
    }
  }
  // export named
  if (type === 'ExportNamedDeclaration') {
    return resolveValue(node.declaration)
  }
  // export default
  if (type === 'ExportDefaultDeclaration') {
    return { default: resolveValue(node.declaration) }
  }
  return null
}
