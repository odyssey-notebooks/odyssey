import { typeOf } from './types.js'

function _expectToBeInstanceOf(value, constructor, message) {
  if (value.constructor !== constructor) throw new Error(message)
}

function _satisfiesTypeConstraints(argType, typeOrTypes) {
  if (Array.isArray(typeOrTypes)) {
    if (!typeOrTypes.includes(argType)) {
      throw new Error(`Argument did not meet type constraints! Is ${argType}, expected one of ${typeOrTypes.join(', ')}`)
    }
  } else {
    if (argType !== typeOrTypes) {
      throw new Error(`Argument did not meet type constraints! Is ${argType}, expected ${typeOrTypes}`)
    }
  }
}

function _satisfiesLengthConstraints(length, { min, max }) {
  if (min) {
    _expectToBeInstanceOf(min, Number, 'Min length must be a number.')
    if (length < min) throw new Error(`Value length does not meet minimum, recieved length ${length} expected at least ${min}`)
  }
  if (max) {
    _expectToBeInstanceOf(max, Number, 'Max length must be a number.')
    if (length > max) throw new Error(`Value length exceeds maximum, recieved length ${length} expected no more than ${max}`)
  }
}

function satisfies(arg, constraints) {
  _expectToBeInstanceOf(constraints, Object, 'Second argument of satisfies() must be an Object')
  const argType = typeOf(arg)
  if (constraints.type) {
    _satisfiesTypeConstraints(argType, constraints.type)
  }
  if (constraints.length) {
    if (!['string', 'array'].includes(argType)) throw new Error(`Recieved ${argType}, Cannot evaluate length of types other than strings and arrays.`)
    _satisfiesLengthConstraints(arg.length, constraints.length)
  }
}

export default satisfies
