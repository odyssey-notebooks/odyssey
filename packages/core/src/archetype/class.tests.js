import Archetype from './class.js'

describe('the Archetype class constructor', () => {
  it('has an arity of 1', () => {
    expect(Archetype.constructor.length).toBe(1)
  })
  it('expects an Object argument with a key "name"', () => {
    expect(() => new Archetype()).toThrow()
    expect(() => new Archetype({})).toThrow()
    expect(() => new Archetype({ name: 'Foo' })).not.toThrow()
  })
})

const Foo = new Archetype({ name: 'Foo' })

describe('Archetype.instantiate()', () => {
  it('is a Function of arity 1', () => {
    expect(Foo.instantiate).toBeInstanceOf(Function)
    expect(Foo.instantiate.length).toBe(1)
  })
  it('creates a record, an object', () => {
    expect(() => Foo.instantiate()).not.toThrow()
    expect(Foo.instantiate()).toBeInstanceOf(Object)
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
