import defaultExport, { Archetype, newArchetype } from './index.js'

describe('exports', () => {
  it('has all expected exports defined', () => {
    expect(defaultExport).toBeDefined()
    expect(Archetype).toBeDefined()
    expect(newArchetype).toBeDefined()
  })
  it('exports newArchetype as its default export', () => {
    expect(defaultExport).toBe(newArchetype)
  })
})
