import { TYPES, typeOf, isType, ifElse, throwIf, satisfies } from './index.js'

describe('index.js exports', () => {
  it('includes TYPES, an array of type names', () => {
    expect(TYPES).toBeDefined()
    expect(TYPES).toBeInstanceOf(Array)
  })
  it('includes typeOf, a Function', () => {
    expect(typeOf).toBeDefined()
    expect(typeOf).toBeInstanceOf(Function)
  })
  it('includes isType, a Function', () => {
    expect(isType).toBeDefined()
    expect(isType).toBeInstanceOf(Function)
  })
  it('includes ifElse, a Function', () => {
    expect(ifElse).toBeDefined()
    expect(ifElse).toBeInstanceOf(Function)
  })
  it('includes throwIf, a Function', () => {
    expect(throwIf).toBeDefined()
    expect(throwIf).toBeInstanceOf(Function)
  })
  it('includes satisfies, a Function', () => {
    expect(satisfies).toBeDefined()
    expect(satisfies).toBeInstanceOf(Function)
  })
})
