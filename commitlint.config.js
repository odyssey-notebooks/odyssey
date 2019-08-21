module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'always', 'sentence-case'],
    "scope-empty": [2, 'never'],
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
    ],
    'type-enum': [
      2, 
      'always', 
      [
        'build',
        'ci',
        'chore',
        'feat',
        'fix',
        'refactor',
        'style',
        'test',
        'config'
      ]
    ]
  }
}