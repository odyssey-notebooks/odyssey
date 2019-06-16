import Archetype from './class.js'

export default function newArchetype(name, options = {}) {
  return new Archetype({ name, ...options })
}
