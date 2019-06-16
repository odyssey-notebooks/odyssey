import { throwIf } from './throwIf.js'
import { ifElse } from './ifElse.js'

// Intentionally not including Symbol, Error, Map, and others
export const TYPES = [
  'number',
  'boolean',
  'string',
  'object',
  'array',
  'function',
  'regex',
  'date',
  'null',
  'undefined'
]

export function isValidType(arg) {
  return TYPES.includes(arg)
}

export function typeOf(arg) {
  const type = typeof arg
  if (type === 'object') {
    if (arg === null) return 'null'
    if (Array.isArray(arg)) return 'array'
    if (arg.constructor === RegExp) return 'regexp'
    if (arg.constructor === Date) return 'date'
    else return 'object'
  } else return type
}

export function _isOneOfTypes(arg, types) {
  return types.includes(typeOf(arg))
}

export function _isExactlyType(arg, type) {
  throwIf(typeof type !== 'string', 'Type(s) to be compared against must be string names of those types.')
  return type === typeOf(arg)
}

export function isType(arg, typeOrTypes) {
  return ifElse(
    () => Array.isArray(typeOrTypes),
    typeOrTypes,
    types => _isOneOfTypes(arg, types),
    type => _isExactlyType(arg, type)
  )
}
