function _expectToBeInstanceOf(value, constructor, message) {
  if (value.constructor !== constructor) throw new Error(message)
}

function _satisfiesTypeConstraints(argType, type) {
  if (Array.isArray(type)) {
    if (!type.includes(argType)) {
      throw new Error(`Argument did not meet type constraints! Is ${argType}, expected one of ${type.join(', ')}`)
    }
  } else {
    if (argType !== type) {
      throw new Error(`Argument did not meet type constraints! Is ${argType}, expected ${type}`)
    }
  }
}

function _satisfiesLengthConstraints(length, { min, max }) {
  if (min) {
    _expectToBeInstanceOf(min, Number, 'Min length must be a number.')
    if (length < min) throw new Error(`Value length does not meet minimum, recieved length ${length} expected at least ${min}`)
  }
}

function satisfies(arg, constraints) {
  _expectToBeInstanceOf(constraints, Object, 'Second argument of satisfies() must be an Object')
  const argType = typeof arg
  if (constraints.type) {
    _satisfiesTypeConstraints(argType, constraints.type)
  }
  if (constraints.length) {
    if (['boolean', 'object', 'number'].includes(argType)) throw new Error(`Recieved ${argType}, Cannot evaluate length of types other than strings and arrays.`)
    _satisfiesLengthConstraints(arg, constraints.length)
  }
}

export default satisfies
