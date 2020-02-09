import generateMeta from './generateMeta'

export default function generateRecord(archetype, data = {}) {
  const record = {
    __meta__: generateMeta(archetype)
  }
  for (const field of archetype.fields) {
    const value = data[field.key] !== undefined
      ? data[field.key]
      : field.default
    if (value === 'undefined') {
      throw new Error(`Field ${field.key} is required and was not provided.`)
    }
    record[field.key] = value
  }
  return record
}