import { ifElse } from './ifElse.js'

describe('ifElse', () => {
  it('is a function of arity 4', () => {
    expect(ifElse).toBeInstanceOf(Function)
    expect(ifElse.length).toBe(4)
  })
  it('requires a condition, an argument of any type, and two predicates', () => {
    expect(() => ifElse()).toThrow()
    expect(() => ifElse(1)).toThrow()
    expect(() => ifElse(1, 1, 1, 1)).toThrow()
    expect(() => ifElse(() => true, 1, () => {}, () => {})).not.toThrow()
  })
})
