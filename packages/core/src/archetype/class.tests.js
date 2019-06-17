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
})

function newArchetype(additionalOptions) {
  // So we don't have to type the name or boilerplate every time
  return () => new Archetype({ name: 'Foo', ...additionalOptions })
}

describe('Archetype fields', () => {
  it('is an Array of fields', () => {
    expect(newArchetype({ fields: [] })).not.toThrow()
    expect(newArchetype({ fields: [{ type: 'text', label: 'text' }] })).not.toThrow()
    expect(newArchetype({ fields: 'Foo' })).toThrow()
    expect(newArchetype({ fields: {} })).toThrow()
  })
})

describe('Archetype features', () => {
  it('is an Array or Object', () => {
    expect(newArchetype({ features: [] })).not.toThrow()
    expect(newArchetype({ features: {} })).not.toThrow()
    expect(newArchetype({ features: '' })).toThrow()
  })
})

describe('Archetype reprs', () => {
  it('accepts option "reprs" as an Object', () => {
    expect(newArchetype({ reprs: {} })).not.toThrow()
    expect(newArchetype({ reprs: '' })).toThrow()
  })
})
