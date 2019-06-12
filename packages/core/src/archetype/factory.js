import Archetype from './class.js'

export function newArchetype(name, options = {}) {
  return new Archetype({ name, ...options })
}
