module.exports = {
  extends: ['monorepo'],
  rules: {
    'scope-enum': [
      2, 
      'always', 
      [
        'repo',
        'docs',
        'core',
        'components',
        'css',
        'app'
      ]
    ]
  }
}