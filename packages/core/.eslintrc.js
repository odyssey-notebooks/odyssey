module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest/globals': true
  },
  'extends': 'standard',
  "parser": "babel-eslint",
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    "space-before-function-paren": ["error", "never"]
  },
  "plugins": ["jest"]
}
