import { typeOf } from './types.js'

export function throwIf(condition, message) {
  if (condition) {
    if (typeOf(message, 'function')) message = message() // unwrap
    throw new Error(message)
  }
}
