// Data for Class Archetype

// Data files are for example good and bad inputs, used for documentation, stories, tests, and factory functions.
// Data files are companions to another file which has a singular default export that is callable.

/** Inputs **/

// Inputs are consts with a meaningful variable names that can be used to
// call the compantion function or class.
// Inputs are "good" unless noted otherwise. Good inputs do not throw errors when their companion is called with them.
const namedFoo = {
  name: 'Foo'
}

// Bad inputs cause their companions to throw errors, and their names start with the word bad.
const badNotObject = ''
const badNoName = {}

// Prepend helpers with an _ to distinguish from inputs
const _input = (options) => Object.assign(namedFoo, options)

const withFeaturesArray = _input({
  features: []
})

const withFeaturesObject = _input({
  features: {}
})

/** Exports **/

// Default export should be desired default input for tests, input, and stories.
export default namedFoo

const goodInputs = {
  namedFoo,
  withFeaturesArray,
  withFeaturesObject
}

const badInputs = {
  badNotObject,
  badNoName
}

export {
  goodInputs,
  badInputs
}
