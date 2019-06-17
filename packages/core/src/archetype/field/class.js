import { throwIf, satisfies } from '../../utils'

const FIELD_TYPES = [
  'text',
  'richtext',
  'select',
  'boolean',
  'integer',
  'number',
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
    defaultValue,
    ...details
  }) {
    throwIf(!FIELD_TYPES.includes(type), 'Required argument "type" must be the string name of a known type')
    this.type = type
    this.name = satisfies(name, { type: ['string'] })
    this.label = satisfies(label, { type: ['string'] })
    this.defaultValue = defaultValue
    this.details = details
  }
}

export default Field
