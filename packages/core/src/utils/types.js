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

export function isType(arg, typeOrTypes) {
  if (Array.isArray(typeOrTypes)) {
    return typeOrTypes.includes(typeOf(arg))
  }
  if (typeof typeOrTypes === 'string') {
    return typeOrTypes === typeOf(arg)
  }
  throw new Error('second argument must be array or string')
}
