import { typeOf, satisfies, throwIf, isType } from '../utils'
import { titled, completable, mentionable } from './features'

class Archetype {
  constructor({
    name,
    features = {},
    fields = [],
    reprs = {
      string: {}
    }
  }) {
    this.name = satisfies(name, { type: 'string', length: { min: 1 } })
    this.fields = satisfies(fields, { type: 'array' })
    this._initFeatures(features)
    this.reprs = satisfies(reprs, { type: 'object' })
  }

  _initFeature(featureName, initializer, featuresOptions) {
    if (featureName in featuresOptions) {
      let { fields, options } = initializer(this.fields, featuresOptions[featureName])
      this.features.titled = options
      this.fields = fields
    }
  }

  _initFeatures(featuresOptions) {
    satisfies(featuresOptions, { type: ['object', 'array'] })
    this.featuresOptions = typeOf(featuresOptions) === 'array'
    ? featuresOptions.reduce((options, optionName) => {
      options[optionName] = {}
      return options
    }, {})
    : featuresOptions
    
    this.features = {}
    this._initFeature('titled', titled)
    this._initFeature('completable', completable)
    this._initFeature('mentionable', mentionable)
  }

  get titled() {
    return Boolean(this.features.titled)
  }

  get completable() {
    return Boolean(this.features.completable)
  }

  get mentionable() {
    return Boolean(this.features.mentionable)
  }

  toJson() {
    return this
  }

  instantiate(options) {
    const _archetype = this
    const _instance = {
      _archetype: _archetype.name
    }
    for (const field of _archetype.fields) {
      let _hasDefault = field.defaultValue !== null
      let _fieldName = field.name
      let _valueProvided = !options.hasOwnProperty(_fieldName)
      throwIf(!_hasDefault && !_valueProvided, `Field '${_fieldName}' has no default but no value was provided.`)
      let _fieldValue = _valueProvided
        ? options[_fieldName]
        : field.defaultValue

      _instance[_fieldName] = _fieldValue
    }
    return _instance
  }

  isValid(instance) {
    try {
      throwIf(!isType(instance, 'object'), 'Instance must be an Object')
      this.instantiate(instance)
      return true
    } catch (e) {
      return false
    }
  }
}

export default Archetype
