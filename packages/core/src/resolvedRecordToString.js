import Mustache from 'mustache'

export default function resolvedRecordToString({ _id, __meta__: meta, ...fields }) {
  const { created, updated, archetype } = meta
  const pattern = archetype.toString
  const fieldValues = Object.values(fields).reduce((valMap, field) => {
    valMap[field.key] = field.value
    return valMap
  }, {})
  const createdDate = new Date(created)
  const updatedDate = new Date(updated)
  const context = {
    meta,
    archetype,
    created: {
      get date(){
        return createdDate.toDateString()
      },
      get datetime() {
        return createdDate.toISOString()
      },
      get time() {
        return createdDate.toTimeString()
      }
    },
    updated: {
      get date(){
        return updatedDate.toDateString()
      },
      get datetime() {
        return updatedDate.toISOString()
      },
      get time() {
        return updatedDate.toTimeString()
      }
    },
    ...fieldValues
  }
  return Mustache.render(pattern, context)
}