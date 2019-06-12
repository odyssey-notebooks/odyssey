import newArchetype from './factory.js'

describe('newArchetype', () => {
  it('is a function of arity 1', () => {
    expect(newArchetype).toBeInstanceOf(Function)
    expect(newArchetype.length).toBe(1)
  })
  it('expects and a string with length >0 as the first argument', () => {
    expect(() => newArchetype()).toThrow()
    expect(() => newArchetype({})).toThrow()
    expect(() => newArchetype('')).toThrow()
    expect(() => newArchetype('F')).not.toThrow()
  })
  it('accepts an object as an optional second argument', () => {
    expect(() => newArchetype('Note', {})).not.toThrow()
    expect(() => newArchetype('Document', { repr: {} })).not.toThrow()
  })
})
