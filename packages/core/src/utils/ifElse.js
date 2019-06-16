export function ifElse(condition, arg, predIfTrue, predIfFalse) {
  if (condition(arg)) {
    return predIfTrue(arg)
  } else {
    return predIfFalse(arg)
  }
}
