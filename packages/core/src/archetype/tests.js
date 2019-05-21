import Archetype from './class'

describe('class Archetype', () => {
  it('accepts an argument', () => {
    expect(() => new Archetype()).not.toThrow()
  })
})

describe('index file', () => {
  it('imports', () => {
    expect(() => import('./index.js')).not.toThrow()
  })
})