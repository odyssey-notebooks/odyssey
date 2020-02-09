import generateMeta from './generateMeta'

export default function generateArchetype(name) {
  return {
    __meta__: generateMeta(),
    archetype: true,
    name,
    namePlural: name+'s',
    toString: "",
    fields: []
  }
}