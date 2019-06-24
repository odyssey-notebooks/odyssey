const FIELD_TYPES = [
  'text',
  'select',
  'boolean',
  'integer',
  'number',
  'date',
  'rating',
  'icon',
  'image',
  'images',
  'reference',
  'references',
  'mentionables'
]

// String Fields
const textField = {
  dataType: 'string',
  options: ['min', 'max', 'oneline'],
  description: 'A markdown field. "oneLine" option makes it an inline field.'
}

const choiceField = {
  dataType: 'string',
  options: ['many', 'markdown'],
  reprs: ['dropdown', 'radio', 'list'],
  defaultRepr: 'dropdown',
  description: 'A field meant for strings without newlines, like titles and names. Optional markdown option for inline markdown.'
}

export {
  FIELD_TYPES,
  textField,
  choiceField
}
