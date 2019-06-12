import { ifElse, ifArrayElse } from './ifElse.js'

describe('ifElse', () => {
  it('is a function of arity 4', () => {
    expect(ifElse).toBeInstanceOf(Function)
    expect(ifElse.length).toBe(4)
  })
  it('requires a condition, an argument of any type, and two predicates', () => {
    expect(() => ifArrayElse()).toThrow()
    expect(() => ifArrayElse(1)).toThrow()
    expect(() => ifArrayElse(1, 1, 1, 1)).toThrow()
    expect(() => ifArrayElse(() => true, 1, () => {}, () => {})).not.toThrow()
  })
})

describe('ifArrayElse', () => {
  it('is a function of arity 3', () => {
    expect(ifArrayElse).toBeInstanceOf(Function)
    expect(ifArrayElse.length).toBe(3)
  })
  it('requires an argument of any type and two functions', () => {
    expect(() => ifArrayElse()).toThrow()
    expect(() => ifArrayElse(1, () => {}, () => {})).not.toThrow()
  })
})
