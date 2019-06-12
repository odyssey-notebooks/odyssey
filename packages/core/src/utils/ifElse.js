export function ifElse(condition, arg, predIfTrue, predIfFalse) {
  if (condition(arg)) {
    return predIfTrue(arg)
  } else {
    return predIfFalse(arg)
  }
}

export function ifArrayElse(arg, predIfTrue, predIfFalse) {
  return ifElse(_arg => Array.isArray(_arg), arg, predIfTrue, predIfFalse)
}

export default ifArrayElse
