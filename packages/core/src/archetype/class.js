import { typeOf, satisfies, throwIf } from '../utils'
import { titled, completable, mentionable } from './features'

function _arrayToObj(arr, defaultValue) {
  let _output = {}
  for (const element of arr) {
    _output[element] = defaultValue || {}
  }
  return _output
}

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

  _initFeatures(featuresOptions) {
    satisfies(featuresOptions, { type: ['object', 'array'] })
    this.features = {}
    if (typeOf(featuresOptions) === 'array') {
      featuresOptions = _arrayToObj(featuresOptions)
    }

    function _initFeature(featureName, initializer) {
      if (featureName in featuresOptions) {
        let { fields, options } = initializer(this.fields, featuresOptions[featureName])
        this.features.titled = options
        this.fields = fields
      }
    }

    _initFeature('titled', titled)
    _initFeature('completable', completable)
    _initFeature('mentionable', mentionable)
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
}

export default Archetype
