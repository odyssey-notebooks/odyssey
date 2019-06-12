import satisfies from './satisfies'

describe('satisfies', () => {
  it('is a function of arity 2', () => {
    expect(satisfies).toBeInstanceOf(Function)
    expect(satisfies.length).toBe(2)
  })
  it('requires an argument of any type and an Object', () => {
    expect(() => satisfies()).toThrow()
    expect(() => satisfies(1)).toThrow()
    expect(() => satisfies(1, 1)).toThrow()
    expect(() => satisfies(1, {})).not.toThrow()
  })
  it('validates types', () => {
    expect(() => satisfies(0, { type: 'object' })).toThrow()
    expect(() => satisfies(0, { type: 'number' })).not.toThrow()
    expect(() => satisfies(false, { type: 'boolean' })).not.toThrow()
    expect(() => satisfies('', { type: 'string' })).not.toThrow()
    expect(() => satisfies({}, { type: 'object' })).not.toThrow()
  })
  it('validates lengths for strings and arrays, and throws for other data types', () => {
    expect(() => satisfies(0, { length: { min: 1 } })).toThrow()
    expect(() => satisfies({}, { length: { min: 1 } })).toThrow()
    expect(() => satisfies(false, { length: { min: 1 } })).toThrow()
    expect(() => satisfies('F', { length: { min: 1 } })).not.toThrow()
    expect(() => satisfies([0], { length: { min: 1 } })).not.toThrow()
  })
})
