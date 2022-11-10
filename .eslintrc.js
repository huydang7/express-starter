module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['google', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-parens': 0,
    'object-curly-spacing': 0,
    'new-cap': 0,
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
