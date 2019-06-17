import { typeOf, satisfies } from '../utils'
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
    this._initFeatures(satisfies(features, { type: ['object', 'array'] }))
    this.reprs = satisfies(reprs, { type: 'object' })
  }

  _initFeatures(featuresOptions) {
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

  get mentionable() {
    return Boolean(this.features.mentionable)
  }

  toJson() {
    return this
  }
}

export default Archetype
