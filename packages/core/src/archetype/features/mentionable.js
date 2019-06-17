import { throwIf } from '../../utils'

export default function mentionable(fields, { symbol = '#', fieldName = '_title' }) {
  const _fieldNames = Object.keys(fields)
  const _hasFieldName = _fieldNames.includes(fieldName)
  throwIf(
    !_hasFieldName,
    `Feature 'mentionable' requires a matching field, '${fieldName}' not found in ["${_fieldNames.join('", "')}"].`
  )
  const _fieldType = _fieldNames[fieldName].type
  throwIf(
    _fieldType !== 'text',
    `Feature 'mentionable' requires a text field, '${fieldName}' is type '${_fieldType}'.`
  )
  return {
    options: { symbol, fieldName }
  }
}
