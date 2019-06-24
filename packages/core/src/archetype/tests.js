import Archetype from './class.js'
import newArchetype from './factory.js'
import defaultExport, {
  Archetype as indexArchetype,
  newArchetype as indexNewArchetype
} from './index.js'

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

function _Archetype(additionalOptions) {
  // So we don't have to type the name or boilerplate every time
  return () => new Archetype({ name: 'Foo', ...additionalOptions })
}

describe('Archetype fields argument', () => {
  it('takes an Array of fields', () => {
    expect(_Archetype({ fields: [] })).not.toThrow()
    expect(_Archetype({ fields: [{ type: 'text', label: 'text' }] })).not.toThrow()
    expect(_Archetype({ fields: 'Foo' })).toThrow()
    expect(_Archetype({ fields: {} })).toThrow()
  })
})

describe('Archetype features', () => {
  it('is an Array or Object', () => {
    expect(_Archetype({ features: [] })).not.toThrow()
    expect(_Archetype({ features: {} })).not.toThrow()
    expect(_Archetype({ features: '' })).toThrow()
  })
})

describe('Archetype reprs', () => {
  it('accepts option "reprs" as an Object', () => {
    expect(_Archetype({ reprs: {} })).not.toThrow()
    expect(_Archetype({ reprs: '' })).toThrow()
  })
})

describe('Archetype.isValid()', () => {
  it('is a Function of arity 1', () => {
    expect(Foo.isValid).toBeInstanceOf(Function)
    expect(Foo.isValid.length).toBe(1)
  })
  it('determines if the input is valid instance of the archetype', () => {
    const fooInstance = Foo.instantiate()
    expect(Foo.isValid(fooInstance)).toBe(true)
    expect(Foo.isValid([])).toBe(false)
  })
})

describe('newArchetype factory function', () => {
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

describe('index.js', () => {
  it('has all expected exports defined', () => {
    expect(defaultExport).toBeDefined()
    expect(indexArchetype).toBeDefined()
    expect(indexNewArchetype).toBeDefined()
  })
  it('exports newArchetype as its default export', () => {
    expect(defaultExport).toBe(newArchetype)
  })
})
