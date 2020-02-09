export default function resolveRecord(record, archetype) {
  const resolvedRecord = {
    _id: record._id,
    __meta__: record.__meta__
  }
  for (const field of archetype.fields) {
    resolvedRecord[field.key] = {
      ...field,
      value: record[field.key] === undefined
        ? field.default
        : record[field.key]
    }
  }
  return resolvedRecord
}