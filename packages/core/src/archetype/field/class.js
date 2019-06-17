import { isType } from '../../utils'

class Field {
  constructor({
    label,
    type,
    required = false
  }) {
    this.label = label
    if (!isType(type)) {
      throw new Error('Required argument "type" must be the string name of a known type')
    }
    this.type = type
    this.required = required
  }
}

export default Field
