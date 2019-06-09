import Archetype from './class.js'
import goodInput from './class.data.js'

describe('the Archetype class constructor', () => {
  it('has an arity of 1', () => {
    expect(Archetype.constructor.length).toBe(1)
  })
  it('expects an Object argument with a key "name"', () => {
    expect(() => new Archetype()).toThrow()
    expect(() => new Archetype({})).toThrow()
    expect(() => new Archetype(goodInput)).not.toThrow()
  })
  function newArchetype(additionalOptions) {
    return () => new Archetype({ name: 'Foo', ...additionalOptions })
  }
  it('accepts option "features" as an Array(Strings) or Object', () => {
    expect(newArchetype({ features: [] })).not.toThrow()
    expect(newArchetype({ features: {} })).not.toThrow()
    expect(newArchetype({ features: '' })).toThrow()
  })
  it('accepts option "fields" as an Array(Objects)', () => {
    expect(newArchetype({ fields: [] })).not.toThrow()
    expect(newArchetype({ fields: [{ type: 'text', label: 'text' }] })).not.toThrow()
    expect(newArchetype({ fields: ['Foo'] })).toThrow()
    expect(newArchetype({ fields: {} })).toThrow()
  })
  it('accepts option "reprs" as an Object', () => {
    expect(newArchetype({ reprs: {} })).not.toThrow()
    expect(newArchetype({ reprs: '' })).toThrow()
  })
})
