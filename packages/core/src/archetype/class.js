import { satisfies } from '../utils'

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
    this.features = satisfies(features, { type: ['object', 'array'] })
    this.fields = satisfies(fields, { type: 'array' })
    this.reprs = satisfies(reprs, { type: 'object' })
  }

  toJson() {
    return this
  }
}

export default Archetype
