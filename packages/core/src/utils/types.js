export const TYPES = [
  'number',
  'boolean',
  'string',
  'object',
  'array',
  'function',
  'class',
  'null',
  'undefined'
]

export function isValidType(arg) {
  return TYPES.includes(arg)
}

export function typeOf(arg) {
  if (arg === undefined) return 'undefined'
  if (arg === null) return 'null'
  if (Array.isArray(arg)) return 'array'
  const type = typeof arg
  const simpleTypes = ['number', 'boolean', 'string', 'function', 'object']
  if (simpleTypes.includes(type)) return type
  else return '?'
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
