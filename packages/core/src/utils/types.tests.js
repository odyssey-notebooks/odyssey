import { TYPES, isValidType, typeOf, isType } from './types.js'

describe('TYPES', () => {
  it('is an array', () => {
    expect(TYPES).toBeInstanceOf(Array)
  })
})

describe('isValidType', () => {
  it('is a function of arity 1', () => {
    expect(isValidType).toBeInstanceOf(Function)
    expect(isValidType.length).toBe(1)
  })
  it('returns false for invalid type', () => {
    expect(isValidType('foo')).toBe(false)
  })
  it('returns true for valid types', () => {
    expect(isValidType('array')).toBe(true)
    expect(isValidType('number')).toBe(true)
  })
})

describe('typeOf', () => {
  it('is a function of arity 1', () => {
    expect(typeOf).toBeInstanceOf(Function)
    expect(typeOf.length).toBe(1)
  })
  it('handles undefined and null', () => {
    expect(typeOf(undefined)).toBe('undefined')
    expect(typeOf(null)).toBe('null')
  })
  it('handles arrays and objects and null', () => {
    expect(typeOf([])).toBe('array')
    expect(typeOf({})).toBe('object')
  })
  it('handles strings, numbers, and booleans', () => {
    expect(typeOf('')).toBe('string')
    expect(typeOf(0)).toBe('number')
    expect(typeOf(false)).toBe('boolean')
  })
  it('handles functions', () => {
    const foo = () => {}
    function bar() {}
    expect(typeOf(foo)).toBe('function')
    expect(typeOf(bar)).toBe('function')
  })
  it('handles classes as functions', () => {
    class Foo {}
    expect(Foo).toBeInstanceOf(Function)
    expect(typeOf(Foo)).toBe('function')
  })
  it('handles regular expressions', () => {
    expect(typeOf(/./)).toBe('regexp')
  })
  it('handles regular expressions', () => {
    const now = new Date()
    expect(typeOf(now)).toBe('date')
  })
})

describe('isType', () => {
  it('is a function of arity 2', () => {
    expect(isType).toBeInstanceOf(Function)
    expect(isType.length).toBe(2)
  })
  it('expects an arg of any type and a string to compare it to', () => {
    expect(isType(0, 'number')).toBe(true)
    expect(isType(0, 'boolean')).toBe(false)
    expect(isType(false, 'boolean')).toBe(true)
    expect(isType(false, 'object')).toBe(false)
  })
  it('accepts an array of string to compare to', () => {
    expect(isType(0, ['number', 'string', 'array'])).toBe(true)
    expect(isType(0, ['boolean', 'object', 'function'])).toBe(false)
  })
})
