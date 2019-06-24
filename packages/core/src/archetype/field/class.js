import { throwIf, satisfies } from '../../utils'

const FIELD_REPRS = [
  'plaintext',
  'markdown',
  'dropdown',
  'checkbox',
  'integer',
  'integerRange',
  'number',
  'numberRange',
  'currency',
  'currencyRange',
  'date',
  'dateRange',
  'rating',
  'icon',
  'image',
  'gallery',
  'imageTiles'
]

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

class Field {
  constructor({
    type,
    name,
    label,
    defaultValue = null,
    ...details
  }) {
    throwIf(!FIELD_TYPES.includes(type), 'Required argument "type" must be the string name of a known type')
    this.type = type
    this.name = satisfies(name, { type: ['string'] })
    this.label = satisfies(label, { type: ['string'] })
    this.defaultValue = defaultValue
    this.details = details === null
      ? {}
      : details
  }
}

export default Field
