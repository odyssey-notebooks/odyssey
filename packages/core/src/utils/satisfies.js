import { typeOf, isType } from './types.js'
import { throwIf } from './throwIf.js'

function _satisfiesTypeConstraints(arg, typeOrTypes) {
  throwIf(
    !isType(arg, typeOrTypes),
    isType(typeOrTypes, 'array')
      ? () => `Type constraint not satisfied: recieved ${typeOf(arg)}, expected one of ${typeOrTypes.join(', ')}`
      : () => `Type constraint not satisfied: recieved ${typeOf(arg)}, expected ${typeOrTypes}`
  )
}

function _satisfiesLengthConstraints(arg, { min, max }) {
  throwIf(!isType(arg, ['string', 'array']), () => `Recieved ${typeOf(arg)}, Cannot evaluate length of types other than strings and arrays.`)
  const length = arg.length
  if (min) {
    throwIf(typeof min !== 'number', 'Min length must be a number.')
    throwIf(length < min, () => `Value length does not meet minimum, recieved length ${length} expected at least ${min}`)
  }
  if (max) {
    throwIf(typeof max !== 'number', 'Max length must be a number.')
    throwIf(length > max, () => `Value length exceeds maximum, recieved length ${length} expected no more than ${max}`)
  }
}

/**
 * Evaluates an argument agains a set of constraints and errors if the constraint is not met,
 * @param {*} arg - An argument to be evaluated
 * @param {object} constraints - A schema of evaluations
 *
 * Constraints can declare a type or array of types for the argument to match against, and min/max lengths.
 * Explicit type-checking implies checking for existence, as nonexistent args would be of type 'undefined'
 */
export function satisfies(arg, constraints) {
  throwIf(typeOf(constraints) !== 'object', 'Second argument of satisfies() must be an Object')
  if (constraints.type) {
    _satisfiesTypeConstraints(arg, constraints.type)
  }
  if (constraints.length) {
    _satisfiesLengthConstraints(arg, constraints.length)
  }
}
