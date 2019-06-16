import { throwIf } from './throwIf.js'

describe('throwIf', () => {
  it('is a function of arity 2', () => {
    expect(throwIf).toBeInstanceOf(Function)
    expect(throwIf.length).toBe(2)
  })
  it('throws if the first argument is truthy', () => {
    expect(() => throwIf(true, 'some message')).toThrow()
    expect(() => throwIf('test', 'some message')).toThrow()
    expect(() => throwIf(false, 'some message')).not.toThrow()
    expect(() => throwIf(0, 'some message')).not.toThrow()
  })
})
