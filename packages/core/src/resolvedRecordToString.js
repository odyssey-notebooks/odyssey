import Mustache from 'mustache'

export default function resolvedRecordToString({ _id, __meta__: meta, ...fields }) {
  const { created, updated, archetype } = meta
  const pattern = archetype.toString
  const fieldValues = Object.values(fields).reduce((valMap, field) => {
    valMap[field.key] = field.value
    return valMap
  }, {})
  const context = {
    meta,
    archetype,
    created: Date.parse(created),
    updated: Date.parse(updated),
    ...fieldValues
  }
  return Mustache.render(pattern, context)
}